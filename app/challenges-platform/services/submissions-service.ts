import { Ok, Err, Result } from "ts-results";
import { db } from "../../../db";
import { submissions } from "../../../db/schema";
import { uuid } from "../../../app/common";
import { Submission } from "../models";
import { ChallengesService, ParticipantsService } from "../services";
import { challengesPlatform } from "..";

export const create = async (
  challengeId: string,
  participantId: string,
  type: string = "base",
  metadata?: any,
): Promise<Result<Submission, Error>> => {
  const challengeResult = await ChallengesService.findByUuid(challengeId);
  if (!challengeResult.ok) {
    return Err(new Error("Failed to find challenge"));
  }
  if (challengeResult.val.deleted === true) {
    return Err(new Error("Challenge is deleted"));
  }
  const participantResult = await ParticipantsService.findByUuid(participantId);
  if (!participantResult.ok) {
    return Err(new Error("Failed to find participant"));
  }

  // TODO: Validate that the participant is allowed to submit this challenge (available challenges)
  // throw new Error("Participant is not allowed to submit this challenge") if not allowed (use participant-service)

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
        uuid: id,
        challengeId: challengeResult.val.id,
        participantId: participantResult.val.id,
      })
      .returning();

    const submission = transformer.newSubmission(
      result[0],
      challengeResult.val,
      participantResult.val,
    );
    return Ok(submission);
  } catch (e) {
    return Err(new Error("Failed to create submission"));
  }
};
