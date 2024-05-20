import { Result } from "ts-results";
import { SubmissionService } from "../../challenges-platform";
import { Submission } from "../../challenges-platform/models";

export const submit = async (
  challengeUuid: string,
  participantUuid: string,
  submissionBody: any,
): Promise<Result<Submission, Error>> => {
  // TODO: perform authorization check to ensure that the user is allowed to submit
  // if (is not authorized) {
  //   return Err(new Error("Not Authorized"));
  // }

  const submissionResult = SubmissionService.create(
    challengeUuid,
    participantUuid,
  );
  return submissionResult;
};
