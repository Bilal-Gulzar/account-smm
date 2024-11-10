import mongoose from "mongoose";
import Otp from "@/app/models/Otp";
import user from "@/app/models/user";
var jwt = require("jsonwebtoken");


export async function POST(req) {

    try{
         const body = await req.json();
         mongoose.connect(process.env.MONGO_URI)
         const getotp = await Otp.findOne({ otp:body.otp,email:body.userEmail});
         if(getotp){
            const userInfo = await user.findOne({email:getotp.email}) 
            if(userInfo){
               const jwtsign = jwt.sign({email:userInfo.email,id:userInfo._id},process.env.JWT_SECRET_KEY,{
              expiresIn: "1d"}) 
               return  Response.json({ success:true, Message:"otp verified successfully",jwtToken:jwtsign});

            }
           
            
            if(!userInfo){
             const addUser = await user.create({email:getotp.email})
             const jwtsign = jwt.sign({email:addUser.email,id:addUser._id},process.env.JWT_SECRET_KEY,{
              expiresIn: "1d"}) 
               return  Response.json({ success:true, Message:"otp verified successfully",jwtToken:jwtsign});
                 
            }
            
         }else{
           return Response.json({ succcess:false, Message: "Invalid Otp" });
         }


}
    catch(error){

        return Response.json(error)
    }
    
}



