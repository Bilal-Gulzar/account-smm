import mongoose from "mongoose";
import order from "@/app/models/order";
import product from "@/app/models/product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export const POST =  async(req) =>{

try{
  mongoose.connect(process.env.MONGO_URI);
  const { shoppingCart ,email, name,phone,postal,city,country,address} = await req.json();
  // console.log(shoppingCart)
    // Create a Date object from the createdAt field
        const orderDate = new Date();
  //   Separate variables for day, month, and year
      const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
        orderDate
      );
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        orderDate
      );
      const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
        orderDate
      );
     let  dateFormate  = {day:day,month:month,year:year}
    const orderDoc = await order.create({
      UserEmail: email,
      UserName: name,
      phone: phone,
      streetAddress: address,
      postalCode: postal,
      city: city,
      cartProducts:shoppingCart,
      paid: false,
      country: country,
      date: dateFormate,
      subtotal:0
    });

  let stripLineItems = [];
    let Subtotal = 0
  for (const cartProduct of shoppingCart) {
    let productPrice = 0;
    let productInfo = await product.findById(cartProduct._id);
    if (productInfo.accountTypes && productInfo.accountTypes.length > 0) {
      const accountTypes = productInfo.accountTypes.find(
        (v) => String(v._id) === String(cartProduct.accountTypes._id)
      );
      productPrice += accountTypes.extraPrice * cartProduct.qty;
      Subtotal += accountTypes.extraPrice * cartProduct.qty;

    } else {
      productPrice += productInfo.basePrice * cartProduct.qty;
      Subtotal += productInfo.basePrice * cartProduct.qty;

    }

    let productName = cartProduct.accountName;
    // let productImage = cartProduct.img;
  
stripLineItems.push({
  quantity:1,
  price_data: {
    currency: "USD",
    product_data: {
      name: productName,
    },
    unit_amount: productPrice * 100,
  },
});
  }

  await order.findOneAndUpdate({_id:orderDoc._id},{subtotal:Subtotal})

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripLineItems,
      mode: "payment",
      customer_email: email,
      success_url:
      process.env.NEXT_PUBLIC_HOST + "/orders/"+ orderDoc._id + "?clear-cart=1",
      cancel_url: process.env.NEXT_PUBLIC_HOST + "/orders?canceled=1",
      metadata: { orderId: orderDoc._id.toString()},
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount:0, currency: "USD" },
          },
        },
      ],
    });
  return Response.json(stripeSession.url);
}catch(e){
console.log('error while creating an invoice',e)

return Response.json(e)

}


}
