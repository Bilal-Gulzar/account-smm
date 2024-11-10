import mongoose from "mongoose";
import product from "@/app/models/product";

export async function GET(req) {    
  try {
      mongoose.connect(process.env.MONGO_URI)
       const query = await req.nextUrl.searchParams.get('query');
       const page = await req.nextUrl.searchParams.get('pageno');
       const pageLimit = 16
      const pageNumber = parseInt(page) || 1; 
      const skip = (pageNumber - 1) * pageLimit;
    const results = await product.find({ $text: { $search: query } }).skip(skip)
      .limit(pageLimit)
      .exec();

    const totalPosts = await product.countDocuments({ $text: { $search: query } }).exec();
    const totalPages = Math.ceil(totalPosts / pageLimit);

    if (results.length > 0) {
      return Response.json({ success: true, results: results,totalPages:totalPages,totalPosts:totalPosts});
    } else {
      return Response.json({ success: false, Message: "No result found" });
    }
  } catch (error) {
    // return Response.json({ error: "Failed to fetch search results" });
    return Response.json(error);
  }
}
