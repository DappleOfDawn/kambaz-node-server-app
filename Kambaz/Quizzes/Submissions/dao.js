import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findUserSubmissionsForQuiz(userId, quizId) {
  return model.find({ user: userId, quiz: quizId }).populate("answers");
}
export async function findRecentScoreForQuiz(userId, quizId) {
  const scores = await model.find({user: userId, quiz: quizId}).sort((a, b) => new Date(a.submittedOn) - new Date(b.submittedOn));
  if (scores) return scores[0].score;
  return { message: "No score found for this user on this quiz" };
}
export function createSubmission(submission) {
  const newSubmission = { ...submission, _id: uuidv4() };
  return model.create(newSubmission);
}
export function deleteSubmission(submissionId) {
  return model.deleteOne({ _id: submissionId });
}
export function updateSubmission(submissionId, submissionUpdates) {
  return model.updateOne({ _id: submissionId }, { $set: submissionUpdates });
}
