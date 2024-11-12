import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type:String, unique:true , required: true},
    firstName: { type: String },
    lastName: { type: String },
    number: { type: Number },
    country: { type: String },
    address: { type: String },
    postalCode: { type: Number },
    city: { type: String },
    admin:{type:Boolean,default:false}
  },
  { timestamps: true }
); 

export default mongoose.models?.User || mongoose.model("User", UserSchema);
