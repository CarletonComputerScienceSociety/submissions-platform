// TODO should dependency inject this into challenges-platform?

const getByName = (name: string) => {
  switch (name) {
    case "flag-challenge":
      return FlagChallenge;
    case "github-issue-challenge":
      return GithubIssueChallenge;
    case "photo-challenge":
      return PhotoChallenge;
    default:
      throw new Error("Challenge type not found");
  }
};
