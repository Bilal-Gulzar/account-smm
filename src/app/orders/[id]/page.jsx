"use client"
import Accountsetitngnavbar from '@/app/component/accountsetitngnavbar'
import React, { useEffect } from 'react'
import { HiOutlineArrowLeft } from "react-icons/hi";
import Image from 'next/image';
import PaymentSvg from '@/app/component/paymentSvg';
import { CgShoppingCart } from "react-icons/cg";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState } from 'react';
import Link from 'next/link';
import SkeletonForOrderPage from '@/app/component/skeletonForOrderPage';
import { useRouter } from "next/navigation";
import { CgCloseO } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { useAppContext } from '@/app/contextApi/Accoutsmm';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function OrderPage({params}) {
  const {id} = params
  const router = useRouter();
  const { toast } = useToast();
  const { AddTOCart, ClearCart,showdiv} = useAppContext();
  const [orderSummary, setOrderSummary] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [orderDetail,setOrderDetail] = useState('') 
  const [day,setDay]  = useState('')
  const [month,setMonth]  = useState('')
  const [year,setYear]  = useState('')
 useEffect(()=>{
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
if(localStorage.getItem("token")){
fetch(`/api/orderPage?id=${id}`)
.then((res)=>res.json())
.then((oop)=>{
if(oop && Object.keys(oop).length > 0){

setOrderDetail(oop || '')
setDay(oop?.date?.day || '')
setMonth(oop?.date?.month || '')
setYear(oop?.date?.year || '')
setIsloading(false)
}
if (typeof window !== "undefined") {
  if (window.location.href.includes("clear-cart=1")) {
    ClearCart();
    toast({
      title: "Thank you for order.",
      description:
        "Your payment was successful, and your order has been placed.",
    });
  }
}
})
}


},[])


const buyAgain =  async () => {
  if(orderDetail && orderDetail.cartProducts?.length > 0){
  const res  = await fetch('/api/validateOrder?orderID='+id)
  const response  = await res.json() 
  if(response.success){
  ClearCart();
  let CartProducts = orderDetail.cartProducts;
  for (const product of CartProducts) {
    AddTOCart(product);
  }
  router.push("/cart");

}else{
 toast({
   title: "Sorry... Order Unavailable",
   description: "The details for this order are currently unavailable.",
 });

}

}else{
  console.error("something went wrong while buyAgain ")
}
};


  return (
    <main className="bg-[#f5f5f5] flex flex-col justify-between relative min-h-screen">
      <div>
        <Toaster />
        <Accountsetitngnavbar />
        <div className="lg:max-w-[1000px] pb-28 xl:max-w-[1100px] mt-8 mx-5 lg:mx-auto ">
          {isloading ? (
            <SkeletonForOrderPage />
          ) : (
            <>
              <div className="p-5 mb-3 lg:hidden">
                <div className="flex pb-7 gap-5 flexwrap justify-between items-center  border-b border-gray-300">
                  {!orderSummary && (
                    <div
                      onClick={() => setOrderSummary(true)}
                      className="flex cursor-pointer gap-3 items-center"
                    >
                      <div>
                        <CgShoppingCart className="size-5" />
                      </div>
                      <div>
                        <h1 className="font-semibold">Show Order Summery</h1>
                      </div>
                      <div>
                        <IoChevronDown className="size-5" />
                      </div>
                    </div>
                  )}
                  {orderSummary && (
                    <div
                      onClick={() => setOrderSummary(false)}
                      className="flex cursor-pointer gap-3 items-center"
                    >
                      <div>
                        <CgShoppingCart className="size-5" />
                      </div>
                      <div>
                        <h1 className="font-semibold">Hide Order Summery</h1>
                      </div>
                      <div>
                        <IoChevronUp className="size-5" />
                      </div>
                    </div>
                  )}
                  <div className="font-semibold ">
                    <p>${orderDetail?.subtotal}</p>
                  </div>
                </div>
                <div
                  className={`duration-300 transition-all ease-in-out  ${
                    orderSummary ? "max-h-[1000px] pb-8 " : "max-h-0 "
                  } overflow-hidden  border-b border-gray-300`}
                >
                  <div className="flex flex-col">
                    {orderDetail &&
                      orderDetail.cartProducts?.length > 0 &&
                      orderDetail.cartProducts.map((v) => (
                        <div
                          key={v._id}
                          className="flex mt-8 items-center gap-3 text-sm"
                        >
                          <div className="min-w-[5.3rem] max-w-[5.3rem] relative h-20 bg-[#ededed] px-2.5 border-gray-300 rounded-md border">
                            <Image
                              src={v.img}
                              width={50}
                              height={50}
                              alt={v.accountName}
                              className="w-auto mx-auto h-full"
                              priority
                            />
                            <div className="absolute flex justify-center items-center -top-2 -right-3 w-6 h-6 rounded-full bg-gray-600 text-white font-medium text-sm">
                              {v.qty}
                            </div>
                          </div>
                          <div className="flex justify-between w-full items-center gap-3">
                            <p className="break-words">
                              {v.accountName}{" "}
                              {v.accountTypes &&
                              Object.keys(v.accountTypes).length > 0
                                ? `/(${v.accountTypes?.typeOfAccount} )`
                                : ""}
                            </p>
                            <p>${v.basePrice * v.qty}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col gap-8 mt-8">
                    <div className="flex justify-between text-sm">
                      <div>Subtotal</div>
                      <p>${orderDetail?.subtotal}</p>
                    </div>
                    <div className="flex font-medium justify-between text-xl">
                      <div>Total</div>
                      <p>
                        <span className="text-gray-500 font-normal text-xs">
                          USD
                        </span>{" "}
                        ${orderDetail?.subtotal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-10 md:gap-0 md:justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Link href={"/orders"}>
                      <span>
                        <HiOutlineArrowLeft className="size-5" />
                      </span>
                    </Link>
                    <h1 className="font-medium text-2xl break-all">
                      Order: {orderDetail?._id}
                    </h1>
                  </div>
                  <div className="ml-8 text-gray-500 font-medium text-sm tracking-wide">
                    confirmed {month} {day}
                  </div>
                </div>
                <button
                  disabled={showdiv}
                  onClick={buyAgain}
                  className='"w-full font-medium text-gray-300 text-sm tracking-wider hover:text-gray-400 p-3  bg-white border-gray-300 rounded-md  flex justify-center items-center border-[1.5px] '
                >
                  Buy again
                </button>
              </div>
              <div className="grid  lg:grid-cols-[55%_auto] gap-5 w-full mt-8">
                <div className=" lg:order-1 order-2 flex flex-col gap-5">
                  <div className="bg-white p-5 rounded-lg">
                    <div className="text-sm  rounded-md px-3">
                      <div className="flex items-center gap-1.5">
                        <span>
                          {orderDetail?.paid ? (
                            <AiOutlineCheck className="size-4" />
                          ) : (
                            <CgCloseO className="size-4" />
                          )}
                        </span>
                        <p className="font-semibold">
                          {orderDetail?.paid ? "Confirmed" : "Canceled"}
                        </p>
                      </div>
                      <p className="ml-5  text-xs">
                        Last updated {month} {day}
                      </p>
                    </div>
                    {orderDetail?.paid && (
                      <div className="text-sm px-3 mt-6 ">
                        We've received your order.
                      </div>
                    )}
                    {!orderDetail?.paid && (
                      <div className="text-sm px-3 mt-6 ">
                        Your order has been canceled.
                      </div>
                    )}
                  </div>
                  <div className="bg-white self-start w-full p-5  rounded-lg">
                    <div>
                      <h2 className="font-semibold">Order details</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-7 md:gap-28 text-sm  mt-5">
                      <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-3">
                          <h2 className="text-gray-500 font-medium ">
                            Contact information
                          </h2>
                          <div>
                            <p>{orderDetail?.UserEmail}</p>
                            <p className="mt-1">{orderDetail?.phone}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h2 className="text-gray-500 font-medium ">
                            Shipping address
                          </h2>
                          <div className="flex flex-col gap-0.5">
                            <p>{orderDetail?.UserName}</p>
                            <p>{orderDetail?.streetAddress}</p>
                            <p>
                              {orderDetail?.city} {orderDetail?.postalCode}
                            </p>
                            <p>{orderDetail?.country}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                          <h2 className="text-gray-500 font-medium ">
                            Payment
                          </h2>
                          <div className="flex md:flex-row flex-col text-sm gap-1.5">
                            <PaymentSvg />
                            <div>
                              <p> Via Card - $200</p>
                              <p className="text-gray-500 text-xs mt-1">
                                {month} {day}, {year}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h2 className="text-gray-500 font-medium ">
                            Shipping method
                          </h2>
                          <p>via Whatsapp or Email</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:order-2 order-1 gap-5">
                  <div className="bg-white p-5 rounded-lg ">
                    <div className="font-semibold mb-2">
                      ${orderDetail?.subtotal} USD
                    </div>
                    {orderDetail.paid ? (
                      <div className="flex flex-col gap-2">
                        <div className="font-medium text-gray-500">
                          {" "}
                          Payment Paid
                        </div>
                        <p className="text-sm text-gray-500">
                          Thank you for choosing Account SMM!. We’re pleased to
                          inform you that your payment has been successfully
                          processed. Your order is now complete, and your
                          selected account is reserved just for you. If you have
                          any questions or need assistance, our support team is
                          here to help. We appreciate your trust in us and are
                          committed to providing you with the best service.
                          Enjoy your new account, and thank you for being a
                          valued customer!
                        </p>
                      </div>
                    ) : (
                      <div className=" flex flex-col gap-2">
                        <div className="font-medium text-gray-500">
                          {" "}
                          Payment Not Paid
                        </div>
                        <p className="text-sm text-gray-500">
                          Thank you for choosing Account SMM! Your order is not
                          yet complete. Please complete your payment to proceed
                          with your purchase. If you have any questions or need
                          assistance, feel free to contact our support team.
                          Remember, your selected account will be reserved for a
                          limited time. Don’t miss out—finalize your payment
                          now!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-5 rounded-lg hidden lg:block">
                    <div>
                      <h1 className="font-semibold mb-5">Order Summery</h1>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {orderDetail &&
                        orderDetail.cartProducts?.length > 0 &&
                        orderDetail.cartProducts.map((v) => (
                          <div
                            key={v._id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="min-w-[65px] max-w-[65px] relative h-16 bg-gray-100 px-2.5 border rounded-md">
                              <Image
                                src={v.img}
                                width={50}
                                height={50}
                                alt={v.accountName}
                                priority
                                className="w-auto mx-auto h-full"
                              />
                              <div className="absolute flex justify-center items-center -top-2 -right-3 w-6 h-6 rounded-full bg-gray-600 text-white font-medium text-sm">
                                {v.qty}
                              </div>
                            </div>
                            <div className="flex justify-between w-full items-center gap-3">
                              <p className="break-words">
                                {v.accountName}{" "}
                                {v.accountTypes &&
                                Object.keys(v.accountTypes).length > 0
                                  ? `/(${v.accountTypes?.typeOfAccount} )`
                                  : ""}
                              </p>
                              <p>${v.basePrice * v.qty}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-5 mt-7 mb-1">
                      <div className="flex justify-between text-sm">
                        <div>Subtotal</div>
                        <p>${orderDetail?.subtotal}</p>
                      </div>
                      <div className="flex font-semibold justify-between text-xl">
                        <div>Total</div>
                        <p>
                          <span className="text-gray-500 font-normal text-xs">
                            USD
                          </span>{" "}
                          ${orderDetail?.subtotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="border-t lg:container lg:mx-auto px-5  text-xs flex lg:flex-row flex-col items-center  underline gap-7 py-8 w-full  border-gray-300 mt-14">
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

export default OrderPage