import { ChallengesService } from "../../../app/challenges-platform";
import { challengeFactory } from "../factories/challenge-factory";

describe("ChallengesService", () => {
  describe("findByUuid", () => {
    describe("when the id is invalid", () => {
      it("returns an error", async () => {
        const result = await ChallengesService.findByUuid("invalid-id");

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Invalid UUID");
      });
    });

    describe("when there is an existing record", () => {
      it("returns the challenge", async () => {
        const challenge = await challengeFactory();

        const result = await ChallengesService.findByUuid(challenge.uuid);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.title).toBe("Test Challenge");
        expect(result.val.body).toBe("This is a test challenge");
        expect(result.val.points).toBe(100);
      });
    });
  });

  describe("create", () => {
    it("succesfully creates a challenge", async () => {
      const title = "Test Challenge";
      const body = "This is a test challenge";
      const points = 100;

      const result = await ChallengesService.create(title, body, points);

      if (!result.ok) fail("Expected result to be Ok");
      expect(result.val.title).toBe(title);
      expect(result.val.body).toBe(body);
      expect(result.val.points).toBe(points);
    });
  });

  describe("update", () => {
    it("throws an error", async () => {
      const result = await ChallengesService.update();

      expect(result.err).toBe(true);
    });
  });

  describe("destroy", () => {
    it("throws an error", async () => {
      const result = await ChallengesService.destroy();

      expect(result.err).toBe(true);
    });
  });
});
