import { challengeFactory } from "./challenge-factory";
import { participantFactory } from "./participant-factory";
import {
  Challenge,
  Participant,
} from "../../../app/challenges-platform/models";
import { db } from "../../../db";
import { accessibleChallenges } from "../../../db/schema";

export const accessibleChallengeFactory = async ({
  challenge,
  participant,
}: {
  challenge?: Challenge;
  participant?: Participant;
} = {}): Promise<any> => {
  const c = challenge || (await challengeFactory());
  const p = participant || (await participantFactory());

  const insertResult = await db
    .insert(accessibleChallenges)
    .values({
      challengeId: c.id,
      participantId: p.id,
    })
    .returning();
};
