export enum Status {
  APPROVED,
  REJECTED,
}

export class Review {
  id: string;
  status: Status;
  comment: string | null;

  constructor({
    id,
    status,
    comment,
  }: {
    id: string;
    status: Status;
    comment: string | null;
  }) {
    this.id = id;
    this.status = status;
    this.comment = comment;
  }
}
