import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    user_id: { type: mongoose.Types.ObjectId, ref: "user" },
    priority: Number,
  },
  { timestamps: true }
);

export const todoModel = mongoose.model("todo", userSchema);
