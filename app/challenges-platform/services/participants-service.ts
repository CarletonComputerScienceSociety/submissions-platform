import { eq } from "drizzle-orm";
import { Ok, Err, Result } from "ts-results";
import { Participant } from "../models/Participant";
import { db } from "../../../db";
import { participants } from "../../../db/schema";
import { uuid } from "../../../app/common";

export const findByUuid = async (
  id: string,
): Promise<Result<Participant, Error>> => {
  if (!uuid.isValid(id)) {
    return Err(new Error("Invalid UUID"));
  }

  const result = await db
    .select()
    .from(participants)
    .where(eq(participants.uuid, id));

  const participant = await convert(result[0]);

  return Ok(participant);
};

export const findById = async (
  id: number,
): Promise<Result<Participant, Error>> => {
  
  const result = await db
    .select()
    .from(participants)
    .where(eq(participants.id, id));
  
  const participant = await convert(result[0]);

  return Ok(participant);
}

export const convert = async (
  result: any,
): Promise<Participant> => {
  const challenge = new Participant({
    id: result.id,
    uuid: result.uuid,
    email: result.email,
  });

  return challenge;
}

export const findByEmail = async (
  email?: string,
): Promise<Result<Participant, Error>> => {
  return Err(new Error("Not implemented yet"));
};

export const create = async (
  email: string,
): Promise<Result<Participant, Error>> => {
  const id = uuid.create();

  // TODO: add a regex to validate email

  try {
    const result = await db
      .insert(participants)
      .values({
        uuid: id.toString(),
        email: email,
      })
      .returning();

    const participant = new Participant({
      id: result[0].id,
      uuid: result[0].uuid,
      email: result[0].email,
    });

    return Ok(participant);
  } catch (e) {
    return Err(new Error("Failed to create participant"));
  }
};
