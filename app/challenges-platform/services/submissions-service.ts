import { eq } from "drizzle-orm";
import { Ok, Err, Result } from "ts-results";
import { db } from "../../../db";
import { submissions } from "../../../db/schema";
import { uuid } from "../../../app/common";
import { Challenge, Participant, Submission } from "../models";
import {
  AccessibleChallengesService,
  ChallengesService,
  ParticipantsService,
  JudgesService,
} from "../services";
import { challengesPlatform } from "..";

export const findByUuid = async (
  id: string,
  type: string = "base",
): Promise<Result<Submission, Error>> => {
  if (!uuid.isValid(id)) {
    return Err(new Error("Invalid UUID"));
  }

  const result = await db
    .select()
    .from(submissions)
    .where(eq(submissions.uuid, id));

  if (result.length === 0) {
    return Err(new Error("Submission not found"));
  }

  const record = result[0];
  if (!record.challengeId || !record.participantId) {
    return Err(new Error("Invalid submission"));
  }

  const challengeResult = await ChallengesService.findById(record.challengeId);
  if (!challengeResult.ok) {
    return Err(new Error("Failed to find challenge"));
  }

  const participantResult = await ParticipantsService.findById(
    record.participantId,
  );
  if (!participantResult.ok) {
    return Err(new Error("Failed to find participant"));
  }

  const transformer = challengesPlatform.findTransformer(type);
  const submission = transformer.newSubmission(
    result[0],
    challengeResult.val,
    participantResult.val,
  );

  return Ok(submission);
};

export const create = async (
  challengeId: string,
  participantId: string,
  type: string = "base",
  metadata?: any,
): Promise<Result<Submission, Error>> => {
  const result = await beforeCreate(challengeId, participantId);
  if (!result.ok) return result;

  const [challenge, participant] = result.val;

  // TODO: switch on submission.challenge.evaluation
  // if submission.challenge.evaluation is MANUAL, than save it to the database
  // if submission.challenge.evaluation is AUTOMATIC, than evaluate it right now
  // use a transaction to save the submission and submission review at the sane time
  // if the submission is correct, also make new challenges available to the participant

  const id = uuid.create();
  try {
    const transformer = challengesPlatform.findTransformer(type);
    const metadataIsValid = transformer.validateSubmissionMetadata(metadata);

    if (!metadataIsValid) {
      return Err(new Error("Invalid metadata"));
    }

    const result = await db
      .insert(submissions)
      .values({
        uuid: id.toString(),
        challengeId: challenge.id,
        participantId: participant.id,
      })
      .returning();

    const submission = transformer.newSubmission(
      result[0],
      challenge,
      participant,
    );
    return Ok(submission);
  } catch (e) {
    return Err(new Error("Failed to create submission"));
  }
};

//private
const beforeCreate = async (
  challengeId: string,
  participantId: string,
): Promise<Result<[Challenge, Participant], Error>> => {
  const challengeResult = await ChallengesService.findByUuid(challengeId);
  if (!challengeResult.ok) {
    return Err(new Error("Failed to find challenge"));
  } else if (challengeResult.val.deleted === true) {
    return Err(new Error("Challenge is deleted"));
  }

  const participantResult = await ParticipantsService.findByUuid(participantId);
  if (!participantResult.ok) {
    return Err(new Error("Failed to find participant"));
  }

  const countResult = await AccessibleChallengesService.count(
    challengeResult.val,
    participantResult.val,
  );
  if (!countResult.ok) {
    return Err(new Error("Failed to count accessible challenges"));
  }

  const count = countResult.val;
  if (count === 0) {
    return Err(
      new Error("Participant is not allowed to submit this challenge"),
    );
  }

  return Ok([challengeResult.val, participantResult.val]);
};

export const assign = async (
  submissionId: string,
  judgeId: string,
): Promise<Result<Submission, Error>> => {
  const submissionResult = await findByUuid(submissionId);
  if (!submissionResult.ok) {
    return Err(new Error("Failed to find submission"));
  }

  const judgeResult = await JudgesService.findByUuid(judgeId);
  if (!judgeResult.ok) {
    return Err(new Error("Failed to find judge"));
  }

  const submission = submissionResult.val;

  const result = await db
    .update(submissions)
    .set({ assignee: judgeResult.val.id })
    .where(eq(submissions.id, submission.id))
    .returning();

  if (result.length === 0) {
    return Err(new Error("Failed to assign judge"));
  }

  const updatedSubmission = new Submission({
    id: submission.id,
    uuid: submission.uuid,
    challenge: submission.challenge,
    participant: submission.participant,
    assignee: judgeResult.val,
  });

  return Ok(updatedSubmission);
};
