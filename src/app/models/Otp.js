import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true }, // The user's email address
  otp: { type: String, required: true }, // The generated OTP
 expiresAt: { type: Date, required: true, index: { expires: 0 } }, // TTL index with expiration
});


// Create a TTL index on the expiresAt field
// This line can be removed because the index is set in the expiresAt definition.
// OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models?.Otp || mongoose.model("Otp", OtpSchema);
