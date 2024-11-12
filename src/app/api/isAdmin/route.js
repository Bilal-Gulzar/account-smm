import user from "@/app/models/user";
import mongoose from "mongoose";

export const GET = async (req) => {
mongoose.connect(process.env.MONGO_URI)
try{
const url = new URL(req.url)
const id = url.searchParams.get('id')
const checkUserIsAdmin = await user.findById(id)
if(checkUserIsAdmin){
    let admin = checkUserIsAdmin.admin
return Response.json({ success:true, admin });
}else{
return Response.json({success:false})
}
}catch(e){

    return Response.json({error:e});


}


}