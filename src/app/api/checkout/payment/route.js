import mongoose from "mongoose";
// import product from "@/app/models/product";
var coinbase = require("coinbase-commerce-node");
// import { Client, resources } from "coinbase-commerce-node";
// const { Charge } = resources;
var Client = coinbase.Client;
var  resources =  coinbase.resources;
Client.init(process.env.COINBASE_SECRET_KEY)

export const GET =  async(req) =>{

try{
  mongoose.connect(process.env.MONGO_URI);
  // const { shoppingcart } = await req.json()

  let productPrice = 12;

  // for (const cartProduct of shoppingcart) {
  //   let productInfo = await product.findById(cartProduct._id);
  //   if (productInfo.accountTypes && productInfo.accountTypes.length > 0) {
  //     const accountTypes = productInfo.accountTypes.find(
  //       (v) => String(v._id) === String(cartProduct.accountTypes._id)
  //     );
  //     productPrice += accountTypes.extraPrice * cartProduct.qty;
  //     // return Response.json({productPrice});
  //   } else {
  //     productPrice += productInfo.basePrice * cartProduct.qty;
  //   }
  // }

  // Create a Date object from the createdAt field
  // const orderDate = new Date(order.createdAt);

  // Separate variables for day, month, and year
//   const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
//     orderDate
//   );
//   const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
//     orderDate
//   );
//   const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
//     orderDate
//   );

//  const date = {day,month,year}

const  ch = await resources.Charge.create({
  name:" test charge",
  // description:"test charge",
  local_price:{
    amount:15,
    currency:'USD',
  },
  pricing_type:"fixed_price",
  metadata:{
    user_id:"123"
  }
})  



  return Response.json(ch);
}catch(e){
console.log('error while creating an invoice',e)

return Response.json(e)

}


}
