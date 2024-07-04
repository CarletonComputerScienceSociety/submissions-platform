import express, { Request, Response } from "express";
import { ReviewsService } from "../../app/challenges-platform";
import { Status } from "../../app/challenges-platform/models";
import { db } from "../../db";
import { challenges } from "../../db/schema";

const router = express.Router();

const getAPIRoot = async (_: Request, response: Response) => {
  response.json({
    message: "API - 👋",
  });
};

// TODO: remove this route, it's just a demo to verify the db works
const getChallenges = async (_: Request, response: Response) => {
  const result = db.select().from(challenges).all();
  response.json(result);
};

const submitReview = async (request: Request, response: Response) => {
  if (!request.body.review) {
    response.status(400).json({ message: "Invalid request" });
    return;
  }

  const review = request.body.review;
  const { submissionId, comment } = review;
  let sentStatus = review.status;

  if (
    (sentStatus !== "APPROVED" && sentStatus !== "REJECTED") ||
    !submissionId ||
    !comment
  ) {
    response.status(400).json({ message: "Invalid request" });
    return;
  }
  const status = sentStatus === "APPROVED" ? Status.APPROVED : Status.REJECTED;

  const result = await ReviewsService.create(status, submissionId, comment);
  if (result.err) {
    response.status(500).json({ message: "Failed to create review" });
    return;
  }
  response.json(result);
};

router.get("/", getAPIRoot);
router.get("/challenges", getChallenges);
router.post("/reviews", submitReview);

export default router;
