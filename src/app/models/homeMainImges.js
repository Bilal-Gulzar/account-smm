import mongoose from "mongoose";

const HomeMainImgesSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models?.homeMainImages ||
  mongoose.model("homeMainImages", HomeMainImgesSchema);
