import mongoose from "mongoose";

const ExtraOption = new mongoose.Schema({
  typeOfAccount: { type: String },
  extraPrice: { type: Number },
});


const ProductSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    desc: { type: String },
    img: { type: String, required:true},
    category: { type: mongoose.Types.ObjectId, required:true},
    qty:{type:Number, default:1},
    basePrice: { type: Number,required:true },
    accountTypes:{type:[ExtraOption]},
  },
  { timestamps: true }
);


// Create a text index on the `name` and `description` fields
ProductSchema.index({ accountName: "text", desc: "text" });

export default mongoose.models?.Product || mongoose.model("Product", ProductSchema);
