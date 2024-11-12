import mongoose from "mongoose";
const nodemailer = require("nodemailer");
import Otp from "@/app/models/Otp";


export const POST = async(req)=>{

try{
    mongoose.connect(process.env.MONGO_URI)
     const {userEmail}  = await req.json()
     const Otpdigit = Math.floor(100000 + Math.random() * 900000).toString();
    const saveOtp = await Otp.create({
      email: userEmail,
      otp: Otpdigit,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    });

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
const year = new Date().getFullYear();
  // const htmlTemplate = `
  // //   <!DOCTYPE html>
  // //   <html lang="en">
  // //   <head>
  // //       <meta charset="UTF-8">
  // //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // //       <title></title>
  // //       <style>
  // //           /* Tailwind CSS styles */
  // //           @tailwind base;
  // //           @tailwind components;
  // //           @tailwind utilities;
            
  // //           /* Custom styles for the email */
  // //           .container {
  // //               max-width: 600px; 
  // //               margin: 0 auto; 
  // //               padding: 20px; 
  // //               background-color: #ffffff; 
  // //               border-radius: 8px; 
  // //               box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  // //           }
  // //           .header {
  // //               padding: 10px; 
  // //               background-color: #000; 
  // //               color: #ffffff; 
  // //               border-radius: 8px 8px 0 0;
  // //               text-align: center;
  // //           }
  // //           .otp {
  // //               font-size: 36px; 
  // //               font-weight: bold; 
  // //               color: #ff0050; 
  // //               margin: 20px 0; 
  // //               letter-spacing: 4px; 
  // //               text-align: center;
  // //           }
  // //           .footer {
  // //               font-size: 12px; 
  // //               color: #888888; 
  // //               margin-top: 20px;
  // //           }
  // //           .message {
  // //               font-size: 16px; 
  // //               color: #333; 
  // //               margin: 10px 0;
  // //           }
  // //       </style>
  // //   </head>
  // //   <body className="bg-gray-100">
  // //       <div className="container">
  // //           <div className="header">
  // //               <h1>Your OTP Code</h1>
  // //           </div>
  // //           <div className="message">
  // //               <p>Hello,</p>
  // //               <p>Your One-Time Password (OTP) is ready!</p>
  // //           </div>
  // //           <div className="otp">${Otpdigit}</div>
  // //           <div className="message">
  // //               <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
  // //           </div>
  // //           <div className="footer">
  // //               <p>&copy; ${year} Account SMM. All rights reserved.</p>
  // //           </div>
  // //       </div>
  // //   </body>
  // //   </html>
  // `;
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
</head>
<body style="background-color: #f5f5f5; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding:40px 18px ; text-align: center;">
    <div style="max-width: 600px; margin: 0 auto; padding:20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="padding: 10px; background-color: #000000; color: #ffffff; border-radius: 8px 8px 0 0; text-align: center;">
            <h1>Your OTP Code</h1>
        </div>
        <div style="font-size: 16px; color: #333333; margin: 10px 0;">
            <p>Account SMM</p>
            <p>Your One-Time Password (OTP) is ready!</p>
        </div>
        <div style="font-size: 36px; font-weight: bold; color: #ff0050; margin: 20px 0; letter-spacing: 4px; text-align: center;">
            ${Otpdigit}
        </div>
        <div style="font-size: 16px; color: #333333; margin: 10px 0;">
            <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
        </div>
        <div style="font-size: 12px; color: #888888; margin-top: 20px; text-align: center;">
            <p>&copy; ${year} Account SMM. All rights reserved.</p>
        </div>
    </div>
</body>
</html>




   `;


const mailOptions = {
  from: process.env.EMAIL_USER,
  to: userEmail,
  subject: "Your OTP Code",
  html: htmlTemplate,

};

  await transporter.sendMail(mailOptions)
  return Response.json({success:true, message: "OTP sent",email:saveOtp.email});


}


catch(e){
 
    return Response.json(e)
}



}