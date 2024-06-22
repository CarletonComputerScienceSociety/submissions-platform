import {
  Review,
  Status,
  Submission,
} from "../../../app/challenges-platform/models";
import { uuid } from "../../../app/common";
import { db } from "../../../db";
import { reviews } from "../../../db/schema";
import { submissionFactory } from "./submission-factory";

export const reviewFactory = async ({
  status,
  submission,
  body,
}: {
  status?: Status;
  submission?: Submission;
  body?: string;
} = {}): Promise<Review> => {
  const st = status || Status.APPROVED;
  const s = submission || (await submissionFactory());
  const b = body || "test review";

  const statusString = st === Status.APPROVED ? "approved" : "rejected";
  const insertResult = await db
    .insert(reviews)
    .values({
      uuid: uuid.create(),
      status: statusString.toString(),
      submissionId: s.id,
      body: b,
    })
    .returning();

  const review = new Review({
    id: insertResult[0].id,
    uuid: insertResult[0].uuid,
    status: st,
    comment: b,
  });

  return review;
};
