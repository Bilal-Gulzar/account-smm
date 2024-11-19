import mongoose from "mongoose";


const currentDate = new mongoose.Schema({
  day: { type: String },
  month: { type: String },
  year: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    UserEmail: String,
    UserName: String,
    phone: Number,
    streetAddress: String,
    postalCode: Number,
    city: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
    country: String,
    currency:String,
    date:{type:currentDate},
    subtotal:{type:Number}
  },
  {timestamps: true}
);

export default mongoose.models?.Order || mongoose.model("Order", OrderSchema);
