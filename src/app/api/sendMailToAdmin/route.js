import order from "@/app/models/order";
import user from "@/app/models/user";
import mongoose from "mongoose";
const nodemailer = require("nodemailer");


export const POST = async(req) => {
try{
  mongoose.connect(process.env.MONGO_URI);
  const { orderId} = await req.json();
  const OrderDetail = await order.findById(orderId);
  const Username = OrderDetail.UserName;
  const Useremail = OrderDetail.UserEmail;
  const OrderID = OrderDetail._id;
  const total = OrderDetail.subtotal;

  // Extracting all UserNames and joining them with commas
  const items = OrderDetail.cartProducts.map((account) => account.accountName).join(", ");

  const emails = await user.find({ admin: true });

  // Array of email addresses
  const emailArray = [];

  for (const Mail of emails) {
    emailArray.push(Mail.email);
  }

  // Convert array to comma-separated string
  const emailList = emailArray.join(",");

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
    <title>New Order Received</title>
  </head>
  <body style="font-family: sans-serif, Arial; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="width: 100%; background-color: #ffffff; margin: 20px auto; max-width: 600px; border-radius: 8px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); padding: 20px;">
      <div style="background-color: #6c63ff; color: #fff; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Order Received</h1>
      </div>
      <div style="margin-top: 20px; font-size: 16px; color: #555;">
        <p>Hello Admin,</p>
        <p>You have a new order! Below are the details:</p>
        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <h3 style="color: #6c63ff; font-weight: 600; margin-bottom: 10px;">Order Details:</h3>
          <ul style="padding-left: 20px;">
            <li style="margin: 8px 0;"><strong>Order ID:</strong> #${OrderID}</li>
            <li style="margin: 8px 0;"><strong>Customer Name:</strong> ${Username}</li>
            <li style="margin: 8px 0;"><strong>Email:</strong> ${Useremail}</li>
            <li style="margin: 8px 0;"><strong>Items Purchased:</strong> ${items}</li>
            <li style="margin: 8px 0;"><strong>Total:</strong> $${total}</li>
          </ul>
        </div>
        <p>Please review and process the order promptly. If you need any assistance, feel free to reach out.</p>
        <a href="${process.env.NEXT_PUBLIC_HOST}/orders/${OrderID}" style="display: inline-block; background-color: #6c63ff; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-size: 16px; font-weight: 600; text-align: center; margin-top: 20px;">View Order</a>
      </div>
      <div style="background-color: #f4f4f4; color: #888; text-align: center; padding: 10px; margin-top: 30px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0;padding:16px">&copy; ${year} AccountSMM. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      bcc: emailList,
      subject: "New Order Confirmation - Review the Order Details",
      html: htmlTemplate,
    };

  await transporter.sendMail(mailOptions)
  return Response.json({ success: true, message: "confirmation message has been sent To admin"});
}catch(e){

  return Response.json({success:false,  message: "confirmation message failed" ,error : e});


}



}