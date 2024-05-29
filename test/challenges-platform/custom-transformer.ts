import {
  Challenge,
  Evaluation,
  Format,
  Participant,
  Submission,
  Transformer,
} from "../../app/challenges-platform/models";

export class CustomSubmission extends Submission {
  propString: string;
  propNumber: number;

  constructor({
    id,
    uuid,
    challenge,
    participant,
    propString,
    propNumber,
  }: {
    id: number;
    uuid: string;
    challenge: Challenge;
    participant: Participant;
    propString: string;
    propNumber: number;
  }) {
    super({ id, uuid, challenge, participant });
    this.propString = propString;
    this.propNumber = propNumber;
  }
}

export class CustomChallenge extends Challenge {
  propString: string;
  propNumber: number;
  constructor({
    id,
    uuid,
    title,
    body,
    format,
    points,
    propString,
    propNumber,
  }: {
    id: number;
    uuid: string;
    title: string;
    body: string;
    format: Format;
    points: number;
    propString: string;
    propNumber: number;
  }) {
    super({
      id,
      uuid,
      title,
      body,
      format,
      points,
      evaluation: Evaluation.MANUAL,
      deleted: "FALSE",
    });
    this.propString = propString;
    this.propNumber = propNumber;
  }
}

export class CustomTransformer extends Transformer {
  public static newChallenge(payload: any) {
    const challenge = new CustomChallenge({
      id: payload.id,
      uuid: payload.uuid,
      title: payload.title,
      body: payload.body,
      format: Format.TEXT,
      points: payload.points,
      propString: payload.metadata.propString,
      propNumber: payload.metadata.propNumber,
    });
    return challenge;
  }

  public static validateChallengeMetadata(payload: any): boolean {
    return (
      payload.hasOwnProperty("propString") &&
      payload.hasOwnProperty("propNumber")
    );
  }

  public static newSubmission(
    payload: any,
    challenge: Challenge,
    participant: Participant,
  ): Submission {
    const submission = new CustomSubmission({
      id: payload.id,
      uuid: payload.uuid,
      challenge: challenge,
      participant: participant,
      propString: payload.propString,
      propNumber: payload.propNumber,
    });
    return submission;
  }

  public static validateSubmissionMetadata(payload: any): boolean {
    return (
      payload.hasOwnProperty("propString") &&
      payload.hasOwnProperty("propNumber")
    );
  }
}
