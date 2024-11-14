"use client"
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { HiPlusSm } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import { useAppContext } from "@/app/contextApi/Accoutsmm";
import { useState } from "react";
import Link from "next/link";
import { GoAlertFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import ScrollLock from "react-scrolllock";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";

export default function Cart() {
  const {
    cart,
    setCart,
    shoppingCart,
    AddTOCart,
    subtotal,
    RemoveFromCart,
    DecreaseQuantity,
  } = useAppContext();
  const [checkbox, setCheckbox] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [id, setId] = useState("");
  const handleCart = (v) => {
    const fixQty = { ...v, qty: 1 };
    AddTOCart(fixQty);
  };

  const payment = async () => {
    if (!checkbox) {
      return setAllowed(true), setTimeout(() => setAllowed(false), 5000);
    }
    // const res = await fetch('/api/checkout/payment',{
    // method: 'POST',
    // headers:{
    // 'Content-Type' : 'application/json'

    // },

    // body: JSON.stringify(shoppingCart)

    // })

    // let response = await res.json()
    // window.location = response
  };

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

  useEffect(() => {
    if (cart && isMobile) {
      // Scroll to the top of the page to hide the address bar
      window.scrollTo(0, 1);
    }
  }, [cart]); // Run

  return (
    <>
      <section
        className={`${cart ? "fixed bg-black/80 inset-0  min-h-screen " : ""}`}
      >
        {cart && <ScrollLock />}

        <div
          className={`min-h-screen w-[90vw]  sm:w-80 z-50 fixed right-0 top-0 bg-white ${
            cart ? "" : "translate-x-full"
          } transition-all duration-500 overflow-x-hidden`}
        >
          <div className="relative">
            <div className="bg-black items-center z-40 flex justify-center relative py-3.5 px-4 text-white text-base">
              <span
                onClick={() => setCart(false)}
                className="cursor-pointer hover:rotate-180 transition-all delay-100  absolute left-3.5"
              >
                <BsArrowLeft className="size-5" />
              </span>
              <p>SOHPPOING CART</p>
            </div>
            {shoppingCart.length == 0 && (
              <div>
                <div className="relative flex justify-center items-center mt-12">
                  <Image
                    src="/emptycart.gif"
                    quality={100}
                    width={140}
                    height={140}
                    className="h-auto"
                    alt="Empty Cart"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <p className="font-semibold text-2xl">Your cart is empty.</p>
                  <p className="font-light">Let's fill it up shall we?</p>
                </div>

                <div className="text-sm w-[95%] py-2.5 flex justify-center items-center mt-5 mx-auto bg-black rounded-md text-white font-medium">
                  I'm Flexible,Show SM verified account
                </div>
              </div>
            )}
            {shoppingCart.length > 0 && (
              <div>
                <div className="mx-4 pt-5 h-[100vh] pb-80 flex flex-col gap-2 hide-scrollbar bg-white overflow-y-auto overflow-x-hidden ">
                  {shoppingCart.map((v) => (
                    <div key={v._id} className="flex gap-4">
                      <div className="min-w-28 min-h-36 bg-gray-100 relative">
                        <Image
                          src={v.img}
                          fill
                          alt={v.accountName}
                          sizes="100vw"
                          className="w-full full"
                          priority
                        />
                        {isloading && id === v._id && (
                          <div className="absolute flex justify-center items-center inset-0 ">
                            <div className="p-2 bg-white z-50  rounded-full">
                              <ImSpinner8 className=" size-3 animate-spin" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-5 text-sm min-w-[170px]">
                        <div className="text-gray-700 ">
                          <p className=" line-clamp-1 pb-1 pr-2">
                            {v.accountName}
                          </p>
                          <span className="text-gray-500">${v.basePrice}</span>
                        </div>
                        <div className="font-bold gap-4 flex">
                          <span className="cursor-pointer bg-black w-5 h-5 flex justify-center items-center rounded-full">
                            {v.qty > 1 ? (
                              <FaMinus
                                onClick={() => {
                                  DecreaseQuantity(v),
                                    handleloading(),
                                    setId(v._id);
                                }}
                                className="size-3 text-white"
                              />
                            ) : (
                              <FiTrash2
                                onClick={() => {
                                  handleRemoveFromCart(v),
                                    handleloading(),
                                    setId(v._id);
                                }}
                                className="size-3 text-white "
                              />
                            )}
                          </span>
                          <span className="text-base">{v.qty}</span>
                          <span
                            onClick={() => {
                              handleCart(v), handleloading(), setId(v._id);
                            }}
                            className="cursor-pointer w-5 h-5 rounded-full flex justify-center items-center bg-black"
                          >
                            <HiPlusSm className="size-5 text-white" />
                          </span>
                        </div>
                        <div>
                          <PiTrash
                            onClick={() => {
                              handleRemoveFromCart(v),
                                handleloading(),
                                setId(v._id);
                            }}
                            className="size-5 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-8 h-[265px] w-full z-50 shadow-inner-top-sm  bg-white px-5 flex flex-col gap-5">
                  <div className="flex  pt-2 font-semibold justify-between">
                    <p>Subtotal:</p>
                    <p>${subtotal}</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={checkbox}
                      onChange={() => setCheckbox(!checkbox)}
                      className="accent-black"
                    />
                    <p className=" text-gray-600 text-xs">
                      I agree with{" "}
                      <Link href="/terms&conditions">
                        <span className="underline text-gray-500 decoration-[0.6px]  ">
                          the terms and conditions.
                        </span>
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-col text-xs  font-medium text-white tracking-widest gap-3 ">
                    <button
                      onClick={() => setCart(false)}
                      className="bg-black hover:bg-black/80 rounded-md py-2.5"
                    >
                      <Link href="/cart">VIEW CART</Link>
                    </button>
                    <button
                      onClick={payment}
                      className="bg-black hover:bg-black/80  rounded-md py-2.5"
                    >
                      CHECK OUT
                    </button>
                    <button
                      onClick={() => setCart(false)}
                      className="bg-black hover:bg-black/80  rounded-md py-2.5"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isloading && (
            <div className="absolute  bg-white/40 inset-0 z-50"></div>
          )}
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
            You must agree with terms and conditions of the sales to check out.
          </p>
          <div
            onClick={() => {
              setAllowed(false);
            }}
            className="cursor-pointer absolute right-0  w-16 h-full flex justify-center items-center bg-[#c9a04a]"
          >
            <IoMdClose className="size-6" />
          </div>
        </div>
      </section>
    </>
  );
}
