import { Ok, Err, Result } from "ts-results";
import { db } from "../../../db";
import { submissions } from "../../../db/schema";
import { uuid } from "../../../app/common";
import { Submission } from "../models";
import { ChallengesService, ParticipantsService } from "../services";

export const create = async (
  challengeId: string,
  participantId: string,
): Promise<Result<Submission, Error>> => {
  const challengeResult = await ChallengesService.findByUuid(challengeId);
  if (!challengeResult.ok) {
    return Err(new Error("Failed to find challenge"));
  }
  const participantResult = await ParticipantsService.findByUuid(participantId);
  if (!participantResult.ok) {
    return Err(new Error("Failed to find participant"));
  }

  // TODO: Validate that the participant is allowed to submit this challenge (available challenges)
  // throw new Error("Participant is not allowed to submit this challenge") if not allowed (use participant-service)
  // TODO: try to build the submission object
  // const submission = challenge.buildSubmission(submissionBody)
  // TODO: if submission failed to build, surface the error
  // throw new Error("Submission failed to build") if submission operations is err
  // TODO: switch on submission.challenge.evaluation
  // if submission.challenge.evaluation is MANUAL, than save it to the database
  // if submission.challenge.evaluation is AUTOMATIC, than evaluate it right now
  // use a transaction to save the submission and submission review at the sane time
  // if the submission is correct, also make new challenges available to the participant
  // TODO: this should really return a success/err

  const id = uuid.create();
  try {
    const result = await db
      .insert(submissions)
      .values({
        uuid: id.toString(),
        challengeId: challengeResult.val.id,
        participantId: participantResult.val.id,
      })
      .returning();

    const submission = new Submission({
      id: result[0].id,
      uuid: result[0].uuid,
      challenge: challengeResult.val,
      participant: participantResult.val,
    });

    return Ok(submission);
  } catch (e) {
    console.log(e);
    return Err(new Error("Failed to create submission"));
  }
};
