import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  heading: { type: String ,unique:true,required:true}, // The user's email address
  content: { type: String }, // The generated OTP
  img: { type: String }, // The generated OTP
},
{
  timestamps:true
}
)



export default mongoose.models?.service || mongoose.model("service", ServiceSchema);
