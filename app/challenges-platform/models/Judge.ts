export class Judge {
  id: number;
  uuid: string;

  constructor({ id, uuid }: { id: number; uuid: string }) {
    this.id = id;
    this.uuid = uuid;
  }
}
