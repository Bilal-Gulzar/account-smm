import React from 'react'
import { IoCloseOutline } from "react-icons/io5";

export default function Delete({deleteAccount,prop,id,deleteMenu}) {
  console.log(deleteMenu)
  return (
    <section className={`min-w-[100%] flex justify-center z-50 items-end sm:items-center min-h-screen fixed top-0 backdrop-blur-sm bg-[#666666]/80 ${deleteMenu ? "translate-y-0" :"translate-y-full" }`}>
      <div className={`w-full sm:w-[600px] md:w-[700px] lg:w-[800px]  rounded-t-2xl sm:rounded-xl h-[170px] bg-white  transition-all duration-300 ease-out ${deleteMenu? "translate-y-0":  "translate-y-full"}`}>
        <div className="flex justify-between items-center  px-5 py-3 sm:py-2.5">
          <h1 className="text-2xl font-medium">Delete Account?</h1>
          <span  onClick={()=>prop(false)} className="hover:bg-[#f5f5f5] cursor-pointer">
            <IoCloseOutline className="size-5 m-1" />
          </span>
        </div>
        <div className="text-sm px-5">
          <p>Existing Accounts are not affected.</p>
        </div>
        <div className="flex justify-end px-5 gap-4 mt-7">
          <button
            onClick={() => {
               prop(false);
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              deleteAccount(id), prop(false);
            }}
            className="bg-[#BB1818] hover:bg-[#c91b1b] hover:text-[#edb1b1] transition-all duration-300 text-sm text-white font-medium px-4 py-3.5 rounded-md"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}

