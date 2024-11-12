"use client"
import React, { useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { useAppContext } from '../contextApi/Accoutsmm'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

   function Addtocart({account}) {
    const {AddTOCart,setCart,setShowOpt,setSelect} =  useAppContext()
    const [isloading,setIsloading]  = useState(false)

    const handle = async(prop)=>{
      setIsloading(true)
    await new Promise(resolve => setTimeout(resolve,1400))
        setIsloading(false)
      if(prop.accountTypes && prop.accountTypes?.length > 0 ){
          setShowOpt(true)
          setSelect(prop)
      }else{
      delete  prop.accountTypes
      AddTOCart(prop)
     setCart(true)
    }
    }
  return (
    <section>
      <div className="pr-1">
        <button
          onClick={() => handle(account)}
          className="bg-black  hidden text-white font-medium  md:flex justify-center items-center py-2 w-[100px]  rounded-md text-xs"
        >
          {isloading ? (
            <AiOutlineLoading3Quarters className=" size-4 text-white animate-spin" />
          ) : (
            <span> ADD&nbsp;TO&nbsp;CART </span>
          )}
        </button>
        <button
          onClick={() => handle(account)}
          className="md:hidden  bg-black  py-2 w-9  flex justify-center items-center rounded-md "
        >
          {isloading ? (
            <AiOutlineLoading3Quarters className=" size-5  text-white animate-spin" />
          ) : (
            <CiShoppingCart className=" size-5 text-white" />
          )}
        </button>
      </div>
    </section>
  );
}

export default Addtocart
