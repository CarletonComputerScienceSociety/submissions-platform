import { Challenge } from "./Challenge";
import { Participant } from "./Participant";
import { Judge } from "./Judge";

export class Submission {
  id: number;
  uuid: string;
  challenge: Challenge;
  participant: Participant;
  assignee: Judge | null;

  constructor({
    id,
    uuid,
    challenge,
    participant,
    assignee,
  }: {
    id: number;
    uuid: string;
    challenge: Challenge;
    participant: Participant;
    assignee: Judge | null;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.challenge = challenge;
    this.participant = participant;
    this.assignee = assignee;
  }
}
