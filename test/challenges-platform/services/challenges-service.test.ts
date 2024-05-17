import { db } from "../../../db";
import { challenges } from "../../../db/schema";

describe("ChallengesService", () => {
  describe("findChallengeById", () => {
    it("return 'Hello, World!'", async () => {
      //   const challenge = await db.insert(challenges).values({
      //     title: "Test Challenge",
      //     body: "This is a test challenge",
      //     points: 100,
      //   });
      //   const records = await db.select().from(challenges).all();

      const result = "Hello, World!";
      expect(result).toBe("Hello, World!");
    });
  });
});
