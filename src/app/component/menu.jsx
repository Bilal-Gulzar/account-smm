"use client"
import React, { useEffect, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';
import { IoCloseOutline } from "react-icons/io5";
export default function Menu({path}) {
const {setMenu,menu} = path
const [accountName,setAccountName] = useState([])

const routeMap = ['/account/bankAccount','/account/cryptoAccount','/account/accountserviceOld&New','/account/paymentGateway', '/account/cryptoCurrencise','/account/othersAccount']

useEffect(()=>{
fetch('/api/accountcategories')
.then((res)=>res.json())
.then((result)=>setAccountName(result?.getAccountcategory))
.catch((e)=>console.log(e))

},[])

useEffect(()=>{
setMenu(false)

},[path.path])

  return (
    <>
      <section
        className={`${
          path.path.includes("/accountService") ? "hidden" : "lg:block hidden"
        }`}
      >
        <div className="text-xs tracking-wide font-medium text-gray-600 flex justify-center gap-8 py-2.5">
          {accountName?.length > 0 &&
            accountName.map((c, index) => (
              <Link key={c._id} href={routeMap[index]}>
                <div className="cursor-pointer hover:text-black">{c.menu}</div>
              </Link>
            ))}
        </div>
      </section>
      <section
        className={` ${
          menu ? "" : "-translate-x-full"
        }  min-h-screen transition-all duration-500 overflow-x-hidden border-t border-gray-500 bg-white fixed  left-0 top-0 bottom-0 z-30  w-[80vw] lg:hidden`}
      >
        <div className="py-2 relative bg-[#f2f2f2] flex items-center justify-center  ">
          <h1 className=" font-medium tracking-wide">MENU</h1>
          <span onClick={() => setMenu(false)} className=" absolute right-4">
            <IoCloseOutline className="size-5" />
          </span>
        </div>
        <div>
          <div className="font-medium break-all">
            {accountName?.length > 0 &&
              accountName.map((c,index) => (
                <Link key={c._id} href={routeMap[index]}>
                  <div className=" flex items-center tracking-wider justify-between cursor-pointer px-5 py-3.5 border-y border-gray-200">
                    {c.menu}
                    <span>
                      <FiPlus />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
