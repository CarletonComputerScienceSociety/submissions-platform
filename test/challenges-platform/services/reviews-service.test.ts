import { ReviewsService } from "../../../app/challenges-platform";
import { Status } from "../../../app/challenges-platform/models";
import { uuid } from "../../../app/common";
import { accessibleChallengeFactory } from "../factories/accessible-challenge-factory";
import { reviewFactory } from "../factories/review-factory";
import { submissionFactory } from "../factories/submission-factory";

describe("ReviewsService", () => {
  describe("create", () => {
    describe("when submission exists", () => {
      it("succesfully creates a review", async () => {
        const [challenge, participant] = await accessibleChallengeFactory();
        const submission = await submissionFactory({
          challenge: challenge,
          participant: participant,
        });
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
    describe("when submission has already been reviewed", () => {
      it("returns an error", async () => {
        const [challenge, participant] = await accessibleChallengeFactory();
        const submission = await submissionFactory({
          challenge: challenge,
          participant: participant,
        });
        const body = "Nice work";
        await reviewFactory({
          submission: submission,
          body: body,
        });

        const result = await ReviewsService.create(
          Status.APPROVED,
          submission.id,
          body,
        );

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe(
          "Error: Submission has already been reviewed",
        );
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
  describe("findByUuid", () => {
    describe("when review exists", () => {
      it("returns the review", async () => {
        const body = "Nice work";
        const [challenge, participant] = await accessibleChallengeFactory();
        const submission = await submissionFactory({
          challenge: challenge,
          participant: participant,
        });
        const review = await reviewFactory({
          submission: submission,
          body: body,
        });

        const result = await ReviewsService.findByUuid(review.uuid);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.status).toBe(Status.APPROVED);
        expect(result.val.comment).toBe(body);
      });
    });
    describe("when review does not exist", () => {
      it("returns an error", async () => {
        const invalidUuid = "invalid-uuid";
        const result = await ReviewsService.findByUuid(invalidUuid);

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Invalid UUID");
      });
    });

    describe("when uuid is invalid", () => {
      it("returns an error", async () => {
        const testUuid = uuid.create();
        const result = await ReviewsService.findByUuid(testUuid);

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Review not found");
      });
    });
  });
});
