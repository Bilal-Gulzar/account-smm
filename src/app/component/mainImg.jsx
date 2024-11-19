"use client"
import {useEffect,useState } from 'react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Image from 'next/image';
import React from 'react'
import { InfinitySpin } from "react-loader-spinner";

export default function MainImg({DynamicImg}) {

 const [images, setImages] = useState([]);
 const [update, setUpdate] = useState(null);
 const [num, setNum] = useState(0);

 useEffect(() => {
   if (DynamicImg && DynamicImg.length) {
     setImages(DynamicImg);
     setUpdate(DynamicImg[0]);
   }
 }, [DynamicImg]);

 const ForwardImg = () => {
   setNum((prevNum) => {
     const nextNum = (prevNum + 1) % images.length;
     setUpdate(images[nextNum]);
     return nextNum;
   });
 };

 const BackImg = () => {
   setNum((prevNum) => {
     const nextNum = (prevNum - 1 + images.length) % images.length;
     setUpdate(images[nextNum]);
     return nextNum;
   });
 };

 const UpdateImg = () => {
   setNum((prevNum) => {
     const nextNum = (prevNum + 1) % images.length;
     setUpdate(images[nextNum]);
     return nextNum;
   });
 };

 useEffect(() => {
   const interval = setInterval(() => {
     UpdateImg();
   }, 4500);

   return () => clearInterval(interval);
 }, [images]);

  return (
    <section className="max-w-[2700px] mx-auto">
      <div className="relative pb-2">
        <div className="relative  w-full h-[370px] sm:h-[50vw] lg:h-[43vw]">
          {update && (
            <Image
              src={update}
              fill
              sizes="100vw"
              quality={100}
              alt="verified account"
              priority
            />
          )}
          {update && (
            <Image
              src={update}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              alt="verified account"
              priority
            />
          )}
          {!update && (
            <div className="w-full flex justify-center items-center h-[370px] sm:h-[50vw] lg:h-[43vw] bg-gray-100">
              <InfinitySpin
                visible={true}
                width="200"
                color="#000000"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          )}
        </div>
        {update && (
          <div className="absolute top-[45%] md:top-[50%] left-4  cursor-pointer rounded-full lg:w-10 lg:h-10 w-8 h-8  ">
            <span onClick={BackImg}>
              <SlArrowLeft className="text-black lg:size-5 size-4 lg:ml-[7px] ml-[5px]  lg:mt-[9px] md:mt-[7px] " />
            </span>
          </div>
        )}
        {update && (
          <div className="absolute top-[45%] md:top-[50%] right-4 cursor-pointer rounded-full w-8 h-8 lg:w-10 lg:h-10 ">
            <span onClick={ForwardImg}>
              <SlArrowRight className=" text-black font-light size-4 lg:size-5 lg:ml-[11px] lg:mt-[9px] md:mt-[7px] ml-[8px]" />
            </span>
          </div>
        )}
        <div className="flex gap-1.5 justify-center w-full absolute bottom-7 ">
          {images.map((v, i) =>
            v == update ? (
              <span
                key={i}
                className=" w-6 h-2  rounded-full bg-white dark:bg-white "
              ></span>
            ) : (
              <span
                key={i}
                className="sm:w-2 sm:h-2 w-1.5 h-1.5  rounded-full bg-white bg-opacity-50"
              ></span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
