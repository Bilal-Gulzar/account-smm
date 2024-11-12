"use client"
import React, { useEffect, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import Div from './div';
import { AiTwotoneShop } from "react-icons/ai";
import Image from "next/image";
import { useAppContext } from '../contextApi/Accoutsmm';
import Link from 'next/link';
import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
var jwt = require("jsonwebtoken");

export default function Accountsetitngnavbar() {
  const path = usePathname();
  const {showdiv,setShowdiv } = useAppContext();
  const [letter,setLetter] = useState('')
  
 useEffect(()=>{
  let token = localStorage.getItem('token')
 if(token){

  let decode = jwt.decode(token)
   fetch('/api/profile?id='+decode.id)
   .then((res)=>res.json())
   .then((data)=>{
    if(data){
     let first = data.firstName ? data.firstName.charAt(0).toLocaleUpperCase() : '';
    let second = data.lastName ? data.lastName.charAt(0).toLocaleUpperCase() : '';
    let name = first + second;
    setLetter(name);
    }
   })
}
},[])



// console.log(a.split("").charAt(0));
  return (
    <section className='sticky  top-0 bg-white z-40'>
      <div className="">
        <div className="lg:mx-auto  flex px-5 lg:max-w-[1200px] lg:px-14 justify-between items-center py-6">
          <div onClick={() => setShowdiv(!showdiv)} className="md:hidden">
            {showdiv ? (
              <IoCloseOutline className="size-6" />
            ) : (
              <IoMenu className="size-6" />
            )}
            <Div isTrue={showdiv} />
          </div>
          <div className="flex gap-8 items-center ">
            <div className="relative">
              <Link href="/">
                <Image
                  src="/smm.png"
                  width={75}
                  height={75}
                  className="h-auto "
                  alt="accountsmm"
                  priority
                />
              </Link>
            </div>
            <Link href="/orders" className=" md:block hidden">
              <p
                className={`${
                  path.includes("/orders") ? "underline" : "no-underline"
                } py-2 px-4  rounded-md hover:bg-[#f5f5f5]`}
              >
                orders
              </p>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="hover:bg-[#f5f5f5] relative  py-2.5 px-3 rounded-md">
              <div
                onClick={() => setShowdiv(!showdiv)}
                className="cursor-pointer flex items-center gap-2"
              >
                {letter ? (
                  <div className="w-9 h-9 text-black rounded-full bg-[#f5f5f5] flex justify-center items-center text-sm">
                    {letter}
                  </div>
                ) : (
                  <div onClick={() => setShowdiv(!showdiv)}>
                    <svg
                      height="35"
                      width="35"
                      viewBox="0 0 19.05 19.05"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <g style={{ opacity: 1 }}>
                        <g>
                          <circle
                            cx="9.6948"
                            cy="8.6535"
                            r="2.8189"
                            style={{
                              fill: "none",
                              stroke: "#707070", // Updated color
                              strokeWidth: 0.5,
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            }}
                          />
                          <path
                            d="M4.6323,15.2284 A5.1757,5.1757 0 0 1 9.5562,11.6475 A5.1757,5.1757 0 0 1 14.4801,15.2281"
                            style={{
                              fill: "none",
                              stroke: "#707070", // Updated color
                              strokeWidth: 0.5,
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            }}
                          />
                          <circle
                            cx="9.5562"
                            cy="9.3467"
                            r="7.6711"
                            style={{
                              fill: "none",
                              stroke: "#707070", // Updated color
                              strokeWidth: 0.5,
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            }}
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
                {showdiv && <MdOutlineKeyboardArrowUp />}
                {!showdiv && <MdOutlineKeyboardArrowDown />}
              </div>
              <Div isTrue={showdiv} setIsTrue={setShowdiv} />
            </div>
            <Link href="/">
              <div className="md:block hidden p-3 hover:bg-[#acabab] cursor-pointer rounded-md bg-[#C7C6C6]">
                Go to store
              </div>
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/">
              <AiTwotoneShop className="size-6 text-gray-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
