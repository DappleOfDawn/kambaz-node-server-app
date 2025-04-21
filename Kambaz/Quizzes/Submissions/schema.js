import mongoose from "mongoose";
const answerSchema = new mongoose.Schema(
  {
    _id: String,
    question: { type: String, ref: "QuestionModel" },
    answer: String,
    correct: Boolean,
  }
);
const schema = new mongoose.Schema(
  {
    _id: String,
    user: { type: String, ref: "UserModel" },
    quiz: { type: String, ref: "QuizModel" },
    answers: [answerSchema],
    score: Number,
    submittedOn: Date,
  },
  { collection: "submissions" }
);
export default schema;