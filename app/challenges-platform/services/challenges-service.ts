import { eq } from "drizzle-orm";
import { Err, Ok, Result } from "ts-results";
import { uuid } from "../../../app/common";
import { db } from "../../../db";
import { challenges } from "../../../db/schema";
import { challengesPlatform } from "../index";
import { Challenge } from "../models/Challenge";

export const findByUuid = async (
  id: string,
): Promise<Result<Challenge, Error>> => {
  if (!uuid.isValid(id)) {
    return Err(new Error("Invalid UUID"));
  }

  const result = await db
    .select()
    .from(challenges)
    .where(eq(challenges.uuid, id));

  if (result.length === 0) {
    return Err(new Error("Challenge not found"));
  }

  const challenge = await convert(result[0]);

  return Ok(challenge);
};

export const findById = async (
  id: number,
): Promise<Result<Challenge, Error>> => {
  const result = await db
    .select()
    .from(challenges)
    .where(eq(challenges.id, id));

  if (result.length === 0) {
    return Err(new Error("Challenge not found"));
  }

  const challenge = await convert(result[0]);

  return Ok(challenge);
};

export const convert = async (result: any): Promise<Challenge> => {
  const transformer = challengesPlatform.findTransformer(result.type);
  const challenge = transformer.newChallenge(result);

  return challenge;
};

export const create = async ({
  title,
  body,
  points,
  type = "base",
  metadata = {},
}: {
  title: string;
  body: string;
  points: number;
  type?: string;
  metadata?: any;
}): Promise<Result<Challenge, Error>> => {
  const id = uuid.create();

  try {
    const transformer = challengesPlatform.findTransformer(type);
    const metadataIsValid = transformer.validateChallengeMetadata(metadata);

    if (!metadataIsValid) {
      return Err(new Error("Invalid metadata"));
    }

    const result = await db
      .insert(challenges)
      .values({
        uuid: id,
        title: title,
        body: body,
        points: points,
        type: type,
        metadata: metadata,
      })
      .returning();

    const challenge = transformer.newChallenge(result[0]);
    return Ok(challenge);
  } catch (e) {
    return Err(new Error("Failed to create challenge"));
  }
};

export const update = async (): Promise<Result<Challenge, Error>> => {
  // TODO: should succesfully update a challenge
  return Err(new Error("Not implemented"));
};

export const destroy = async (
  id: string,
): Promise<Result<Challenge, Error>> => {
  try {
    const result = await db
      .update(challenges)
      .set({ deleted: true })
      .where(eq(challenges.uuid, id))
      .returning();
    const transformer = challengesPlatform.findTransformer(result[0].type);
    const challenge = transformer.newChallenge(result[0]);
    return Ok(challenge);
  } catch (e) {
    return Err(new Error("Failed to mark challenge as deleted"));
  }
};
