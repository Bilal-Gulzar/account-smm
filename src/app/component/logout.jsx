"use client"
import React from 'react'
import { ImSpinner8 } from "react-icons/im";
import { useAppContext } from '../contextApi/Accoutsmm';
import ScrollLock from "react-scrolllock";

export default function LogOut() {
      const {logging} = useAppContext()
  return (
    
    <section className={`${logging ? "" : "translate-y-full"} z-50 fixed justify-center items-end sm:items-center left-0 top-0  backdrop-blur-sm bg-[#666666]/80 w-full h-full flex  `}>
      {logging && <ScrollLock />}
      <div className={`${logging ? "translate-y-0 " : "translate-y-full"} transition-all duration-200 ease-in   bg-white  gap-3 flex flex-col items-center justify-center w-full mx-0 sm:w-[330px] h-[120px] rounded-t-2xl sm:rounded-lg`}>
        <button className="animate-spin">
          <ImSpinner8 className="size-8" />
        </button>
        <p className="text-sm ">Logging you out...</p>
      </div>
    </section>

  );
}
