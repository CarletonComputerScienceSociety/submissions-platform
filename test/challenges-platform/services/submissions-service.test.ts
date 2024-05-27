import { SubmissionService } from "../../../app/challenges-platform";
import { challengeFactory } from "../factories/challenge-factory";
import { participantFactory } from "../factories/participant-factory";

describe("SubmissionService", () => {
  describe("create", () => {
    describe("when challenge and participant exist", () => {
      it("succesfully creates a submission", async () => {
        const challenge = await challengeFactory();
        const participant = await participantFactory();

        const result = await SubmissionService.create(
          challenge.uuid,
          participant.uuid,
        );

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.challenge.id).toBe(challenge.id);
        expect(result.val.participant.id).toBe(participant.id);
      });
    });
    describe("when challenge does not exist", () => {
      it("returns an error", async () => {
        const participant = await participantFactory();

        const result = await SubmissionService.create(
          "invalid-uuid",
          participant.uuid,
        );

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Failed to find challenge");
      });
    });
    describe("when participant does not exist", () => {
      it("returns an error", async () => {
        const challenge = await challengeFactory();

        const result = await SubmissionService.create(
          challenge.uuid,
          "invalid-uuid",
        );

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Failed to find participant");
      });
    });
  });
});
