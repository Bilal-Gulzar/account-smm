import order from "@/app/models/order";
import mongoose from "mongoose";

const stripe = require("stripe")(process.env.STRIPE_SK);
export async function POST(req) {
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (error) {
    console.error("stripe error");
    console.log(error);
    return Response.json(error, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      mongoose.connect(process.env.MONGO_URI)
      await order.updateOne({ _id: orderId }, { paid: isPaid });
      
      const data  = {orderId}
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendMailToAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => console.log(response.message))
        .catch((e) => console.error(e)); 

       fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendMailToUser`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       })
         .then((res) => res.json())
         .then((response) => console.log(response.message))
         .catch((e) => console.error(e)); 
      
    }
  }

  return Response.json(event, { status: 200 });
}
