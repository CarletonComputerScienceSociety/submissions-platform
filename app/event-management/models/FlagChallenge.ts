import {
  Challenge,
  Evaluation,
  Format,
  Participant,
  Submission,
  Transformer,
  Judge,
} from "../../challenges-platform/models";

export class FlagChallengeSubmission extends Submission {
  flag: string;

  constructor({
    id,
    uuid,
    challenge,
    participant,
    flag,
    assignee,
  }: {
    id: number;
    uuid: string;
    challenge: Challenge;
    participant: Participant;
    flag: string;
    assignee: Judge | null;
  }) {
    super({ id, uuid, challenge, participant, assignee });
    this.flag = flag;
  }
}

export class FlagChallenge extends Challenge {
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
      deleted: false,
    });
    this.flag = flag;
  }
}

export class FlagTransformer extends Transformer {
  public static newChallenge(payload: any) {
    const challenge = new FlagChallenge({
      id: payload.id,
      uuid: payload.uuid,
      title: payload.title,
      body: payload.body,
      format: Format.TEXT,
      points: payload.points,
      flag: payload.metadata.flag,
    });
    return challenge;
  }

  public static validateChallengeMetadata(payload: any): boolean {
    return payload.hasOwnProperty("flag");
  }

  public static newSubmission(
    payload: any,
    challenge: Challenge,
    participant: Participant,
  ): Submission {
    const submission = new FlagChallengeSubmission({
      id: payload.id,
      uuid: payload.uuid,
      challenge: challenge,
      participant: participant,
      flag: payload.flag,
      assignee: null,
    });
    return submission;
  }

  public static validateSubmissionMetadata(payload: any): boolean {
    return payload.hasOwnProperty("flag");
  }
}
