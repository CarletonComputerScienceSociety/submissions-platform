import { ReviewsService } from "../../../app/challenges-platform";
import { Status } from "../../../app/challenges-platform/models";
import { uuid } from "../../../app/common";

describe("ReviewsService", () => {
    describe("findByUuid", () => {
        describe("when the id is invalid", () => {
            it("returns an error", async () => {
                const result = await ReviewsService.findByUuid("invalid-id");

                expect(result.err).toBe(true);
                expect(result.val.toString()).toBe("Error: Invalid UUID");
            });
        });
        describe("when there is no record", () => {
            it("returns an error", async () => {
              const testUuid = uuid.create();
              const result = await ReviewsService.findByUuid(testUuid);
      
              expect(result.err).toBe(true);
              expect(result.val.toString()).toBe("Error: Review not found");
            });
          });
        // implement test for when there is an existing record, need factory(?) + create method 
    });
});