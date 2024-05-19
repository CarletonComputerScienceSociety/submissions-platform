import { Challenge } from "./Challenge";
import { Participant } from "./Participant";

export class Submission {
  id: number;
  uuid: string;
  challenge: Challenge;
  participant: Participant;

  constructor({
    id,
    uuid,
    challenge,
    participant,
  }: {
    id: number;
    uuid: string;
    challenge: Challenge;
    participant: Participant;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.challenge = challenge;
    this.participant = participant;
  }

  // TODO: Implement these methods
  // abstract dbToObject(): Submission;
  // abstract objectToDb(): any;
}
