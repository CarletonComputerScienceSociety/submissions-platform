import { Format } from "../../../app/challenges-platform/models";
import {
  FlagChallenge,
  FlagChallengeSubmission,
  FlagTransformer,
} from "../../../app/event-management/models/FlagChallenge";
import { challengeFactory } from "../../challenges-platform/factories/challenge-factory";
import { participantFactory } from "../../challenges-platform/factories/participant-factory";

describe("FlagTransformer", () => {
  describe("newChallenge", () => {
    it("will create a new FlagChallenge instance with the provided payload", () => {
      const payload = {
        id: 1,
        uuid: "abc123",
        title: "Test Challenge",
        body: "This is a test challenge",
        points: 10,
        metadata: {
          flag: "test_flag",
        },
      };

      const challenge = FlagTransformer.newChallenge(payload);

      expect(challenge).toBeInstanceOf(FlagChallenge);
      expect(challenge.id).toBe(payload.id);
      expect(challenge.uuid).toBe(payload.uuid);
      expect(challenge.title).toBe(payload.title);
      expect(challenge.body).toBe(payload.body);
      expect(challenge.format).toBe(Format.TEXT);
      expect(challenge.points).toBe(payload.points);
      expect(challenge.flag).toBe(payload.metadata.flag);
    });
  });

  describe("validateChallengeMetadata", () => {
    it('will return true if the payload has the "flag" property', () => {
      const payload = {
        flag: "test_flag",
      };

      const result = FlagTransformer.validateChallengeMetadata(payload);

      expect(result).toBe(true);
    });

    it('will return false if the payload does not have the "flag" property', () => {
      const payload = {};

      const result = FlagTransformer.validateChallengeMetadata(payload);

      expect(result).toBe(false);
    });
  });

  describe("newSubmission", () => {
    it("will create a new FlagChallengeSubmission instance with the provided payload, challenge, and participant", async () => {
      const payload = {
        id: 1,
        uuid: "abc123",
        flag: "test_flag",
      };
      const challenge = await challengeFactory();
      const participant = await participantFactory();

      const submission = FlagTransformer.newSubmission(
        payload,
        challenge,
        participant,
      );

      if (!(submission instanceof FlagChallengeSubmission))
        fail("Expected submission to be correct type");
      expect(submission).toBeInstanceOf(FlagChallengeSubmission);
      expect(submission.id).toBe(payload.id);
      expect(submission.uuid).toBe(payload.uuid);
      expect(submission.challenge).toBe(challenge);
      expect(submission.participant).toBe(participant);
      expect(submission.flag).toBe(payload.flag);
    });
  });

  describe("validateSubmissionMetadata", () => {
    it('should return true if the payload has the "flag" property', () => {
      const payload = {
        flag: "test_flag",
      };

      const result = FlagTransformer.validateSubmissionMetadata(payload);

      expect(result).toBe(true);
    });

    it('should return false if the payload does not have the "flag" property', () => {
      const payload = {};

      const result = FlagTransformer.validateSubmissionMetadata(payload);

      expect(result).toBe(false);
    });
  });
});
