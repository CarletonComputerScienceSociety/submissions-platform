import { ParticipantsService } from "../../../app/challenges-platform";
import { participantFactory } from "../factories/participant-factory";

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
  }); 

  describe("findByEmail", () => {
    it("throws an error", async () => {
      const result = await ParticipantsService.findByEmail();

      expect(result.err).toBe(true);
    });
  });
});
