import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    description: String,
    quizType: {
      type: String,
      enum: ["GRADED QUIZ", "PRACTICE QUIZ", "GRADED SURVEY", "UNGRADED SURVEY"],
      default: "GRADED QUIZ",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    points: Number,
    shuffleAnswers: {
      type: Boolean,
      default: true,
    },
    timeLimit: {
      type: Number,
      default: 20,
    },
    multipleAttempts: {
      type: Boolean,
      default: false,
    },
    numberOfAttempts: {
      type: Number,
      default: 1,
    },
    showCorrectAnswers: {
      type: String,
      enum: ["Immediately", "No", "After Due Date"],
      default: "Immediately",
    },
    accessCode: {
      type: String,
      default: "",
    },
    oneQuestionAtATime: {
      type: Boolean,
      default: true,
    },
    webcamRequired: {
      type: Boolean,
      default: false,
    },
    lockQuestionsAfterAnswering: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "quizzes" }
);
export default schema;