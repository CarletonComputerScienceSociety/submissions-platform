import {
  Challenge,
  Evaluation,
  Format,
  Participant,
  Submission,
  Transformer,
  Judge,
} from "../../challenges-platform/models";

export class PhotoChallengeSubmission extends Submission {
  photoUrl: string;

  constructor({
    id,
    uuid,
    photoUrl,
    challenge,
    participant,
    assignee,
  }: {
    id: number;
    uuid: string;
    photoUrl: string;
    challenge: Challenge;
    participant: Participant;
    assignee: Judge | null;
  }) {
    super({ id, uuid, challenge, participant, assignee });
    this.photoUrl = photoUrl;
  }
}

export class PhotoChallenge extends Challenge {
  constructor({
    id,
    uuid,
    title,
    body,
    format,
    points,
  }: {
    id: number;
    uuid: string;
    title: string;
    body: string;
    format: Format;
    points: number;
  }) {
    super({
      id,
      uuid,
      title,
      body,
      format,
      points,
      evaluation: Evaluation.MANUAL,
      deleted: false,
    });
  }
}

export class PhotoTransformer extends Transformer {
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
