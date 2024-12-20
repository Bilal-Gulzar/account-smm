import order from "@/app/models/order";
import mongoose from "mongoose";

export const GET = async(req)=>{

try{
mongoose.connect(process.env.MONGO_URI)
const url = new URL(req.url)
const id = url.searchParams.get("id");
const Order = await order.findById(id) 
if(Order){
return Response.json({success:true , Order});
}

return Response.json({ success: false});


}catch(error){

return Response.json({ success: false, Error: error });



}


}