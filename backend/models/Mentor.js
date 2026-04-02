import mongoose from "mongoose";

const mentor = new mongoose.Schema(
    {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    
        name: {
          type: String,
          required: true
        },
    
        email: {
          type: String,
          required: true
        },

        specialization: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("Mentor", mentor)