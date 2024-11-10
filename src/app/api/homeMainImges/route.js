import homeMainImges from "@/app/models/homeMainImges";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const {img} = await req.json();
    const images = await homeMainImges.create({
      image: img,
    });

    return Response.json("added successfully");
  } catch (e) {
    return Response.json(e);
  }
};

export const PUT = async (req) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const { id,img} = await req.json();
    const images = await homeMainImges.findByIdAndUpdate(
      { _id: id },
      {
        image: img
      }
    );

    return Response.json("updated successfully");
  } catch (e) {
    return Response.json(e);
  }
};

export const GET = async (req) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const images = await homeMainImges.find({});

    return Response.json(images);
  } catch (e) {
    return Response.json(e);
  }
};
