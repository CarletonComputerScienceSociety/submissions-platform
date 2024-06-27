import { eq } from "drizzle-orm";
import { Ok, Err, Result } from "ts-results";
import { Review, Status } from "../models/Review";
import { db } from "../../../db";
import { reviews } from "../../../db/schema";
import { uuid } from "../../../app/common";

export const findByUuid = async (
  id: string,
): Promise<Result<Review, Error>> => {
  if (!uuid.isValid(id)) {
    return Err(new Error("Invalid UUID"));
  }

  const result = await db.select().from(reviews).where(eq(reviews.uuid, id));

  if (result.length === 0) {
    return Err(new Error("Review not found"));
  }

  const review = await convert(result[0]);

  return review;
};

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
      uuid: id,
      status: status,
      comment: result[0].body,
    });

    return Ok(review);
  } catch (e) {
    return Err(new Error("Failed to create review"));
  }
};
export const convert = async (result: any): Promise<Result<Review, Error>> => {
  let status: Status;
  switch (result.status) {
    case "APPROVED":
      status = Status.APPROVED;
      break;
    case "REJECTED":
      status = Status.REJECTED;
      break;
    default:
      return Err(new Error("Invalid status"));
  }

  const review = new Review({
    id: result.id,
    uuid: result.uuid,
    status: status,
    comment: result.body,
  });

  return Ok(review);
};
