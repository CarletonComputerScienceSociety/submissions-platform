import { GithubIssueTransformer } from "../../app/event-management/models/GithubIssueChallenge";
import { FlagTransformer } from "../../app/event-management/models/FlagChallenge";
import { PhotoTransformer } from "../../app/event-management/models/PhotoChallenge";
import { Transformer } from "../../app/challenges-platform/models";

export const transformers: { [name: string]: typeof Transformer } = {
  flag: FlagTransformer,
  "github-issue": GithubIssueTransformer,
  photo: PhotoTransformer,
};
