"use client"
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidHeart } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ScrollLock from "react-scrolllock";
import Link from 'next/link';

import { useAppContext } from '../contextApi/Accoutsmm';
export default function ShowOption() {
  const {showOpt,setShowOpt,select,AddTOCart,setCart,addToWishlist,wishlist } = useAppContext() 
  const [selectOpt,setSelectOpt] = useState({})
  const [qty,setQty] = useState(1)
  const [isloading, setIsloading] = useState(false);

 const isInWishlist = wishlist.some((wishItem) => wishItem._id === select._id);

 const handleClick = () => {
   if (isInWishlist) {
     removeFromWishlist(select._id);
   } else {
     addToWishlist(select);
   }
 };

async function handleAddToCart(){
 setIsloading(true)
await new Promise(resolve => setTimeout(resolve,1400))
setIsloading(false)

  let obj = {...select,qty,accountTypes:selectOpt ,basePrice:selectOpt.extraPrice}

AddTOCart(obj)
setShowOpt(false)
setTimeout(()=>{
setCart(true);

},300)


}



const increaseQty = () => {
setQty(qty + 1)
} 

const decreaseQty = () => {
setQty(qty - 1);
}
  function setValue (){
 setSelectOpt(select.accountTypes?.[0]);
 setQty(1)
  }

    const handleSelectChange = (e) => {
      const selectedId = e.target.value; // Get the selected ID
      const selectedObject = select.accountTypes.find(
        (v) => v._id === selectedId
      );
      setSelectOpt(selectedObject); // Set the entire object
    };
  useEffect(()=>{
  setValue()
  },[showOpt])
  return (
    <section
      className={`fixed backdrop-blur-sm top-0 bg-white/35 z-50  flex justify-center items-center min-w-[100vw] min-h-[100vh] ${
        showOpt ? "" : "translate-y-full"
      }`}
    >
      {showOpt && <ScrollLock />}

      <div
        className={`w-[92%] sm:w-[380px] shadow-md relative bg-white ${
          showOpt ? "translate-y-0" : "translate-y-full"
        } duration-300 transition-all ease-in-out`}
      >
        <div className="flex flex-col px-8 mt-8 gap-4">
          <p className="text-xl font-semibold">{select.accountName}</p>
          <p className="text-2xl text-gray-500">${selectOpt?.extraPrice}</p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="select" className="text-xl font-semibold">
              TYPES OF ACCOUNT:
            </label>
            <select
              value={selectOpt ? selectOpt._id : ""} // Set the value to the selected object's ID or empty if none
              onChange={handleSelectChange}
              id="select"
              className="border py-2.5 w-full border-gray-600 text-sm px-2 focus:ring-2 focus:ring-[#5bd1e2] focus:border-none outline-none rounded-md "
            >
              {select.accountTypes?.length > 0 &&
                select.accountTypes.map((v, index) => (
                  <option key={index} value={v._id}>
                    {v.typeOfAccount}
                  </option>
                ))}
            </select>
          </div>
          <div
            className={`flex relative items-center my-7 gap-4 ${
              isInWishlist ? "pb-6" : ""
            }`}
          >
            <div className="flex gap-4 items-center">
              <button
                disabled={qty == 1}
                onClick={decreaseQty}
                className="w-5 h-5 rounded-full bg-black flex justify-center items-center text-white disabled:cursor-not-allowed"
              >
                <FaMinus className="size-3" />
              </button>
              <span className="font-semibold text-lg">{qty}</span>
              <button
                onClick={increaseQty}
                className="w-5 h-5 bg-black rounded-full text-white flex justify-center items-center"
              >
                <FaPlus className="size-3" />
              </button>
            </div>
            {isInWishlist ? (
              <Link href="/wishlist">
                <div
                  onClick={() => setShowOpt(false)}
                  className="rounded-md border text-[#e81e1e] border-[#e81e1e]"
                >
                  <BiSolidHeart className="m-2 size-6" />
                </div>
                {/* <p className='absolute text-sm right-24 top-14  text-green-600 '>Product added to Wishlist</p> */}
              </Link>
            ) : (
              <div
                onClick={handleClick}
                className="cursor-pointer rounded-md border hover:text-[#5bd1e2] hover:border-[#5bd1e2] border-gray-500"
              >
                <IoMdHeartEmpty className="m-2 size-6" />
              </div>
            )}
            <div className="w-full">
              <button
                disabled={isloading}
                onClick={handleAddToCart}
                className="bg-black w-full rounded-md py-2.5 flex justify-center items-center text-white text-sm font-medium px-5 disabled:bg-black/50"
              >
                {isloading ? (
                  <AiOutlineLoading3Quarters className=" size-4 text-white animate-spin" />
                ) : (
                  <span> ADD&nbsp;TO CART </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setShowOpt(false);
          }}
          className="-top-2.5 -right-2.5 cursor-pointer absolute bg-black text-white"
        >
          <IoCloseOutline className="size-7 m-1.5" />
        </div>
        {isInWishlist && (
          <p className="text-sm -mt-9 mb-4 text-center  text-green-600 ">
            Product added to Wishlist
          </p>
        )}
      </div>
    </section>
  );
}
