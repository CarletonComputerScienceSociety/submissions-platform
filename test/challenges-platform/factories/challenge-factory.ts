import { ChallengesService } from "../../../app/challenges-platform";
import { Challenge } from "../../../app/challenges-platform/models";

export const challengeFactory = async ({
  title,
  body,
  points,
}: {
  title?: string;
  body?: string;
  points?: number;
} = {}): Promise<Challenge> => {
  const challengeTitle = title || "Test Challenge";
  const challengeBody = body || "This is a test challenge";
  const challengePoints = points || 100;

  const result = await ChallengesService.create({
    title: challengeTitle,
    body: challengeBody,
    points: challengePoints,
  });
  if (!result.ok) fail("Expected result to be Ok");
  return result.val;
};
