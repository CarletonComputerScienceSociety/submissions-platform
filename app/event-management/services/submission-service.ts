const submit = async (
  challengeId: string,
  participantId: string,
  submissionBody: any,
) => {
  // TODO: pull challenge and participant from challenges-platform services
  // const challenge = await challengeService.findById(challengeId);
  // const participant = await participantService.getParticipant(participantId);
  // TODO: Validate that the participant is allowed to submit this challenge (available challenges)
  // throw new Error("Participant is not allowed to submit this challenge") if not allowed (use participant-service)
  // TODO: try to build the submission object
  // const submission = challenge.buildSubmission(submissionBody)
  // TODO: if submission failed to build, surface the error
  // throw new Error("Submission failed to build") if submission operations is err
  // TODO: if submission is valid, call submission-service to save the submission
  // TODO: return whatever we want to return for API (probably submission object that should be serialized by infra layer)
};
