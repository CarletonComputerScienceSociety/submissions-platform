import { Ok, Err, Result } from "ts-results";
import { db } from "../../../db";
import { submissions, accessibleChallenges, participants } from "../../../db/schema";
import { uuid } from "../../../app/common";
import { Submission } from "../models";
import { ChallengesService, ParticipantsService } from "../services";
import { challengesPlatform } from "..";
import { eq } from "drizzle-orm";

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
  const participantResult = await ParticipantsService.findByUuid(participantId);
  if (!participantResult.ok) {
    return Err(new Error("Failed to find participant"));
  }

  const accessibleChallengesResult = await db
    .select({pId: accessibleChallenges.participantId,cId: accessibleChallenges.challengeId})
    .from(accessibleChallenges)
    .where(eq(accessibleChallenges.participantId, participantResult.val.id) && eq(accessibleChallenges.challengeId, challengeResult.val.id))
    .execute();

    if (accessibleChallengesResult.length === 0) {
      return Err(new Error("Participant is not allowed to submit this challenge" ));
    }


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
