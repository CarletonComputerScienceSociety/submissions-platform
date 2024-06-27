import { Transformer } from "../../app/challenges-platform/models";
import { FlagTransformer } from "../../app/event-management/models/FlagChallenge";
import { GithubIssueTransformer } from "../../app/event-management/models/GithubIssueChallenge";
import { PhotoTransformer } from "../../app/event-management/models/PhotoChallenge";

export const transformers: { [name: string]: typeof Transformer } = {
  flag: FlagTransformer,
  "github-issue": GithubIssueTransformer,
  photo: PhotoTransformer,
};
