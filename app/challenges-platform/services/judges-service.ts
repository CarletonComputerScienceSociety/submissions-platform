import { eq } from "drizzle-orm";
import { Ok, Err, Result } from "ts-results";
import { db } from "../../../db";
import { judges } from "../../../db/schema";
import { uuid } from "../../../app/common";
import { Judge } from "../models";

export const findByUuid = async (id: string): Promise<Result<Judge, Error>> => {
  if (!uuid.isValid(id)) {
    return Err(new Error("Invalid UUID"));
  }

  const result = await db.select().from(judges).where(eq(judges.uuid, id));

  if (result.length === 0) {
    return Err(new Error("Judge not found"));
  }

  const record = result[0];
  const judge = new Judge({
    id: record.id,
    uuid: record.uuid,
  });

  return Ok(judge);
};
