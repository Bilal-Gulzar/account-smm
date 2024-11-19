import order from "@/app/models/order";
import mongoose from "mongoose";

export const GET = async(req)=>{

try{
mongoose.connect(process.env.MONGO_URI)
const url = new URL(req.url)
const id = url.searchParams.get("id");

return Response.json(await order.findById(id));


}catch(error){

return Response.json({ success: false, Error: error });



}


}