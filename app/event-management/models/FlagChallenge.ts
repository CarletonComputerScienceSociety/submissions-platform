class FlagChallengeSubmission extends Submission {
  flag: string;

  constructor({
    flag,
    challenge,
    participant,
  }: {
    flag: string;
    challenge: Challenge;
    participant: Participant;
  }) {
    super(challenge, participant);
    this.flag = flag;
  }
}

class FlagChallenge extends Challenge {
  flag: string;
  constructor({
    id,
    title,
    body,
    format,
    points,
    flag,
  }: {
    id: string;
    title: string;
    body: string;
    format: Format;
    points: number;
    flag: string;
  }) {
    super(id, title, body, format, Evaluation.AUTOMATIC, points);
    this.flag = flag;
  }

  dbToObject(): FlagChallenge {
    throw new Error("Method not implemented.");
    return this;
  }
  objectToDb(): any {
    throw new Error("Method not implemented.");
  }

  buildSubmission(submissionBody: any): FlagChallengeSubmission {
    throw new Error("Method not implemented.");

    // TODO should throw error if flag is not present
    // const { flag } = submissionBody;
    // return new FlagChallengeSubmission({ flag });
  }
}
