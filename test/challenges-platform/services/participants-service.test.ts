import { ParticipantsService } from "../../../app/challenges-platform";
import { participantFactory } from "../factories/participant-factory";
import { uuid } from "../../../app/common";

describe("ParticipantsService", () => {
  describe("create", () => {
    describe("when the email is valid", () => {
      it("succesfully creates a challenge", async () => {
        const email = "test@email.com";

        const result = await ParticipantsService.create(email);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.email).toBe(email);
      });
    });
  });

  describe("findByUuid", () => {
    describe("when the id is invalid", () => {
      it("returns an error", async () => {
        const result = await ParticipantsService.findByUuid("invalid-id");

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Invalid UUID");
      });
    });

    describe("when there is an existing record", () => {
      it("returns the participant", async () => {
        const participant = await participantFactory();
        const result = await ParticipantsService.findByUuid(participant.uuid);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.email).toBe(participant.email);
      });
    });

    describe("when there is no record", () => {
      it("returns an error", async () => {
        const testUuid = uuid.create();
        const result = await ParticipantsService.findByUuid(testUuid);

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Participant not found");
      });
    });
  });

  describe("findById", () => {
    describe("when there is an existing record", () => {
      it("returns the participant", async () => {
        const participant = await participantFactory();
        const result = await ParticipantsService.findById(participant.id);

        if (!result.ok) fail("Expected result to be Ok");
        expect(result.val.email).toBe(participant.email);
      });
    });
    
    describe("when there is no record", () => {
      it("returns an error", async () => {
        const testId = -1;
        const result = await ParticipantsService.findById(testId);

        expect(result.err).toBe(true);
        expect(result.val.toString()).toBe("Error: Participant not found");
      });
    });
  });

  describe("findByEmail", () => {
    it("throws an error", async () => {
      const result = await ParticipantsService.findByEmail();

      expect(result.err).toBe(true);
    });
  });
});
