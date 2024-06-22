import { ReviewsService } from "../../../app/challenges-platform";
import { Status } from "../../../app/challenges-platform/models";
import { submissionFactory } from "../factories/submission-factory";

describe("ReviewsService", () => {
  describe("create", () => {
    describe("when submission exists", () => {
      it("succesfully creates a review", async () => {
        const submission = await submissionFactory();
        const body = "Nice work";

        const result = await ReviewsService.create(
          Status.APPROVED,
          submission.id,
          body,
        );

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.status).toBe(Status.APPROVED);
        expect(result.val.comment).toBe(body);
      });
    });
    describe("when submission does not exist", () => {
      it("returns an error", async () => {
        const invalidId = -1;
        const result = await ReviewsService.create(
          Status.REJECTED,
          invalidId,
          "body",
        );

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Failed to create review");
      });
    });
  });
});
