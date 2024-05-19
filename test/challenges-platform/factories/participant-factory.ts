import { ParticipantsService } from "../../../app/challenges-platform/services";
import { Participant } from "../../../app/challenges-platform/models";

export const participantFactory = async (
  email?: string,
): Promise<Participant> => {
  const participantEmail = email || "test@email.com";

  const result = await ParticipantsService.create(participantEmail);
  if (!result.ok) fail("Expected result to be Ok");
  return result.val;
};
