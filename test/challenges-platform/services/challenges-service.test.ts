import { ChallengesService } from "../../../app/challenges-platform";
import { challengeFactory } from "../factories/challenge-factory";
import { CustomTransformer, CustomChallenge } from "../custom-transformer";
import { challengesPlatform } from "../../../app/challenges-platform";

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

  describe("findById", () => {
    describe("when there is an existing record", () => {
      it("returns the challenge", async () => {
        const challenge = await challengeFactory();

        const result = await ChallengesService.findById(challenge.id);

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

      const result = await ChallengesService.create({
        title,
        body,
        points,
      });

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
      const challenge = await challengeFactory();

      const result = await ChallengesService.destroy(challenge.uuid);

      if (!result.ok) fail("Expected result to be Ok");
      expect(result.val.deleted).toBe(true);
    });
  });

  describe("CustomTransformer", () => {
    describe("with invalid metadata", () => {
      it("will throw an error if metadata is incorrect", async () => {
        const transformerName = "custom";
        const invalidMetadata = {};
        challengesPlatform.addTransformer(transformerName, CustomTransformer);

        const createResult = await ChallengesService.create({
          title: "Test Challenge",
          body: "This is a test challenge",
          points: 100,
          type: transformerName,
          metadata: invalidMetadata,
        });

        expect(createResult.err).toBe(true);
        expect(createResult.val.toString()).toBe("Error: Invalid metadata");
      });
    });

    describe("with valid metadata", () => {
      it("will create a challenge with the provided metadata", async () => {
        const transformerName = "custom";
        const validMetadata = {
          propString: "test",
          propNumber: 123,
        };
        challengesPlatform.addTransformer(transformerName, CustomTransformer);

        const createResult = await ChallengesService.create({
          title: "Test Challenge",
          body: "This is a test challenge",
          points: 100,
          type: transformerName,
          metadata: validMetadata,
        });

        expect(createResult.ok).toBe(true);
        expect(createResult.val).toBeInstanceOf(CustomChallenge);
        if (!(createResult.val instanceof CustomChallenge))
          fail("Expected instance of CustomChallenge");
        expect(createResult.val.propString).toBe(validMetadata.propString);
        expect(createResult.val.propNumber).toBe(validMetadata.propNumber);
      });
    });
  });
});
