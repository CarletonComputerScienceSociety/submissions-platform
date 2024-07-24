import { Challenge, Evaluation, Format } from "./Challenge";
import { Participant } from "./Participant";
import { Submission } from "./Submission";
import { Judge } from "./Judge";

export abstract class Transformer {
  public static newChallenge(payload: any): Challenge {
    throw new Error("Method not implemented.");
  }

  public static validateChallengeMetadata(payload: any): boolean {
    throw new Error("Method not implemented.");
  }

  public static newSubmission(
    payload: any,
    challenge: Challenge,
    participant: Participant,
  ): Submission {
    throw new Error("Method not implemented.");
  }

  public static validateSubmissionMetadata(payload: any): boolean {
    throw new Error("Method not implemented.");
  }
}

export class BaseTransformer extends Transformer {
  public static newChallenge(payload: any) {
    const challenge = new Challenge({
      id: payload.id,
      uuid: payload.uuid,
      title: payload.title,
      body: payload.body,
      format: Format.TEXT,
      points: payload.points,
      evaluation: Evaluation.MANUAL,
      deleted: payload.deleted,
    });
    return challenge;
  }

  public static validateChallengeMetadata(payload: any): boolean {
    return true;
  }

  public static newSubmission(
    payload: any,
    challenge: Challenge,
    participant: Participant,
  ): Submission {
    const submission = new Submission({
      id: payload.id,
      uuid: payload.uuid,
      challenge: challenge,
      participant: participant,
      assignee: null,
    });
    return submission;
  }

  public static validateSubmissionMetadata(payload: any): boolean {
    return true;
  }
}
