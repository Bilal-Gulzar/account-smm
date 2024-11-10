import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema ({

menu: {type:String,  unique: true , required:true}

},
{ timestamps: true }

)

export default mongoose.models?.accountCategories || mongoose.model("accountCategories",CategoriesSchema)