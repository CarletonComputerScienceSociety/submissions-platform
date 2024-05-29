export enum Format {
  TEXT,
  HTML,
  MARKDOWN,
}

export enum Evaluation {
  MANUAL,
  AUTOMATIC,
}
export class Challenge {
  id: number;
  uuid: string;
  title: string;
  body: string;
  format: Format;
  evaluation: Evaluation;
  points: number;
  deleted: string;

  constructor({
    id,
    uuid,
    title,
    body,
    format,
    evaluation,
    points,
    deleted,
  }: {
    id: number;
    uuid: string;
    title: string;
    body: string;
    format: Format;
    evaluation: Evaluation;
    points: number;
    deleted: string,
  }) {
    this.id = id;
    this.uuid = uuid;
    this.title = title;
    this.body = body;
    this.format = format;
    this.evaluation = evaluation;
    this.points = points;
    this.deleted = deleted;
  }
}
