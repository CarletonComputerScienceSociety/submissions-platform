import { Challenge } from "./Challenge";

export class Participant {
  id: number;
  uuid: string;
  email: string;
  availableChallenges: Challenge[];

  constructor({
    id,
    uuid,
    email,
  }: {
    id: number;
    uuid: string;
    email: string;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.email = email;
    this.availableChallenges = [];
  }
}
