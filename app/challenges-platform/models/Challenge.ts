export enum Format {
  TEXT,
  HTML,
  MARKDOWN,
}

export enum Evaluation {
  MANUAL,
  AUTOMATIC,
}

export abstract class ChallengeTransformer {
  id: string;
  title: string;
  body: string;
  format: Format;
  evaluation: Evaluation;
  points: number;

  constructor(
    id: string,
    title: string,
    body: string,
    format: Format,
    evaluation: Evaluation,
    points: number,
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.format = format;
    this.evaluation = evaluation;
    this.points = points;
  }

  abstract dbToObject(): Challenge;
  abstract objectToDb(): any;
  abstract buildSubmission(submissionBody: any): Submission;
}

export class Challenge {
  id: string;
  title: string;
  body: string;
  format: Format;
  evaluation: Evaluation;
  points: number;

  constructor({
    id,
    title,
    body,
    format,
    evaluation,
    points,
  }: {
    id: string;
    title: string;
    body: string;
    format: Format;
    evaluation: Evaluation;
    points: number;
  }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.format = format;
    this.evaluation = evaluation;
    this.points = points;
  }
}
