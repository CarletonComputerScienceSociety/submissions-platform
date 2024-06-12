import { Ok, Err, Result } from "ts-results";
import { Review, Status } from "../models/Review";
import { db } from "../../../db";
import { reviews } from "../../../db/schema";
import { uuid } from "../../../app/common";

export const create = async (
  status: Status,
  submissionId: number,
  body: string,
): Promise<Result<Review, Error>> => {
  // TODO: add a check to make sure the submission exists
  // TODO: check if submission has already been approved or rejected, handle accordingly

  const id = uuid.create();

  try {
    const result = await db
      .insert(reviews)
      .values({
        uuid: id,
        status: Status[status],
        body: body,
        submissionId: submissionId,
      })
      .returning();

    const review = new Review({
      id: result[0].id,
      status: status,
      comment: result[0].body,
    });

    return Ok(review);
  } catch (e) {
    return Err(new Error("Failed to create review"));
  }
};
