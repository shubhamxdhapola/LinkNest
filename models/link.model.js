import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
