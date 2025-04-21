import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {
  return model.find({ quiz: quizId });
}
export function findQuestionById(questionId) {
  return model.findById(questionId);
}
export function createQuestion(question) {
  const newQuiz = { ...question, _id: uuidv4() };
  return model.create(newQuiz);
}
export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}
export function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, { $set: questionUpdates });
}
