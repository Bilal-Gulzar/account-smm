"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { LuHeart } from "react-icons/lu";
import { useAppContext } from "../contextApi/Accoutsmm";

export default function Mobilenavbar({path}) {
  const { wishlist } = useAppContext(); 
const [istoken,setIstoken] = useState(null)
  const {setMenu} = path 

  useEffect(()=>{
  if(typeof window !== "undefined"){
let token =  localStorage.getItem("token"); 
if(token){

setIstoken(true)

}else{
setIstoken(false);

}
}
},[])


  return (
    <section>
      <div className="lg:hidden flex justify-around   items-center w-screen left-0 right-0 bg-white fixed bottom-0  shadow-lg text-xs font-medium h-14">
        <div
          onClick={() => setMenu(true)}
          className="flex flex-col items-center"
        >
          <IoIosMenu className="size-[22px]  " />
          <p>Menu</p>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/">
            <GoHome className="size-[22px]" />
          </Link>
          <p>Home</p>
        </div>
        {/* <div>
          <div className="relative">
            <AiOutlineShoppingCart
              //   onClick={() => setBar(true)}
              className="size-8 dark:text-pink-600 mt-[7px]  "
            />
            <div className="absolute -right-1 flex justify-center items-center bottom-[17px] bg-pink-600 rounded-[50%] w-[17px] h-[17px]">
              <span className=" text-[10px]  text-white font-medium dark:text-gray-100 dark:font-normal  ">
                {Object.keys(cart).length}
              </span>
            </div>
          </div>
        </div> */}
        <Link href={istoken? '/orders'  : '/login'}>    
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.25 7C16.25 9.34721 14.3472 11.25 12 11.25C9.65279 11.25 7.75 9.34721 7.75 7C7.75 4.65279 9.65279 2.75 12 2.75C14.3472 2.75 16.25 4.65279 16.25 7ZM17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7ZM2.75 17.5C2.75 15.9812 3.98122 14.75 5.5 14.75H18.5C20.0188 14.75 21.25 15.9812 21.25 17.5V20C21.25 20.6904 20.6904 21.25 20 21.25H4C3.30964 21.25 2.75 20.6904 2.75 20V17.5ZM2 17.5C2 15.567 3.567 14 5.5 14H18.5C20.433 14 22 15.567 22 17.5V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V17.5Z"
              stroke="black"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <p>Account</p>
        </div>
        </Link>
        <div className="relative flex flex-col items-center">
          <div>
            <Link href="/wishlist">
              <LuHeart className="size-5" />
              <span className="absolute w-[15px] text-[9px] -top-1 right-1 flex justify-center items-center h-[15px] rounded-full bg-black text-white">
                {wishlist.length}
              </span>
            </Link>
          </div>
          <p className="inline">Whislist</p>
        </div>
      </div>
    </section>
  );
}
