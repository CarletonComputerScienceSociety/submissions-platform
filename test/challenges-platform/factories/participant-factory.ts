import { Participant } from "../../../app/challenges-platform/models";
import { ParticipantsService } from "../../../app/challenges-platform/services";

export const participantFactory = async (
  email?: string,
): Promise<Participant> => {
  const participantEmail = email || "test@email.com";

  const result = await ParticipantsService.create(participantEmail);
  if (!result.ok) fail("Expected result to be Ok");
  return result.val;
};
