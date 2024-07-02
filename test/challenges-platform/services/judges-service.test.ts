import { JudgesService } from "../../../app/challenges-platform";
import { judgeFactory } from "../factories/judge-factory";
import { uuid } from "../../../app/common";

describe("JudgesService", () => {
  describe("findByUuid", () => {
    describe("when the id is invalid", () => {
      it("returns an error", async () => {
        const result = await JudgesService.findByUuid("invalid-id");

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Invalid UUID");
      });
    });

    describe("when there is no record", () => {
      it("returns an error", async () => {
        const testUuid = uuid.create();
        const result = await JudgesService.findByUuid(testUuid);

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Judge not found");
      });
    });

    describe("when there is an existing record", () => {
      it("returns the judge", async () => {
        const judge = await judgeFactory();
        const result = await JudgesService.findByUuid(judge.uuid);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.uuid).toBe(judge.uuid);
      });
    });
  });
});
