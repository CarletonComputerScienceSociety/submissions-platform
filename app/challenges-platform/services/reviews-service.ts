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

export const convert = async (result: any): Promise<Result<Review, Error>> => {
  let status: Status;
  switch (result[0].status) {
    case "approved":
      status = Status.APPROVED;
      break;
    case "rejected":
      status = Status.REJECTED;
      break;
    default:
      return Err(new Error("Invalid status"));
  }

  const review = new Review({
    id: result[0].id,
    status: status,
    comment: result[0].body,
  });

  return Ok(review);
};
