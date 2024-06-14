export enum Status {
  APPROVED,
  REJECTED,
}

export class Review {
  id: number;
  uuid: string;
  status: Status;
  comment: string | null;

  constructor({
    id,
    uuid: uuid,
    status,
    comment,
  }: {
    id: number;
    uuid: string;
    status: Status;
    comment: string | null;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.status = status;
    this.comment = comment;
  }
}
