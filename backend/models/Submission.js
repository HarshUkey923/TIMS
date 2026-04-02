import mongoose from "mongoose";

const Submission = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  internId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileUrl: String,
  feedback: String,
  rating: Number
}, { timestamps: true });

export default mongoose.model("Submission", Submission);
