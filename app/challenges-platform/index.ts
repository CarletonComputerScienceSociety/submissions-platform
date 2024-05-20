export {
  ChallengesService,
  ParticipantsService,
  ReviewsService,
  SubmissionService,
} from "./services";
import { Transformer } from "./models";
import { transformers } from "../../config/challenges-platform/transformers";
import { BaseTransformer } from "./models/Transformer";

class ChallengesPlatform {
  transformers: { [name: string]: typeof Transformer };
  constructor(transformers: { [name: string]: typeof Transformer }) {
    this.transformers = { ...transformers };
  }

  addTransformer(name: string, transformer: typeof Transformer) {
    this.transformers[name] = transformer;
  }

  findTransformer(name: string): typeof Transformer {
    if (name === "base") {
      return BaseTransformer;
    }

    if (!this.transformers[name]) {
      throw new Error(`Transformer not found: ${name}`);
    }

    return this.transformers[name];
  }
}

export const challengesPlatform: ChallengesPlatform = new ChallengesPlatform(
  transformers,
);
