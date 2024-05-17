class Participant {
  id: string;
  email: string;

  constructor({ id, email }: { id: string; email: string }) {
    this.id = id;
    this.email = email;
  }
}
