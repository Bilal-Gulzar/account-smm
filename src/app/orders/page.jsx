"use client"
import React, { useEffect, useState } from "react";
import Accountsetitngnavbar from "../component/accountsetitngnavbar";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineCheck } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CgCloseO } from "react-icons/cg";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useAppContext } from "../contextApi/Accoutsmm"; 
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
export default function Orders() {
const router = useRouter()
const { toast } = useToast();
const { AddTOCart, ClearCart, showdiv } = useAppContext();
const [isloading,setIsloading] = useState(true)
const [orders,setorders] = useState([])
useEffect(()=>{
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
  setTimeout(() => {

    
  }, 1500);

const jwt = localStorage.getItem('token')  
if(jwt){
fetch('/api/orders?session='+jwt)
.then((res)=> res.json())
.then((data)=>{
if(data.success){
setorders(data.allorders?.reverse() || [])
setIsloading(false); 
}
if (typeof window !== "undefined") {
  if (window.location.href.includes("canceled=1") && localStorage.getItem("flag") === "true") {
    toast({
      title: "Order canceled.",
      description: "Your order is canceled - we hope to serve you again soon!",
    });
      localStorage.removeItem("flag");
  }
}
})
}
},[])
const buyAgain  = async (account) => {
  const id = account._id
  const res  = await fetch('/api/validateOrder?orderID='+id)
  const response  = await res.json() 
if(response.success){
  ClearCart()
  let CartProducts =  account.cartProducts
for (const product of CartProducts){

AddTOCart(product)
}
router.push('/cart')
}else{
 toast({
   title: "Sorry... Order Unavailable",
   description: "The details for this order are currently unavailable.",
 });

}
}

  return (
    <main className="bg-[#f5f5f5] flex flex-col justify-between overflow-hidden min-h-screen ">
      <div>
        <Toaster />
        <Accountsetitngnavbar />
        <div className=" lg:max-w-[1000px] xl:max-w-[1100px]  mx-5 lg:mx-auto sm:mx-5">
          <h1 className="text-xl mt-8 font-medium">Orders</h1>
          {!isloading ? (
            <div>
              {orders && orders.length > 0 ? (
                <div className="grid sm:grid-cols-2  gap-5 lg:grid-cols-3 pb-52 pt-10">
                  {orders.map((v) => (
                    <div
                      key={v._id}
                      className="px-4 py-5 gap-5 rounded-lg bg-white flex flex-col"
                    >
                      <div className="text-xs py-4 rounded-md px-5 bg-[#f5f5f5]">
                        <div className="flex items-center gap-1.5">
                          <span>
                            {v.paid ? (
                              <AiOutlineCheck className="size-4" />
                            ) : (
                              <CgCloseO className="size-4" />
                            )}
                          </span>
                          <p className="font-medium">
                            {v.paid ? "Confirmed" : "Canceled"}
                          </p>
                        </div>
                        <p className="ml-5">
                          {v.paid && "Last updated"} {v.date.month} {v.date.day}
                        </p>
                      </div>
                      <Link href={`/orders/${v._id}`}>
                        {v.cartProducts && v.cartProducts?.[0]?.img ? (
                          <div className="mx-auto  relative h-[300px] sm:h-80  bg-[#f5f5f5] rounded-md">
                            <Image
                              src={v.cartProducts[0].img || ""}
                              fill
                              sizes="(min-width: 808px) 50vw, 100vw"
                              alt={v.cartProducts[0].accountName || "image"}
                              priority
                            />
                          </div>
                        ) : (
                          <div className="bg-[#f5f5f5] w-full h-72 sm:h-64"></div>
                        )}
                      </Link>
                      <div className="text-sm">
                        <p className="font-medium">
                          {v.cartProducts?.length} item
                        </p>
                        <p className="text-gray-500">
                          <span className="text-black font-medium">Order:</span>{" "}
                          {v._id}
                        </p>
                      </div>
                      <div className="flex gap-4 items-center text-sm">
                        <p className="font-medium">${v.subtotal}</p>
                        {v.paid ? (
                          <div className="bg-[#f5f5f5] items-center  text-xs py-2 px-4 rounded-full gap-1 flex">
                            <span>
                              <MdPayment className="size-4" />
                            </span>
                            <p>Payment successful</p>
                          </div>
                        ) : (
                          <div className="bg-[#f5f5f5] items-center text-xs py-2 px-4 rounded-full gap-1 flex">
                            <span>
                              <IoAlertCircleOutline className="size-4" />
                            </span>
                            <p>Payment Canceled</p>
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <button
                          disabled={showdiv}
                          onClick={() => buyAgain(v)}
                          className="w-full font-medium text-gray-300 text-sm tracking-wider hover:text-gray-400 px-8 py-4 border-gray-300 rounded-md  flex justify-center items-center border-[1.5px] "
                        >
                          Buy again
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 sm:mx-10 mx-5">
                  <div className="bg-white p-6 flex flex-col gap-3 mt-12 ">
                    <p className="font-medium text-center">No orders yet</p>
                    <p className="text-sm text-center">
                      Go to store to place an order.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5 lg:grid-cols-3 pb-52 pt-10">
              <div className="gap-5 rounded-lg p-3 bg-white flex flex-col">
                <div className="text-xs w-full  py-4 rounded-md px-5 bg-[#f5f5f5]">
                  <Skeleton className=" sm:w-48 h-5" />
                  <Skeleton className="w-24 h-5 mt-2" />
                </div>
                <Skeleton className="w-full h-[300px] sm:h-80" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-14 h-5" />
                  <Skeleton className="w-28 h-5" />
                  <Skeleton className="w-40 h-5" />
                </div>
                <Skeleton className="w-full h-12 mt-2" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t lg:max-w-[1085px] lg:mx-auto px-5  text-xs flex lg:flex-row flex-col items-center  underline gap-7 py-8   w-full  border-gray-300 mt-14">
        <Link href="/exchange&return">
          <div>Return & Exchange</div>
        </Link>
        <Link href="/privacy-policy">
          <div> Privacy Policy</div>
        </Link>
        <Link href="/terms&conditions">
          <div>Terms & Condition</div>
        </Link>
      </div>
    </main>
  );
}
