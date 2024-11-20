import user from "@/app/models/user";
import mongoose from "mongoose";
import order from "@/app/models/order";
const jwt = require("jsonwebtoken");

export  const GET  = async (req)=>{

try{
mongoose.connect(process.env.MONGO_URI)
let admin  = false
const url = new URL(req.url)
const session = url.searchParams.get('session')
const verifyUser = jwt.verify(session, process.env.JWT_SECRET_KEY); 
const findUser = await user.findById(verifyUser.id);

if (findUser) {
  admin = findUser.admin;
}

 if (admin) {
  const allorders = await order.find({});
  //  return Response.json(await order.find({}));
   return Response.json({ success: true, allorders });

 }

 if (findUser) {
 const allorders  =  await order.find({ UserEmail: findUser.email})
   return Response.json({success:true,allorders});
 }

}catch(error){

return Response.json({ success: false, Error: error });



}



} 