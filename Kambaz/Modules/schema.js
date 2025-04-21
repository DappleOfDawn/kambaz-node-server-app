import mongoose from "mongoose";
const Lesson = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    module: { type: String, ref: "ModuleModel" },
  }
);
const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    course: { type: String, ref: "CourseModel" },
    lessons: [Lesson]
  },
  { collection: "modules" }
);
export default schema;