import { BaseTransformer } from "../../../app/challenges-platform/models/Transformer";
import {
  Challenge,
  Evaluation,
  Format,
} from "../../../app/challenges-platform/models";

describe("BaseTransformer", () => {
  describe("newChallenge", () => {
    it("should create a new Challenge instance with the provided data", () => {
      const payload = {
        id: 1,
        uuid: "abc123",
        title: "Test Challenge",
        body: "This is a test challenge",
        points: 10,
      };

      const challenge = BaseTransformer.newChallenge(payload);

      expect(challenge).toBeInstanceOf(Challenge);
      expect(challenge.id).toBe(payload.id);
      expect(challenge.uuid).toBe(payload.uuid);
      expect(challenge.title).toBe(payload.title);
      expect(challenge.body).toBe(payload.body);
      expect(challenge.format).toBe(Format.TEXT);
      expect(challenge.points).toBe(payload.points);
      expect(challenge.evaluation).toBe(Evaluation.MANUAL);
    });
  });

  describe("validateChallengeMetadata", () => {
    it("should return true", async () => {
      const isMetadataValid = await BaseTransformer.validateChallengeMetadata(
        {},
      );

      expect(isMetadataValid).toBe(true);
    });
  });
});
