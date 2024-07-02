import { db } from "../../../db";
import { judges } from "../../../db/schema";
import { uuid } from "../../../app/common";
import { Judge } from "../../../app/challenges-platform/models";

export const judgeFactory = async (): Promise<Judge> => {
  const insertResult = await db
    .insert(judges)
    .values({
      uuid: uuid.create(),
    })
    .returning();

  const judge = new Judge({
    id: insertResult[0].id,
    uuid: insertResult[0].uuid,
  });

  return judge;
};
