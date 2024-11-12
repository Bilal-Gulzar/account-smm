"use client"
import React from 'react'
import Accountsetitngnavbar from '../component/accountsetitngnavbar'
import { RxLockClosed } from "react-icons/rx";
import Link from 'next/link';
import LogOut from '../component/logout';
import { useAppContext } from '../contextApi/Accoutsmm';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";


export default function LogoutSetting() {
const router = useRouter();

const {Logout} = useAppContext()

useEffect(() => {
  let Token = localStorage.getItem("token");
  if (!Token) {
    router.push("/login");
  }
}, []);

  return (
    <main className="bg-[#f5f5f5] flex flex-col justify-between overflow-hidden min-h-screen">
      <div>
        <Accountsetitngnavbar />
        <div className="mt-10 px-5  lg:max-w-[1200px] lg:mx-auto lg:px-14">
          <h1 className="font-medium text-2xl">Settings</h1>
          <div className="grid gap-7 md:gap-5 md:grid-cols-[40%_auto] mt-8">
            <div className="flex  flex-col gap-3">
              <h2 className="font-medium flex gap-2 items-center">
                <span>
                  <RxLockClosed className="size-5" />
                </span>
                Log out everywhere
              </h2>
              <p className="text-gray-500 text-sm">
                If you've lost a device or have security concerns, log out
                everywhere to ensure the security of your account.
              </p>
            </div>
            <div className="bg-white lg:flex-row flex-col flex gap-4 lg:items-center p-5 rounded-md ">
              <button
                onClick={Logout}
                className="py-4 flex justify-center items-center border-[1.5px] font-medium text-gray-300 text-sm tracking-wide hover:text-gray-400 px-8 border-gray-300 rounded-md"
              >
                Log out everywhere
              </button>
              <p className="text-sm text-gray-500">
                You will be logged out on this device as well.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t lg:max-w-[1085px] lg:mx-auto px-5  text-xs flex lg:flex-row flex-col items-center  underline gap-7 py-8  bottom-0 right-0 left-0 w-full  border-gray-300 mt-14">
        <Link href="/exchange&return">
          <div>Return & Exchange</div>
        </Link>
        <Link href="/privacy-policy">
          <div> Privacy Policy</div>
        </Link>
        <Link href="/terms&conditions">
          <div>Terms & Condition</div>
        </Link>
      </div>
      <LogOut />
    </main>
  );
}
