import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    quiz: { type: String, ref: "QuizModel" },
    questionText: String,
    questionType: {
      type: String,
      enum: ["MULTIPLE CHOICE", "TRUE FALSE", "FILL IN THE BLANK"],
      default: "MULTIPLE CHOICE",
    },
    points: Number,
    answers: [String],
    correctAnswers: [String],
  },
  { collection: "questions" }
);
export default schema;