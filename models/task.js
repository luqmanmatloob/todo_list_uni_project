import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    userid: String, // Change data type to Number to match the id field in the User model
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
