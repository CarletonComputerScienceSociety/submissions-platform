import { eq } from "drizzle-orm";
import { Ok, Result } from "ts-results";
import { db } from "../../../db";
import { accessibleChallenges } from "../../../db/schema";
import { Challenge, Participant } from "../models";

export const count = async (
  challenge: Challenge,
  participant: Participant,
): Promise<Result<Number, Error>> => {
  const accessibleChallengesResult = await db
    .select({
      pId: accessibleChallenges.participantId,
      cId: accessibleChallenges.challengeId,
    })
    .from(accessibleChallenges)
    .where(
      eq(accessibleChallenges.participantId, participant.id) &&
        eq(accessibleChallenges.challengeId, challenge.id),
    )
    .execute();

  return Ok(accessibleChallengesResult.length);
};
