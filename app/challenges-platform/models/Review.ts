export enum Status {
  APPROVED,
  REJECTED,
}

export class Review {
  id: number;
  status: Status;
  comment: string | null;

  constructor({
    id,
    status,
    comment,
  }: {
    id: number;
    status: Status;
    comment: string | null;
  }) {
    this.id = id;
    this.status = status;
    this.comment = comment;
  }
}
