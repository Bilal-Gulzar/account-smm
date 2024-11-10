import mongoose from "mongoose";
import user from "@/app/models/user";
var jwt = require("jsonwebtoken");

 export async function PUT(req) {

    try{
       const {jwtToken,id,fName,lName,phone,city,address,postal,country} = await req.json() 
    mongoose.connect(process.env.MONGO_URI)
    if(jwtToken){
     const jwtverify = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY) 
     const updateUserProfile = await user.findByIdAndUpdate({_id:jwtverify.id},{
    firstName:fName,lastName:lName,number:phone,city:city,address:address,postalCode:postal,country:country
    })  
   }else{
   const updateUserProfile = await user.findByIdAndUpdate({_id:id},{
    firstName:fName,lastName:lName,number:phone,city:city,address:address,postalCode:postal,country:country
    })  

   }
    
    
    return Response.json("updated Profile!")
    
    }
    catch(error){

        return Response.json(error)
    }
    
}


 export async function GET(req) {
    try{
    mongoose.connect(process.env.MONGO_URI)
   let url = new URL(req.url)
   let id = url.searchParams.get('id') 
   let getUser = await user.findById(id) 
   return Response.json(getUser)
    
}catch(e){

 return Response.json(e)
}

    

}