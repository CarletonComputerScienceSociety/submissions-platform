import { eq } from "drizzle-orm";
import { Ok, Err, Result } from "ts-results";
import { Challenge, Format, Evaluation } from "../models/Challenge";
import { db } from "../../../db";
import { challenges } from "../../../db/schema";
import { uuid } from "../../../app/common";

export const findById = async (
  id: string,
): Promise<Result<Challenge, Error>> => {
  if (!uuid.isValid(id)) {
    return Err(new Error("Invalid UUID"));
  }

  const result = await db
    .select()
    .from(challenges)
    .where(eq(challenges.uuid, id));

  const challenge = new Challenge({
    id: result[0].uuid,
    title: result[0].title,
    body: result[0].body,
    points: result[0].points,
    format: Format.TEXT,
    evaluation: Evaluation.MANUAL,
  });

  return Ok(challenge);
};

export const create = async (
  title: string,
  body: string,
  points: number,
): Promise<Result<Challenge, Error>> => {
  const id = uuid.create();

  try {
    const result = await db
      .insert(challenges)
      .values({
        uuid: id.toString(),
        title: title,
        body: body,
        points: points,
      })
      .returning();

    const challenge = new Challenge({
      id: result[0].uuid,
      title: result[0].title,
      body: result[0].body,
      points: result[0].points,
      format: Format.TEXT,
      evaluation: Evaluation.MANUAL,
    });

    return Ok(challenge);
  } catch (e) {
    return Err(new Error("Failed to create challenge"));
  }
};
