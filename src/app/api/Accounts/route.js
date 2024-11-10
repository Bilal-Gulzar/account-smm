import mongoose from "mongoose";
import product from "@/app/models/product";

export const POST = async(req)=>{

try{
 mongoose.connect(process.env.MONGO_URI)
 const {accountname,desc,image,accountcategory,price,typesofAccount} = await req.json()
//  console.log(accountname,desc,image,accountcategory,price,typesofAccount)
 const addAccount  = await product.create({accountName:accountname  ,desc:desc ,img:image ,category:accountcategory , basePrice:price , accountTypes:typesofAccount})
   
 return Response.json("Account Added!");

}catch(error){

return Response.json(error)

}

}

export const PUT = async(req)=>{

try{
 mongoose.connect(process.env.MONGO_URI);
 const {id,accountname,desc,image,accountcategory,price,typesofAccount} = await req.json()
const updateAccount = await product.findByIdAndUpdate({_id:id},{accountName:accountname ,desc:desc ,img:image ,category:accountcategory , basePrice:price , accountTypes:typesofAccount})

return Response.json("Account updated!");

}catch(e){

return Response.json(e)

}

}


export async function GET(req) {
    try{
    mongoose.connect(process.env.MONGO_URI);
    const url = new URL(req.url);
    const id = url.searchParams.get("id")
    if(id){
      const getAccount = await product.findById(id);

      // Fetch related products based on category, limit to 4
      const relatedProducts = await product.find({
        category: getAccount.category,
        _id: { $ne: getAccount._id }, // Exclude the current product
      }).limit(4); // Limit to 4 related products

      return Response.json({getAccount, relatedProducts});
    }else{
   const getAccounts = await product.find({}) 

    return Response.json(getAccounts);

    }

    }
     catch (error) {
    return Response.json(error);
  }
}

export  async function DELETE (req){
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    mongoose.connect(process.env.MONGO_URI)
    const deleteAccount = await product.findByIdAndDelete({ _id: id });
    return Response.json( "Account Deleted");
  } catch (error) {
    return Response.json(error);
  }
};




