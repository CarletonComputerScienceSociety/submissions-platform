abstract class Submission {
  challenge: Challenge;
  partipant: Participant;
  constructor(challenge: Challenge, participant: Participant) {
    this.challenge = challenge;
    this.partipant = participant;
  }

  // TODO: Implement these methods
  // abstract dbToObject(): Submission;
  // abstract objectToDb(): any;
}
