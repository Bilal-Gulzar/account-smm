import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    UserEmail: String,
    phone: Number,
    streetAddress: String,
    postalCode: Number,
    city: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
    country: String,
    currency:String
  },
  { timestamps: true }
);

export default mongoose.models?.Order || mongoose.model("Order", OrderSchema);
