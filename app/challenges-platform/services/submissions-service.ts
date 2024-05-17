const createSubmission = async (
  submission: Submission,
): Promise<Submission> => {
  // TODO: switch on submission.challenge.evaluation
  // if submission.challenge.evaluation is MANUAL, than save it to the database
  // if submission.challenge.evaluation is AUTOMATIC, than evaluate it right now
  // use a transaction to save the submission and submission review at the sane time
  // if the submission is correct, also make new challenges available to the participant

  // TODO: this should really return a success/err
  return submission;
};
