import order from "@/app/models/order";
import product from "@/app/models/product";
import mongoose from "mongoose";

export const GET =  async (req)=> {
             
try{
  mongoose.connect(process.env.MONGO_URI)
const url = new URL(req.url) 
const orderID = url.searchParams.get('orderID')
const validateOrder  =  await order.findById(orderID)
if(validateOrder){
const validateAccount = validateOrder.cartProducts;  
const totalItem = validateAccount.length 
let countItem  = 0 
for (const item of validateAccount ){

const validate =  await product.findById({_id:item._id}) 
if(validate){
 
countItem += 1
}
}
const  condition = totalItem === countItem
return Response.json({ success:condition , Message: condition ? "Accounts Available for Buy-Again" : "Accounts Not Available for Buy-Again"});



}

    
    
    return Response.json({ success: false,Message:"Account has been removed from database"});
}catch(error){

return Response.json({success:false, Error:error})

}


}