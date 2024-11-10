import mongoose from "mongoose";
import user from "@/app/models/user";

export const GET = async (req)=>{

try{
mongoose.connect(process.env.MONGO_URI)
 let getusers = await user.find({})
return Response.json(getusers);

}catch(e){

return Response.json(e)

}

} 