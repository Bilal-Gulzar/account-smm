import product from "@/app/models/product";
import mongoose from "mongoose";
export const GET  = async(req)=>{


try{
    mongoose.connect(process.env.MONGO_URI);
 const products = await product.aggregate([
   {
     $group: {
       _id: "$category", // Group by the category ObjectId
       product: { $first: "$$ROOT" }, // Get the first product from each category
     },
   },
   {
     $limit: 6, // Limit to 6 categories
   },
   {
     $replaceRoot: { newRoot: "$product" }, // Replace the root with the product object
   },
 ]);
return Response.json(products);
}catch(e){

return Response.json(e)

}

}