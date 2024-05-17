class Participant {
  id: string;
  email: string;
  availableChallenges: Challenge[];

  constructor({ id, email }: { id: string; email: string }) {
    this.id = id;
    this.email = email;
    this.availableChallenges = [];
  }
}
