import mongoose from "mongoose";

const Task = new mongoose.Schema({
  title: String,
  description: String,
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  internId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Pending", "Submitted", "Reviewed"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Task", Task);
