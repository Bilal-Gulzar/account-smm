"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { PiTrash } from "react-icons/pi";
import { HiPlusSm } from "react-icons/hi";
import { TbShoppingCartCopy } from "react-icons/tb";
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";
import { GoAlertFill } from "react-icons/go";
import { useAppContext } from '../contextApi/Accoutsmm';
import { BsCartX } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { FaMinus } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation';
import UserOrderInfo from '../component/UserOrderInfo';
import toast from "react-hot-toast";

export default function Cart() {
const { shoppingCart, subtotal, AddTOCart, DecreaseQuantity,RemoveFromCart } = useAppContext();
const router = useRouter()
const reversedCart = [...(shoppingCart || [])].reverse();
 const handleCart = (v) => {
   const fixQty = { ...v, qty: 1 }
   AddTOCart(fixQty);
 };
  const [getInfo,setGetInfo] = useState(false)
  const [checkbox,setCheckbox] = useState(true)
  const [isloading, setIsloading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [id, setId] = useState("");
  const [showSkel,setShowskel] = useState(true)
const handleloading = () => {
  setIsloading(true);
  setTimeout(() => {
    setIsloading(false);
  }, 1400);
};

const handleRemoveFromCart = (v) => {
  setTimeout(() => {
    RemoveFromCart(v);
  }, 1400);
};

useEffect(()=>{

  if (!localStorage.getItem("token")) {
    router.push("/login");
  }

  setTimeout(()=>{
  setShowskel(false)
  },1500)
},[])


 useEffect(() => {
   const timer = setTimeout(() => {
     setAllowed(false); // Hide element after 5 seconds
   }, 5000);

   return () => clearTimeout(timer); // Cleanup the timer
 }, [allowed]);


  const payment = async () => {
    if (!checkbox) {
      return setAllowed(true);
    }
    setGetInfo(true);
  };

const proceedToCheckout = async(email,name, address,postal,city,phone,country) => {
  setButtonDisable(true)
  localStorage.setItem("flag", "true")
 const data = {shoppingCart ,email,name ,address, postal, city, phone, country };
   let promise = new Promise(async (resolve, reject) => {
     let res = await fetch("/api/checkout/payment", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
     setButtonDisable(false)
     if (res.ok) {
       window.location = await res.json();
       resolve();
     } else {
       reject();
     }
   });
 await toast.promise(promise,{
loading: 'Preparing your order...',
success: 'Redirecting to payment... ',
error: 'something went wrong... Please try again Later'
 })

 };

const skeleton = Array.from({length:2})
  return (
    <main className="px-3 pb-56 md:px-5 relative 2xl:container mx-auto">
      <div>
        <h1 className=" font-medium md:font-normal mt-5 text-center text-2xl md:text-[45px] ">
          SHOPPING CART
        </h1>
      </div>
      {!showSkel && shoppingCart.length == 0 && (
        <div className="gap-3 flex-col flex items-center mt-32 mb-20">
          <div>
            <BsCartX className="size-28" />
          </div>
          <h2 className="text-3xl font-medium">YOUR CART IS EMPTY.</h2>
          <div className="flex flex-col gap-1 items-center sm:px-0 px-5 ">
            <p className="text-gray-500 text-sm text-center">
              Before proceed to checkout you must add some products to your
              shopping cart.
            </p>
            <p className="text-gray-500 text-sm text-center">
              You will find a lot of interesting products on our "Shop" page.
            </p>
          </div>

          <Link href="/">
            <button className="mt-6 bg-black text-white text-sm font-medium py-2 px-5 rounded-full ">
              RETURN TO SHOP
            </button>
          </Link>
        </div>
      )}
      {!showSkel && shoppingCart.length > 0 && (
        <>
          <div className=" lg:grid hidden grid-cols-2 mt-12   border-gray-500 ">
            <div className="font-medium text-sm">PRODUCT</div>
            <div className="font-medium text-sm flex justify-between">
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>TOTAL</div>
            </div>
          </div>
          {reversedCart.map((v, index) => (
            <div key={index} className="grid lg:grid-cols-2  mt-10 lg:mt-3">
              <div className="font-medium text-sm  border-b pb-3 md:pb-0 lg:py-7 md:border lg:border-0 lg:border-t border-gray-500   flex md:items-center gap-3">
                <div className="w-32 h-40  relative bg-gray-100">
                  <Image
                    src={v.img}
                    fill
                    className="w-full h-full"
                    sizes="(min-width: 808px) 50vw, 100vw"
                    alt={v.accountName}
                    priority
                  />
                  {isloading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white/40">
                      {isloading && id === v._id && (
                        <div className="p-2 bg-white z-50  rounded-full">
                          <ImSpinner8 className=" size-3 animate-spin" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p>{v.accountName} </p>
                    <span
                      onClick={() => {
                        handleRemoveFromCart(v), handleloading(), setId(v._id);
                      }}
                      className="cursor-pointer"
                    >
                      <PiTrash className="size-5" />
                    </span>
                  </div>
                  <div className=" md:hidden font-light border-y py-2 border-dashed border-gray-500">
                    ${v.basePrice}
                  </div>
                  <div className="md:hidden flex  justify-center max-w-[115px] border-[1.4px] items-center border-gray-600  rounded-lg gap-5  py-2">
                    <div className="">
                      {v.qty > 1 ? (
                        <FaMinus
                          onClick={() => {
                            DecreaseQuantity(v), handleloading(), setId(v._id);
                          }}
                          className="size-3"
                        />
                      ) : (
                        <PiTrash
                          onClick={() => {
                            handleRemoveFromCart(v),
                              handleloading(),
                              setId(v._id);
                          }}
                          className="size-4"
                        />
                      )}
                    </div>
                    <div className="font-bold">{v.qty}</div>
                    <div
                      onClick={() => {
                        handleCart(v), handleloading(), setId(v._id);
                      }}
                    >
                      <HiPlusSm className="size-5" />
                    </div>
                  </div>
                  <div className="md:hidden text-gray-500 border-t border-gray-400 py-2 border-dashed">
                    ${v.basePrice * v.qty}
                  </div>
                </div>
              </div>
              <div className="font-medium md:flex hidden text-sm py-7 border lg:border-0 md:border-t-0  lg:border-t border-gray-500  items-center  justify-around  lg:justify-between">
                <div className=" font-light">${v.basePrice}</div>
                <div className="flex border items-center border-gray-500 rounded-md gap-5 px-3 py-2">
                  <div className="cursor-pointer">
                    {v.qty > 1 ? (
                      <FaMinus
                        onClick={() => {
                          DecreaseQuantity(v), handleloading(), setId(v._id);
                        }}
                        className="size-3"
                      />
                    ) : (
                      <PiTrash
                        onClick={() => {
                          handleRemoveFromCart(v),
                            handleloading(),
                            setId(v._id);
                        }}
                        className="size-4"
                      />
                    )}
                  </div>
                  <div>{v.qty}</div>
                  <div
                    onClick={() => {
                      handleCart(v), handleloading(), setId(v._id);
                    }}
                    className="cursor-pointer"
                  >
                    <HiPlusSm className="size-5" />
                  </div>
                </div>
                <div>${v.basePrice * v.qty}</div>
              </div>
            </div>
          ))}
          <div className="mt-10 md:mt-3 md:absolute right-5 items-center flex flex-col gap-5 md:gap-4 ">
            <div className="flex md:justify-end">
              <div className="font-semibold  gap-5 text-xl  flex justify-center ">
                <span className="flex md:justify-end"> SUBTOTAL:</span>{" "}
                <span className=" flex md:justify-end">${subtotal}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
                className="accent-black"
              />
              <p className="font-light text-sm">
                I agree with{" "}
                <Link href="/terms&conditions">
                  <span className="underline decoration-[0.6px]  ">
                    the terms and conditions.
                  </span>
                </Link>
              </p>
            </div>
            <div className="mb-10   justify-end md:flex  hidden">
              <button
                disabled={buttonDisable}
                type="button"
                onClick={payment}
                className="disabled:bg-[#acabab] font-semibold hover:bg-black/80 flex items-center gap-1 bg-black text-white rounded-xl py-2 px-7"
              >
                <span>
                  <TbShoppingCartCopy className="" />
                </span>
                Check Out
              </button>
            </div>
          </div>
          <div className="md:hidden my-9">
            <button
              disabled={buttonDisable}
              type="button"
              // onClick={() => setGetInfo(true)}
              onClick={payment}
              className="font-semibold w-full flex items-center justify-center gap-1 hover:bg-black/80 bg-black text-white rounded-xl py-2 px-7 disabled:bg-[#acabab]"
            >
              <span>
                <TbShoppingCartCopy className="" />
              </span>
              Check Out
            </button>
          </div>

          <div
            className={`bg-[#e0b252] fixed left-0 right-0 flex items-center  text-white bottom-0   text-sm tracking-wide px-8 z-50 py-5 gap-3 ${
              allowed ? "" : "hidden"
            } transform translate-y-full animate-slide-up`}
          >
            <div className="absolute h-[3.5px] bg-[#a8853d] top-0 animate-loading-line"></div>
            <span>
              <GoAlertFill className="size-5" />
            </span>
            <p className="pr-11 break-words tex ">
              You must agree with terms and conditions of the sales to check
              out.
            </p>
            <div
              onClick={() => setAllowed(false)}
              className="cursor-pointer absolute right-0  w-16 h-full flex justify-center items-center bg-[#c9a04a]"
            >
              <IoMdClose className="size-6" />
            </div>
          </div>
        </>
      )}
      {isloading && <div className="absolute  inset-0 z-50"></div>}

      {showSkel &&
        skeleton.map((_, i) => (
          <div
            key={i}
            className="grid  gap-5 lg:gap-0 px-2 md:px-0  lg:grid-cols-2  mt-10 lg:mt-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className=" w-32 h-40  " />
              <div className="flex flex-col gap-2 flex-grow sm:flex-grow-0">
                <Skeleton className="sm:w-44 w-full h-6" />
                <Skeleton className="w-12 h-6" />
                <Skeleton className="w-12 md:hidden h-6" />
                <Skeleton className="w-24 md:hidden h-9" />
                <Skeleton className="w-20 md:hidden h-6" />
              </div>
            </div>
            <div className="md:flex hidden w-full justify-between items-center">
              <Skeleton className="w-12 h-6" />
              <Skeleton className="w-28 h-10" />
              <Skeleton className="w-20 h-6" />
            </div>
          </div>
        ))}
      <UserOrderInfo
        proceedToCheckout={proceedToCheckout}
        getInfo={getInfo}
        setGetInfo={setGetInfo}
      />
    </main>
  );
}
