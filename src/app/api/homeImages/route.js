import homeImages from "@/app/models/homeImages";
import mongoose from "mongoose";

export const POST = async (req)=>{
try{
    mongoose.connect(process.env.MONGO_URI)
 const {name,img,category} = await req.json()
 const images = await homeImages.create({name:name,image:img,category:category})
   
return Response.json("added successfully");
}catch(e){

return Response.json(e)

}

}


export const PUT = async (req) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const {id, name, img, category } = await req.json();
    const images = await homeImages.findByIdAndUpdate(
        {_id:id},
        {
      name: name,
      image: img,
      category: category,
    });

    return Response.json("updated successfully");
  } catch (e) {
    return Response.json(e);
  }
}

export  const GET = async (req)=>{

try{
    mongoose.connect(process.env.MONGO_URI);
const images = await homeImages.find({})

    return Response.json(images);
}catch(e){

    return Response.json(e);


}


}
