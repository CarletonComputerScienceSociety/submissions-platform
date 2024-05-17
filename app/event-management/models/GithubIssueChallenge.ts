class GithubIssueChallengeSubmission extends Submission {
  issueId: string;
  repositoryId: string;

  constructor({
    issueId,
    repositoryId,
    challenge,
    participant,
  }: {
    issueId: string;
    repositoryId: string;
    challenge: Challenge;
    participant: Participant;
  }) {
    super(challenge, participant); // Add the missing participant argument
    this.issueId = issueId;
    this.repositoryId = repositoryId;
  }
}

class GithubIssueChallenge extends Challenge {
  constructor({
    id,
    title,
    body,
    points,
  }: {
    id: string;
    title: string;
    body: string;
    points: number;
  }) {
    super(id, title, body, Format.MARKDOWN, Evaluation.AUTOMATIC, points);
  }

  dbToObject(): GithubIssueChallenge {
    throw new Error("Method not implemented.");
    return this;
  }

  objectToDb(): any {
    throw new Error("Method not implemented.");
  }

  buildSubmission(submissionBody: any): GithubIssueChallengeSubmission {
    throw new Error("Method not implemented.");
  }
}
