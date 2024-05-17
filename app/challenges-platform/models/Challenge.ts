enum Format {
  TEXT,
  HTML,
  MARKDOWN,
}

enum Evaluation {
  MANUAL,
  AUTOMATIC,
}

abstract class Challenge {
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

  // abstract validSubmission(submission: any): boolean;
  abstract dbToObject(): Challenge;
  abstract objectToDb(): any;
  abstract buildSubmission(submissionBody: any): Submission;
}
