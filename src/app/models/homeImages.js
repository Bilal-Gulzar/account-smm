import mongoose from "mongoose";

const HomeImagesSchema = new mongoose.Schema(
    
  {  name:{type:String,required: true},
    image: { type: String, required: true },
    category: { type:String },
  },
  { timestamps: true }
);

export default mongoose.models?.homeImages ||
  mongoose.model("homeImages", HomeImagesSchema);