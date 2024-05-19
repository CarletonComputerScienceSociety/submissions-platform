import { challengeFactory } from "./challenge-factory";
import { participantFactory } from "./participant-factory";
import {
  Challenge,
  Participant,
  Submission,
} from "../../../app/challenges-platform/models";
import { SubmissionService } from "../../../app/challenges-platform";

export const submissionFactory = async ({
  participant,
  challenge,
}: {
  participant?: Participant;
  challenge?: Challenge;
} = {}): Promise<Submission> => {
  const c = challenge || (await challengeFactory());
  const p = participant || (await participantFactory());

  const result = await SubmissionService.create(c.uuid, p.uuid);
  if (!result.ok) fail("Expected result to be Ok");
  return result.val;
};
