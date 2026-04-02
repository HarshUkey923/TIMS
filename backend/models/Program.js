import mongoose from "mongoose";

const Program = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    interns: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true});

export default mongoose.model("Program", Program);