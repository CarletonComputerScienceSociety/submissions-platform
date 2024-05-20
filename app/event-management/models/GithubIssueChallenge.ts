import {
  Challenge,
  Evaluation,
  Format,
  Participant,
  Submission,
  Transformer,
} from "../../challenges-platform/models";

export class GithubIssueChallengeSubmission extends Submission {
  issueId: string;
  repositoryId: string;

  constructor({
    id,
    uuid,
    issueId,
    repositoryId,
    challenge,
    participant,
  }: {
    id: number;
    uuid: string;
    issueId: string;
    repositoryId: string;
    challenge: Challenge;
    participant: Participant;
  }) {
    super({ id, uuid, challenge, participant });
    this.issueId = issueId;
    this.repositoryId = repositoryId;
  }
}

export class GithubIssueChallenge extends Challenge {
  constructor({
    id,
    uuid,
    title,
    body,
    points,
  }: {
    id: number;
    uuid: string;
    title: string;
    body: string;
    points: number;
  }) {
    super({
      id,
      uuid,
      title,
      body,
      format: Format.MARKDOWN,
      points,
      evaluation: Evaluation.MANUAL,
    });
  }
}

export class GithubIssueTransformer extends Transformer {
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
