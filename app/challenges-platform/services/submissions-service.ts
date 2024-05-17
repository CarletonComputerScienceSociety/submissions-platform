const createSubmission = async (
  submission: Submission,
): Promise<Submission> => {
  // TODO: pull challenge and participant from challenges-platform services
  // const challenge = await challengeService.findById(challengeId);
  // const participant = await participantService.getParticipant(participantId);
  // TODO: Validate that the participant is allowed to submit this challenge (available challenges)
  // throw new Error("Participant is not allowed to submit this challenge") if not allowed (use participant-service)
  // TODO: try to build the submission object
  // const submission = challenge.buildSubmission(submissionBody)
  // TODO: if submission failed to build, surface the error
  // throw new Error("Submission failed to build") if submission operations is err
  // TODO: switch on submission.challenge.evaluation
  // if submission.challenge.evaluation is MANUAL, than save it to the database
  // if submission.challenge.evaluation is AUTOMATIC, than evaluate it right now
  // use a transaction to save the submission and submission review at the sane time
  // if the submission is correct, also make new challenges available to the participant

  // TODO: this should really return a success/err
  return submission;
};
