import {
  ChallengesService,
  SubmissionService,
} from "../../../app/challenges-platform";
import { challengeFactory } from "../factories/challenge-factory";
import { participantFactory } from "../factories/participant-factory";
import { accessibleChallengeFactory } from "../factories/accessible-challenge-factory";
import { uuid } from "../../../app/common";

describe("SubmissionService", () => {
  describe("findByUuid", () => {
    describe("when the id is invalid", () => {
      it("returns an error", async () => {
        const result = await SubmissionService.findByUuid("invalid-id");

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Invalid UUID");
      });
    });
    describe("when there is an existing record", () => {
      it("returns the submission", async () => {
        const challenge = await challengeFactory();
        const participant = await participantFactory();

        const insert = await accessibleChallengeFactory({
          challenge,
          participant,
        });

        const submission = await SubmissionService.create(
          challenge.uuid,
          participant.uuid,
        );
        if (!submission.ok) fail("Expected submission to be Ok");

        const result = await SubmissionService.findByUuid(submission.val.uuid);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.challenge.id).toBe(challenge.id);
        expect(result.val.participant.id).toBe(participant.id);
      });
    });
    describe("when there is no record", () => {
      it("returns an error", async () => {
        const testUuid = uuid.create();
        const result = await SubmissionService.findByUuid(testUuid);

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Submission not found");
      });
    });
  });

  describe("create", () => {
    describe("when challenge and participant exist", () => {
      it("succesfully creates a submission", async () => {
        const challenge = await challengeFactory();
        const participant = await participantFactory();

        const insert = await accessibleChallengeFactory({
          challenge,
          participant,
        });

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
