"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { BiSolidHeart } from "react-icons/bi";
import { TbHeartX } from "react-icons/tb";
import { useAppContext } from '../contextApi/Accoutsmm';
import Link from 'next/link';
import Addtocart from '../component/addtocart';
import ShowOption from '../component/showOption';
import SkeletonLoading from '../component/skeleton';

export default function WishList() {
  const { wishlist, removeFromWishlist } = useAppContext();
  const [isloading,setisloading] = useState(true)
 useEffect(()=>{
setTimeout(()=>{
setisloading(false)
},2000)

  },[])
  return (
    <main className="mb-20">
      <div className="bg-[#757575] py-10">
        <h1 className="text-2xl text-white text-center">Wishlist</h1>
      </div>
      {isloading && <SkeletonLoading />}

      {!isloading && wishlist?.length == 0 && (
        <div className="gap-3 flex-col flex items-center my-40">
          <div>
            <TbHeartX className="text-[#d7d7d7] size-48" />
          </div>
          <h2 className="text-3xl font-medium">Wishlist is empty.</h2>
          <div className="flex flex-col gap-1 items-center sm:px-0 px-5 ">
            <p className="text-gray-500 text-sm text-center">
              You don't have any products in the wishlist yet.
            </p>
            <p className="text-gray-500 text-sm text-center">
              You will find a lot of interesting products on our "Shop" page.
            </p>
          </div>
        </div>
      )}
      {!isloading && wishlist?.length > 0 && (
        <div
          className="lg:container grid grid-cols-2 md:grid-cols-3 md lg:grid-cols-4 gap-3 
      hide-scrollbar overflow-x-auto mx-auto px-5 lg:px-0  mt-5"
        >
          {wishlist.map((v, index) => (
            <div
              key={index}
              className="hover:shadow-xl  w-auto mt-2 flex flex-col"
            >
              <Link href={`/account/${v._id}`}>
                <div className="w-full bg-gray-100 relative">
                  <Image
                    src={v.img}
                    width={900}
                    height={900}
                    alt={v.accountName}
                    quality={100}
                    priority
                  />
                </div>
              </Link>
              <div className="mt-3 ml-2 flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <p className="line-clamp-1 pr-3 tracking-wide sm:pr-0 text-xs sm:text-sm">
                    {v.accountName}
                  </p>
                  <div className="flex text-xs sm:text-sm tracking-wide items-center justify-between relative">
                    <span
                      onClick={() => removeFromWishlist(v._id)}
                      className="sm:flex hidden gap-1 items-center cursor-pointer"
                    >
                      <BiSolidHeart className="size-5 text-[#cc0808]" />
                      Remove
                    </span>
                    <span
                      onClick={() => removeFromWishlist(v._id)}
                      className=" sm:hidden flex flex-wrap pr-1 gap-1 items-center cursor-pointer"
                    >
                      <BiSolidHeart className="size-4 text-[#cc0808]" />
                      Remove
                    </span>
                  </div>
                  <p className="text-gray-600 tracking-wide text-xs sm:text-sm">
                    ${v.basePrice}
                  </p>
                </div>
                {/* <div className="pr-2">
                  <button className="bg-black tracking-wide md:block hidden text-white font-medium  py-2 px-3 rounded-md text-xs">
                    ADD&nbsp;TO&nbsp;CART
                  </button>
                  <span className="md:hidden block bg-black  p-2 rounded-md ">
                    <CiShoppingCart className=" size-6 text-white" />
                  </span>
                </div> */}
                <Addtocart account={v} />
              </div>
            </div>
          ))}
        </div>
      )}
      <ShowOption />
    </main>
  );
}
