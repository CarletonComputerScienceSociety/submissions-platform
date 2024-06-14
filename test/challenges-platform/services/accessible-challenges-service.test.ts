import { challengeFactory } from "../factories/challenge-factory";
import { participantFactory } from "../factories/participant-factory";
import { accessibleChallengeFactory } from "../factories/accessible-challenge-factory";
import { AccessibleChallengesService } from "../../../app/challenges-platform";

describe("AccessibleChallengesService", () => {
  describe("count", () => {
    describe("when the challenge is not accessible", () => {
      it("returns 0", async () => {
        const challenge = await challengeFactory();
        const participant = await participantFactory();

        const result = await AccessibleChallengesService.count(challenge, participant);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val).toBe(0);
      });
    });
    describe("when the challenge is accessible", () => {
      it("returns 1", async () => {
        const challenge = await challengeFactory();
        const participant = await participantFactory();

        const insert = await accessibleChallengeFactory({
            challenge,
            participant
        });

        const result = await AccessibleChallengesService.count(challenge, participant);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val).toBe(1);
      });
    });
  })
});