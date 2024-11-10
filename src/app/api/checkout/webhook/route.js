import mongoose from "mongoose";
import crypto from 'node:crypto'

export async function POST(req) {

    try{
   const data = await req.json()

    }catch(e){

   return Response.json(e)

    }
}