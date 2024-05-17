import express, { Request, Response } from "express";
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

router.get("/", getAPIRoot);
router.get("/challenges", getChallenges);

export default router;
