import mongoose from "mongoose";

const Certificate = new mongoose.Schema({
    internId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    approved: { type: Boolean, default: false },
    issuedAt: Date
});

export default mongoose.model("Certificate", Certificate);