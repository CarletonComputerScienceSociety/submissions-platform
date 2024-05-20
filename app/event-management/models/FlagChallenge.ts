import {
  Challenge,
  Evaluation,
  Format,
  Participant,
  Submission,
  Transformer,
} from "../../challenges-platform/models";

class FlagChallengeSubmission extends Submission {
  flag: string;

  constructor({
    id,
    uuid,
    challenge,
    participant,
    flag,
  }: {
    id: number;
    uuid: string;
    challenge: Challenge;
    participant: Participant;
    flag: string;
  }) {
    super({ id, uuid, challenge, participant });
    this.flag = flag;
  }
}

class FlagChallenge extends Challenge {
  flag: string;
  constructor({
    id,
    uuid,
    title,
    body,
    format,
    points,
    flag,
  }: {
    id: number;
    uuid: string;
    title: string;
    body: string;
    format: Format;
    points: number;
    flag: string;
  }) {
    super({
      id,
      uuid,
      title,
      body,
      format,
      points,
      evaluation: Evaluation.AUTOMATIC,
    });
    this.flag = flag;
  }
}

export class FlagTransformer extends Transformer {
  dbToChallengeObject() {
    throw new Error("Method not implemented.");
  }
  challengeObjectToDb() {
    throw new Error("Method not implemented.");
  }
  dbToSubmissionObject() {
    throw new Error("Method not implemented.");
  }
  submissionObjectToDb() {
    throw new Error("Method not implemented.");
  }
  buildSubmission(submissionBody: any) {
    throw new Error("Method not implemented.");
  }
}
