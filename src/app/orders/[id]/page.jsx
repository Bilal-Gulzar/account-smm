"use client"
import Accountsetitngnavbar from '@/app/component/accountsetitngnavbar'
import React from 'react'
import { HiOutlineArrowLeft } from "react-icons/hi";
import Image from 'next/image';
import PaymentSvg from '@/app/component/paymentSvg';
import { CgShoppingCart } from "react-icons/cg";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState } from 'react';
import Link from 'next/link';
import SkeletonForOrderPage from '@/app/component/skeletonForOrderPage';

function OrderPage() {
  const [orderSummary, setOrderSummary] = useState(false);
  const [isloading, setIsloading] = useState(false);


  return (
    <main className="bg-[#f5f5f5] flex flex-col justify-between relative min-h-screen">
      <div>
        <Accountsetitngnavbar />
        <div className="lg:max-w-[1000px] pb-28 xl:max-w-[1100px] mt-8 mx-5 lg:mx-auto ">
          {isloading ? (
            <SkeletonForOrderPage />
          ) : (
            <>
              <div className="p-5 mb-3 lg:hidden">
                <div className="flex pb-7 gap-7 flexwrap justify-between  border-b border-gray-300">
                  {!orderSummary && (
                    <div
                      onClick={() => setOrderSummary(true)}
                      className="flex cursor-pointer gap-3 items-center"
                    >
                      <div>
                        <CgShoppingCart className="size-5" />
                      </div>
                      <div>
                        <h1 className="font-medium">Show Order Summery</h1>
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
                        <h1 className="font-medium">Hide Order Summery</h1>
                      </div>
                      <div>
                        <IoChevronUp className="size-5" />
                      </div>
                    </div>
                  )}
                  <div className="font-medium break-all">
                    <p>$300.00</p>
                  </div>
                </div>
                <div
                  className={`duration-300 transition-all ease-in-out  ${
                    orderSummary ? "max-h-[1000px] pb-8 " : "max-h-0 "
                  } overflow-hidden  border-b border-gray-300`}
                >
                  <div className="flex mt-8 items-center gap-3 text-sm">
                    <div className="min-w-[5.3rem] max-w-[5.3rem] relative h-20 bg-[#ededed] px-2.5 border-gray-300 rounded-md border">
                      <Image
                        src="/smm.png"
                        width={50}
                        height={50}
                        alt="test"
                        className="w-auto mx-auto h-full"
                        priority
                      />
                      <div className="absolute flex justify-center items-center -top-2 -right-3 w-6 h-6 rounded-full bg-gray-600 text-white font-medium text-sm">
                        1
                      </div>
                    </div>
                    <div className="flex justify-between w-full items-center gap-3">
                      <p className="break-words">
                        verified Bank Account SMM /(individual account )
                      </p>
                      <p>$200.00</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 mt-8">
                    <div className="flex justify-between text-sm">
                      <div>Subtotal</div>
                      <p>$200.00</p>
                    </div>
                    <div className="flex font-medium justify-between text-xl">
                      <div>Total</div>
                      <p>
                        <span className="text-gray-500 font-normal text-xs">
                          USD
                        </span>{" "}
                        $200.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-10 md:gap-0 md:justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span>
                      <HiOutlineArrowLeft className="size-5" />
                    </span>
                    <h1 className="font-medium text-2xl break-all">
                      Order: 66fec7c8e6a80a4852b17faf
                    </h1>
                  </div>
                  <div className="ml-8 text-gray-500 text-sm tracking-wide">
                    confirmed October 19
                  </div>
                </div>
                <button className='"w-full font-medium text-gray-300 text-sm tracking-wider hover:text-gray-400 p-3  bg-white border-gray-300 rounded-md  flex justify-center items-center border-[1.5px] '>
                  Buy again
                </button>
              </div>
              <div className="grid  lg:grid-cols-[55%_auto] gap-5 w-full mt-8">
                <div className="bg-white lg:order-1 order-2 p-5 rounded-lg">
                  <div>
                    <h2 className="font-medium">Order details</h2>
                  </div>
                  <div className="flex flex-col md:flex-row gap-7 md:gap-28 text-sm  mt-5">
                    <div className="flex flex-col gap-7">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-gray-500 ">Contact information</h2>
                        <div>
                          <p>bilalgul415@gmail.com</p>
                          <p className="mt-1">03490250746</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-gray-500">Shipping address</h2>
                        <div className="flex flex-col gap-0.5">
                          <p>Zeeshan Liaquat</p>
                          <p>Lahore</p>
                          <p>City 6000</p>
                          <p>Pakistan</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-gray-500">Payment</h2>
                        <div className="flex md:flex-row flex-col text-sm gap-1.5">
                          <PaymentSvg />
                          <div>
                            <p>Bitcoin (BC) - $200</p>
                            <p className="text-gray-500 text- mt-1">
                              October 20,2024
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-gray-500">Shipping method</h2>
                        <p>via Whatsapp or Email</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:order-2 order-1 gap-5">
                  <div className="bg-white p-5 rounded-lg ">
                    <div className="font-medium mb-2">$300 USD</div>
                    {/* <div className=" flex flex-col gap-2">
                <div className="font-medium text-gray-500">
                  {" "}
                  Payment Not Paid
                </div>
                <p className="text-sm text-gray-500">
                  Thank you for choosing Account SMM! Your order is not yet
                  complete. Please complete your payment to proceed with your
                  purchase. If you have any questions or need assistance, feel
                  free to contact our support team. Remember, your selected
                  account will be reserved for a limited time. Don’t miss
                  out—finalize your payment now!
                </p>
              </div> */}
                    <div className="flex flex-col gap-2">
                      <div className="font-medium text-gray-500">
                        {" "}
                        Payment Paid
                      </div>
                      <p className="text-sm text-gray-500">
                        Thank you for choosing Account SMM!. We’re pleased to
                        inform you that your payment has been successfully
                        processed. Your order is now complete, and your selected
                        account is reserved just for you. If you have any
                        questions or need assistance, our support team is here
                        to help. We appreciate your trust in us and are
                        committed to providing you with the best service. Enjoy
                        your new account, and thank you for being a valued
                        customer!
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-lg hidden lg:block">
                    <div>
                      <h1 className="font-medium mb-5">Order Summery</h1>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="min-w-[5.3rem] max-w-[5.3rem] relative h-20 bg-gray-100 px-2.5 border rounded-md">
                        <Image
                          src="/img1.webp"
                          width={50}
                          height={50}
                          alt="test"
                          priority
                          className="w-auto mx-auto h-full"
                        />
                        <div className="absolute flex justify-center items-center -top-2 -right-3 w-6 h-6 rounded-full bg-gray-600 text-white font-medium text-sm">
                          1
                        </div>
                      </div>
                      <div className="flex justify-between w-full items-center gap-3">
                        <p className="break-words">
                          verified Bank Account SMM /(individual account )
                        </p>
                        <p>$200.00</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 mt-5">
                      <div className="flex justify-between text-sm">
                        <div>Subtotal</div>
                        <p>$200.00</p>
                      </div>
                      <div className="flex font-medium justify-between text-xl">
                        <div>Total</div>
                        <p>
                          <span className="text-gray-500 font-normal text-xs">
                            USD
                          </span>{" "}
                          $200.00
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