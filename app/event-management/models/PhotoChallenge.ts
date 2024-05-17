class PhotoChallengeSubmission extends Submission {
  photoUrl: string;

  constructor({
    photoUrl,
    challenge,
    participant,
  }: {
    photoUrl: string;
    challenge: Challenge;
    participant: Participant;
  }) {
    super(challenge, participant); // Add the missing participant argument
    this.photoUrl = photoUrl;
  }
}

class PhotoChallenge extends Challenge {
  constructor({
    id,
    title,
    body,
    format,
    points,
  }: {
    id: string;
    title: string;
    body: string;
    format: Format;
    points: number;
  }) {
    super(id, title, body, format, Evaluation.MANUAL, points);
  }

  validSubmission(submission: Submission): boolean {
    // hypothetically validates for a photo url
    throw new Error("Method not implemented.");
  }

  dbToObject(): PhotoChallenge {
    throw new Error("Method not implemented.");
    return this;
  }

  objectToDb(): any {
    throw new Error("Method not implemented.");
  }

  buildSubmission(submissionBody: any): PhotoChallengeSubmission {
    throw new Error("Method not implemented.");
  }
}
