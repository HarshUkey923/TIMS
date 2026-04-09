import mongoose from "mongoose";

const Task = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  mentorId:    { type: mongoose.Schema.Types.ObjectId, ref: "Mentor",  required: true },
  internId:    { type: mongoose.Schema.Types.ObjectId, ref: "Intern",  required: true },
  programId:   { type: mongoose.Schema.Types.ObjectId, ref: "Program", default: null },
  dueDate:     { type: Date,   default: null },
  fileUrl:     { type: String, default: null },
  status: {
    type: String,
    enum: ["Pending", "Submitted", "Reviewed"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Task", Task);
