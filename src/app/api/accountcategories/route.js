import accountCategories from "@/app/models/accountCategories";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
      mongoose.connect(process.env.MONGO_URI)
    const newCategory = new accountCategories({ menu: body.newMenu });
     await newCategory.save()
    return Response.json({ success: true, Message: "New accountType added." });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

export async function GET(req) {
  try {
     mongoose.connect(process.env.MONGO_URI);
    const getAccountcategory = await accountCategories.find({});
    return Response.json({ success: true, getAccountcategory });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

export const DELETE = async (req) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
     mongoose.connect(process.env.MONGO_URI);
    const deleteCategory = await accountCategories.findByIdAndDelete({ _id: id });
    return Response.json({ success: true, Message: "AccountCategory deleted" });
  } catch (error) {
    return Response.json(error);
  }
};

export const PUT = async (req) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const body = await req.json();
    // console.log(body.id);
    const { newCategory, id } = body;
    const updateCategory = await accountCategories.updateOne(
      { _id: id },
      { menu: newCategory }
    );
    return Response.json({ success: true, Message: "AccountCategory Updated" });
  } catch (error) {
    return Response.json(error);
  }
};
