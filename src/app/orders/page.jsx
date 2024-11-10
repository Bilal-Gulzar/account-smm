"use client"
import React, { useEffect, useState } from "react";
import Accountsetitngnavbar from "../component/accountsetitngnavbar";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineCheck } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
export default function Orders() {
const [isloading,setIsloading] = useState(true)

useEffect(()=>{
  setTimeout(() => {
    setIsloading(false) 
    
  }, 1500);
},[])
  return (
    <main className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between">
      <div>
        <Accountsetitngnavbar />
        <div className="lg:max-w-[1000px] xl:max-w-[1100px]  mx-5 lg:mx-auto sm:mx-5">
          <h1 className="text-xl mt-8 font-medium">Orders</h1>
          <div className="mt-8 sm:mx-10 mx-5 hidden">
            <div className="bg-white p-6 flex flex-col gap-3 mt-12 ">
              <p className="font-medium text-center">No orders yet</p>
              <p className="text-sm text-center">
                Go to store to place an order.
              </p>
            </div>
          </div>
          {!isloading ? 
          <div className="grid sm:grid-cols-2  gap-5 lg:grid-cols-3 pb-52 pt-10">
            <div className="px-4 py-5 gap-5 rounded-lg bg-white flex flex-col">
              <div className="text-xs py-4 rounded-md px-5 bg-[#f5f5f5]">
                <div className="flex items-center gap-1.5">
                  <sapn>
                    <AiOutlineCheck className="size-4" />
                  </sapn>
                  <p className="font-medium">Confirmed</p>
                </div>
                <p className="ml-5">Last updated Oct 19</p>
              </div>
              {/* <div className="bg-pink-100 mx-auto relative h-72 w-full rounded-md">
              <Image  src="/smm.png" fill alt="test" />
            </div> */}
              <div className="mx-auto w-full rounded-md">
                <Image
                  src="/smm.png"
                  width={900}
                  height={900}
                  // className="h-auto"
                  alt="test"
                  priority
                />
              </div>
              <div className="text-sm">
                <p className="font-medium">1 item</p>
                <p className="text-gray-500">
                  <span className="text-black font-medium">Order:</span>{" "}
                  Verified Bank Account{" "}
                </p>
              </div>
              <div className="flex gap-4 items-center text-sm">
                <p className="font-medium">$200</p>
                <div className="bg-[#f5f5f5] items-center text-xs py-2 px-4 rounded-full gap-1 flex">
                  <span>
                    <MdPayment className="size-4" />
                  </span>
                  <p>Payment due</p>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full font-medium text-gray-300 text-sm tracking-wider hover:text-gray-400 px-8 py-4 border-gray-300 rounded-md  flex justify-center items-center border-[1.5px] ">
                  Buy again
                </button>
              </div>
            </div>
            <div className="px-4 py-5 gap-5 rounded-lg bg-white flex flex-col">
              <div className="text-xs py-4 rounded-md px-5 bg-[#f5f5f5]">
                <div className="flex items-center gap-1.5">
                  <sapn>
                    <AiOutlineCheck className="size-4" />
                  </sapn>
                  <p className="font-medium">Confirmed</p>
                </div>
                <p className="ml-5">Last updated Oct 19</p>
              </div>
              {/* <div className="bg-pink-100 mx-auto relative h-72 w-full rounded-md">
              <Image  src="/smm.png" fill alt="test" />
            </div> */}
              <div className="mx-auto w-full rounded-md">
                <Image
                  src="/smm.png"
                  width={900}
                  height={900}
                  // className="h-auto"
                  alt="test"
                  priority
                />
              </div>
              <div className="text-sm">
                <p className="font-medium">1 item</p>
                <p className="text-gray-500 break-all">
                  <span className="text-black font-medium">Order:</span>{" "}
                  Verified Bank Account{" "}
                </p>
              </div>
              <div className="flex gap-4 items-center text-sm">
                <p className="font-medium">$200</p>
                <div className="bg-[#f5f5f5] items-center text-xs py-2 px-4 rounded-full gap-1 flex">
                  <span>
                    <MdPayment className="size-4" />
                  </span>
                  <p>Payment due</p>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full font-medium text-gray-300 text-sm tracking-wider hover:text-gray-400 px-8 py-4 border-gray-300 rounded-md  flex justify-center items-center border-[1.5px] ">
                  Buy again
                </button>
              </div>
            </div>
            <div className="px-4 py-5 gap-5 rounded-lg bg-white flex flex-col">
              <div className="text-xs py-4 rounded-md px-5 bg-[#f5f5f5]">
                <div className="flex items-center gap-1.5">
                  <sapn>
                    <AiOutlineCheck className="size-4" />
                  </sapn>
                  <p className="font-medium">Confirmed</p>
                </div>
                <p className="ml-5">Last updated Oct 19</p>
              </div>
              {/* <div className="bg-pink-100 mx-auto relative h-72 w-full rounded-md">
              <Image  src="/smm.png" fill alt="test" />
            </div> */}
              <div className="mx-auto w-full rounded-md">
                <Image
                  src="/smm.png"
                  width={900}
                  height={900}
                  // className="h-auto"
                  alt="test"
                  priority
                />
              </div>
              <div className="text-sm">
                <p className="font-medium">1 item</p>
                <p className="text-gray-500">
                  <span className="text-black font-medium">Order:</span>{" "}
                  Verified Bank Account{" "}
                </p>
              </div>
              <div className="flex gap-4 items-center text-sm">
                <p className="font-medium">$200</p>
                <div className="bg-[#f5f5f5] items-center text-xs py-2 px-4 rounded-full gap-1 flex">
                  <span>
                    <MdPayment className="size-4" />
                  </span>
                  <p>Payment due</p>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full font-medium text-gray-300 text-sm tracking-wider hover:text-gray-400 px-8 py-4 border-gray-300 rounded-md  flex justify-center items-center border-[1.5px] ">
                  Buy again
                </button>
              </div>
            </div>
          </div>
          :
          <div className="grid sm:grid-cols-2 gap-5 lg:grid-cols-3 pb-52 pt-10">
            <div className="gap-5 rounded-lg p-3 bg-white flex flex-col">
              <div className="text-xs w-full  py-4 rounded-md px-5 bg-[#f5f5f5]">
                <Skeleton className=" sm:w-48 h-5" />
                <Skeleton className="w-24 h-5 mt-2" />
              </div>
              <Skeleton className="w-full h-72 sm:h-64" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-14 h-5" />
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-40 h-5" />
              </div>
              <Skeleton className="w-full h-12 mt-2" />
            </div>
          </div>
}
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
