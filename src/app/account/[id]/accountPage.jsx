"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { GoAlertFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import Images from "@/app/component/images";
import { BiSolidHeart } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useAppContext } from "@/app/contextApi/Accoutsmm";
import SkeletonForProductPage from "@/app/component/skeletonForProductPage";
import UserOrderInfo from "@/app/component/UserOrderInfo";
import toast from "react-hot-toast";

function AccountPage({id}) {
     const [checkbox, setCheckbox] = useState(false);
     const [allowed, setAllowed] = useState(false);
     const [desc, setDesc] = useState(true);
     const [secure, setSecure] = useState(true);
     const [data, setData] = useState("");
     const [selectOpt, setSelectOpt] = useState({});
     const [qty, setQty] = useState(1);
     const [relatedProduct, setRelatedProduct] = useState([]);
     const [isloading, setIsloading] = useState(true);
    const [getInfo, setGetInfo] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

     const { shoppingCart, addToWishlist, removeFromWishlist, wishlist, setCart, AddTOCart,ClearCart } =
       useAppContext();
     const isInWishlist = data && data._id ? wishlist.some(
       (wishItem) => wishItem._id === data._id
     ) : false;

     const handleClick = () => {
       if (isInWishlist) {
         removeFromWishlist(data._id);
       } else {
         addToWishlist(data);
       }
     };

     useEffect(() => {
       fetch(`/api/Accounts?id=`+id)
         .then((res) => res.json())
         .then((obj) => {
           if (obj && Object.keys(obj).length > 0) {
             setData(obj.getAccount || '');
             setValue(obj.getAccount  || null);
             setRelatedProduct(obj.relatedProducts || []);
             setIsloading(false);
           }
         });
     }, []);

     const handleSelectChange = (e) => {
        if (data?.accountTypes) {
          const selectedId = e.target.value; // Get the selected ID
          const selectedObject = data.accountTypes.find(
            (v) => v._id === selectedId
          );
          setSelectOpt(selectedObject); // Set the entire object
        } else {
          console.error("accountTypes is not available on data");
        }
     };

     function handleAddToCart() {
       let obj;
       if (data.accountTypes?.length > 0) {
         obj = {
           ...data,
           qty,
           accountTypes: selectOpt,
           basePrice: selectOpt?.extraPrice,
         };
       } else {
         // delete data.accountTypes;
         // obj = {...data, qty}

         const { accountTypes, ...dataWithoutAccountTypes } = data; // Destructure to omit accountTypes
         obj = {
           ...dataWithoutAccountTypes,
           qty,
         };
       }

       AddTOCart(obj);
       setCart(true);
     }


 function handleBuyNow() {
   let obj;
   if (data.accountTypes?.length > 0) {
     obj = {
       ...data,
       qty,
       accountTypes: selectOpt,
       basePrice: selectOpt?.extraPrice,
     };
   } else {
    
     const { accountTypes, ...dataWithoutAccountTypes } = data; // Destructure to omit accountTypes
     obj = {
       ...dataWithoutAccountTypes,
       qty,
     };
   }

   AddTOCart(obj);
 }

     const increaseQty = () => {
       setQty(qty + 1);
     };

     const decreaseQty = () => {
       setQty(qty - 1);
     };
     function setValue(obj) {
       if (obj.accountTypes) setSelectOpt(obj.accountTypes?.[0]);
       setQty(1);
     }

     function createMarkup(d) {
       return { __html: d };
     }


function BuyNow(){
ClearCart()
setGetInfo(true)
handleBuyNow()

}

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
   BuyNow()
 };


const proceedToCheckout = async(email,name, address,postal,city,phone,country) => {
  setButtonDisable(true)
  localStorage.setItem("flag", "true");
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


  return (
    <div>
      <section className="px-4 mt-12 pb-52">
        {isloading ? (
          <SkeletonForProductPage />
        ) : (
          <>
            <main className="grid md:grid-cols-2  gap-5 lg:gap-0 xl:gap-7 lg:container lg:mx-auto">
              <div className="relative  w-full h-[400px] sm:w-[85%] md:h-[350px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]  lg:w-[80%] mx-auto bg-gray-100 ">
                {data.img && (
                  <>
                    <Image
                      src={data.img}
                      fill
                      sizes="(min-width: 808px) 50vw, 100vw"
                      className=" bg-gray-100 mx-auto "
                      alt={data?.accountName}
                      priority
                    />
                    {/* <Image
                      src={data.img}
                      width={230}
                      height={300}
                      className="md:hidden w-full h-full"
                      alt={data.accountName}
                      priority
                    /> */}
                  </>
                )}
              </div>
              <div className="flex flex-col px-0.5 gap-5 overflow-hidden break-all">
                <div className="">
                  <p className="font-semibold text-xl">{data?.accountName}</p>
                  {data.accountTypes?.length > 0 && (
                    <p className="font-medium text-lg">
                      ${selectOpt?.extraPrice}
                    </p>
                  )}
                  {!data.accountTypes?.length && (
                    <p className="font-medium text-lg">${data?.basePrice}</p>
                  )}
                </div>
                <p className="text-gray-500   text-sm  ">
                  Buy 100% verified {data?.accountName}
                </p>
                {data.accountTypes?.length > 0 && (
                  <div className="">
                    <legend className="font-medium">TYPES OF ACCOUNT</legend>
                    <select
                      onChange={handleSelectChange}
                      value={selectOpt ? selectOpt._id : ""}
                      className="cursor-pointer w-full py-3 border focus:ring-1 ring-black outline-none rounded-lg border-gray-500  px-3"
                    >
                      {data?.accountTypes?.length > 0 &&
                        data.accountTypes.map((v, index) => (
                          <option key={index} value={v._id}>
                            {v.typeOfAccount}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                <div className="flex gap-5 mt-3">
                  <div className="flex gap-4 items-center">
                    <button
                      disabled={qty == 1}
                      onClick={decreaseQty}
                      className=" w-5 h-5 rounded-full bg-black flex justify-center disabled:cursor-not-allowed items-center text-white"
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

                  <button
                    onClick={handleAddToCart}
                    className="px-5 py-2 bg-black text-white font-medium rounded-lg"
                  >
                    ADD TO CART
                  </button>
                  <div className=" flex  gap-1 items-center cursor-pointer">
                    {isInWishlist ? (
                      <Link href="/wishlist">
                        <span className="flex items-center gap-1">
                          <BiSolidHeart className="size-5 text-[#cc0808]" />
                        </span>
                      </Link>
                    ) : (
                      <button
                        onClick={handleClick}
                        className=" gap-1 flex items-center"
                        type="button"
                      >
                        <IoMdHeartEmpty className="size-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="">
                  <button
                    disabled={buttonDisable}
                    onClick={payment}
                    className="bg-black disabled:bg-[#acabab]  py-2.5 w-full sm:w-auto sm:px-48 md:px-28 text-white rounded-lg font-medium"
                  >
                    BUT IT NOW
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                    className="accent-black"
                  />
                  <p className=" text-gray-600 text-sm">
                    I agree with{" "}
                    <Link href="/terms&conditions">
                      <span className="underline text-gray-500 decoration-[0.6px]  ">
                        the terms and conditions.
                      </span>
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <div>
                    <div
                      onClick={() => setDesc(!desc)}
                      className="bg-[#f4f4f4] cursor-pointer py-3 flex justify-between items-center px-5 rounded-lg"
                    >
                      <h1 className="text-gray-600">Product Details</h1>
                      {desc && (
                        <span>
                          <FaMinus className="text-gray-500 size-2.5 " />
                        </span>
                      )}{" "}
                      {!desc && (
                        <span>
                          <FaPlus className="text-gray-500 size-2.5" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div
                        className={`duration-200 transition-all ease-in-out px-6  ${
                          desc ? "max-h-[2500px] mb-3 py-1.5" : "max-h-0 "
                        } overflow-hidden `}
                      >
                        <p
                          dangerouslySetInnerHTML={createMarkup(data?.desc)}
                          className="font-light text-sm"
                        ></p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => setSecure(!secure)}
                      className="bg-[#f4f4f4] cursor-pointer py-3 flex justify-between items-center px-5 rounded-lg"
                    >
                      <h1 className="text-gray-600">We Care For You</h1>
                      {secure && (
                        <span>
                          <FaMinus className="text-gray-500 size-2.5 " />
                        </span>
                      )}{" "}
                      {!secure && (
                        <span>
                          <FaPlus className="text-gray-500 size-2.5" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div
                        className={`duration-200 transition-all ease-in-out px-6   ${
                          secure
                            ? "max-h-[2500px] mb-3 py-2 sm:py-1.5"
                            : "max-h-0 "
                        } overflow-hidden `}
                      >
                        <div className="flex sm:flex-row flex-col font-light gap-3 sm:gap-28 md:gap-10 lg:gap-28 text-sm  sm:items-center">
                          <div className="flex items-center gap-2 ">
                            <span>
                              <BiWorld />
                            </span>
                            <p> Worldwide Delivery </p>
                          </div>
                          <p className="sm:pl-0 pl-2">24/7 Customer Support</p>
                        </div>
                        <div className="flex font-light flex-col sm:flex-row gap-3 sm:gap-20 md:gap-10 lg:gap-20 mt-7 sm:mt-5 text-sm sm:items-center">
                          <div className="flex items-center gap-2 ">
                            <span>
                              <MdOutlinePayment />
                            </span>
                            <p> Secure payment methods </p>
                          </div>
                          <p className="sm:pl-0 pl-2">Buyers Protection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <h2 className="text-3xl font-semibold mb-9 mt-28 text-center">
              HOW ABOUT THESE?
            </h2>
            <div className="lg:container hide-scrollbar overflow-x-auto mx-auto">
              <Images relatedProduct={relatedProduct} />
            </div>
          </>
        )}
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
            onClick={() => setAllowed(false)}
            className="cursor-pointer absolute right-0  w-16 h-full flex justify-center items-center bg-[#c9a04a]"
          >
            <IoMdClose className="size-6" />
          </div>
        </div>
      </section>
      <UserOrderInfo
        proceedToCheckout={proceedToCheckout}
        getInfo={getInfo}
        setGetInfo={setGetInfo}
      />
    </div>
  );
}

export default AccountPage;
