import order from "@/app/models/order";
import mongoose from "mongoose";
const nodemailer = require("nodemailer");


export const POST = async(req) => {
try{
  mongoose.connect(process.env.MONGO_URI);
  const { orderId } = await req.json();
  const OrderDetail = await order.findById(orderId);
  const Username = OrderDetail.UserName;
  const Useremail = OrderDetail.UserEmail;
  const OrderID = OrderDetail._id;
  const total = OrderDetail.subtotal;

  // Extracting all UserNames and joining them with commas
  const items = OrderDetail.cartProducts.map((account) => account.accountName).join(", ");
  //    ;
     const year = new Date().getFullYear();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error during SMTP connection verification:", error);
    } else {
      console.log("SMTP connection is ready:", success);
    }
  });

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed</title>
  </head>
  <body style="font-family:sans-serif, Arial; margin: 0; padding: 0; background: linear-gradient(135deg, #6c63ff, #5a54d1);">
    <div style="width: 100%; max-width: 700px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); overflow: hidden; font-size: 16px;">
      <div style="background-color: #6c63ff; color: #fff; text-align: center; padding: 50px 20px; border-bottom: 5px solid #fff;">
        <h1 style="font-size: 32px; font-weight: 700; margin: 0;">Order Confirmed!</h1>
      </div>
      <div style="padding: 30px 20px; color: #333; line-height: 1.6;">
        <p style="font-size: 16px;">${Username},</p>
        <p style="font-size: 16px;">Thank you for your purchase! Your order has been successfully confirmed, and we're processing it right now.</p>
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px; margin-top: 25px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
          <h3 style="color: #6c63ff; font-weight: 700; margin-bottom: 10px;">Order Summary:</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 12px; font-size: 16px;"><strong>Order ID:</strong> #${OrderID}</li>
            <li style="margin-bottom: 12px; font-size: 16px;"><strong>Items Purchased:</strong> ${items}</li>
            <li style="margin-bottom: 12px; font-size: 16px;"><strong>Total:</strong> $${total}</li>
          </ul>
        </div>
        <p style="font-size: 16px;">We will notify you once the accounts are ready for use. In the meantime, feel free to contact us if you have any questions.</p>
        <a href="${process.env.NEXT_PUBLIC_HOST}/orders/${OrderID}" style="display: inline-block; background-color: #6c63ff; color: #fff; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 18px; margin-top: 25px; text-align: center; transition: background-color 0.3s ease, transform 0.3s ease;">View Your Order</a>
      </div>
      <div style="background-color: #f7f7f7; padding: 20px; text-align: center; color: #888; font-size: 14px; border-top: 3px solid #6c63ff;">
        <p style="margin: 0;">&copy; ${year} AccountSMM. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Useremail,
    subject: "Order Confirmation - Thank You for Your Purchase!",
    html: htmlTemplate,
  };

    await transporter.sendMail(mailOptions)
  return Response.json({success: true, message: "confirmation message has been sent To User "});
}catch(e){

  return Response.json({success:false,  message: "confirmation message failed" ,error : e});


}



}