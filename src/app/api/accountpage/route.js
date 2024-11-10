import mongoose from "mongoose";
import product from "@/app/models/product";

export const GET = async(req)=>{

try{
 mongoose.connect(process.env.MONGO_URI);
    const url = new URL(req.url);
    const id = url.searchParams.get("id")
    const page = await req.nextUrl.searchParams.get("pageno")
    const pageLimit = 16;
    const pageNumber = parseInt(page) || 1;
     const skip = (pageNumber - 1) * pageLimit;
     const accounts = await product.find({category:id}).skip(skip)
     .limit(pageLimit)
     .exec();
    const totalPosts = await product.countDocuments({ category: id }).exec();
    const totalPages = Math.ceil(totalPosts / pageLimit);
   let check = page > totalPages 
return Response.json({success:true ,accounts:accounts ,totalPages:totalPages,totalPosts:totalPosts});

}catch(e){

return Response.json(e)

}




} 