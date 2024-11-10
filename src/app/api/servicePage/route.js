import service from "@/app/models/service";
import mongoose from "mongoose";

export const POST = async(req)=>{
try{
  mongoose.connect(process.env.MONGO_URI)
  const {heading,content,img} = await req.json() 
  const serviceContent = await service.create({
  heading:heading,
  img:img,
  content:content
})
  return Response.json(serviceContent)

}catch(e){

return Response.json(e)

}

}

export const GET = async(req)=>{

try{
  mongoose.connect(process.env.MONGO_URI)
const getServiceContent = await service.find({})

  return Response.json(getServiceContent)
}catch(e)
{

  return Response.json(e)
}

} 