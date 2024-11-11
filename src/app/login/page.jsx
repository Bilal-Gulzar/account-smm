"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Suspense } from 'react';

 function Login(){
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const param = useSearchParams()
  const router =  useRouter() 
  const [userEmail, setUserEmail] = useState("");
  const [otp,setOtp] = useState('')
  const [otpSent,setOtpSent] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const focusInputs = async () => {
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
    // Wait for a brief moment before focusing the second input
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (inputRef2.current) {
      inputRef2.current.focus();
    }
  };

    useEffect(() => {
      focusInputs()
    }, [param])

  const  sendEmail = async (evt) =>{
  evt.preventDefault()
  setIsLoading(true)

  //   let data = { userEMail};
  //   let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendOtp`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   let response = await res.json();
  // }  
let data = { userEmail };
  fetch("/api/sendOtp",{
 method:"POST",
 headers:{

  "Content-Type" : "application/json"
 },
 body: JSON.stringify(data)
  })
  .then((res)=> res.json())
  .then((data)=>{
    setUserEmail(data.email)
    setIsLoading(false)
    setOtpSent(true)
     router.push('/login?query=codes')
     setOtp('')
     localStorage.setItem('usertemEmail',data.email)
  }).catch((e)=>{
  toast.error("Error,sorry... please try again Later")   
    console.log(e)
    setIsLoading(false)
  })
  

}

  // if (!res.ok) {
  //   throw new Error(`Server error: ${res}`);
const verifyOtp = async(evt) =>{
evt.preventDefault()
setIsLoading(true);
let data = {otp,userEmail};
 let res = await fetch(`/api/verifyOtp`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
let result = await res.json()
setIsLoading(false);
if(result.success){
 toast.success(result.Message)
 localStorage.setItem("token", result.jwtToken);
 localStorage.removeItem('usertemEmail');
 router.push('/orders')
}else{
  toast.error(result.Message || "Error,sorry... please try again Later")


} 
}
useEffect(() => {
  if (window.location.href.includes("query=codes")) {
    setOtpSent(true)
    setUserEmail(localStorage.getItem("usertemEmail"));
  }
      
    focusInputs();
}, []);

return (
  <main className="bg-[#f5f5f5] w-screen h-screen flex justify-center lg:pb-14   items-center ">
    <div className="w-[480px] h-[460px] lg:mt-14 sm:bg-white rounded-lg px-5 sm:px-8 ">
      <div className="sm:block hidden mt-20 relative">
        <Image
          src="/Account.jpg"
          width={350}
          height={350}
          priority
          className="h-auto mx-auto"
          alt="accountSMM login img"
        />
      </div>
      <h1 className="text-4xl font-bold text-center mt-8 sm:hidden tracking-wider">
        Account SMM
      </h1>
      {!otpSent && (
        <>
          <div className="mt-10 flex flex-col gap-3">
            <h3 className="text-2xl font-medium">Log in</h3>
            <p className="text-gray-500 text-sm">
              Enter your email and we'll send you a login code
            </p>
          </div>
          <div className="mt-8 flex  flex-col gap-1.5">
            <form onSubmit={sendEmail}>
              <label htmlFor="email" className="text-sm tracking-wide">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full text-sm p-2  border border-gray-500 rounded outline-[#1879B9]"
                autoComplete="email"
                required
                ref={inputRef1}
              />
              <button
                disabled={isLoading}
                type="submit"
                className="w-full disabled:bg-[#f1f1f1] disabled:text-gray-400 py-2.5 bg-[#1879B9] hover:bg-[#115f93]  mt-5 text-white font-medium rounded-md"
              >
                Continue
              </button>
            </form>
          </div>
        </>
      )}
      {otpSent && (
        <>
          <div className="mt-9 flex flex-col gap-2">
            <h3 className="text-2xl font-medium">Enter code</h3>
            <p className="text-gray-500 text-sm">Sent to {userEmail}</p>
          </div>
          <div className="mt-6 flex flex-col gap-1.5">
            <form onSubmit={verifyOtp}>
              <input
                type="number"
                className="w-full  py-3.5 px-5 border border-gray-600  text-gray-500 rounded outline-[#1879B9]"
                autoComplete="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                required
                ref={inputRef2}
              />
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-2.5 disabled:bg-[#f1f1f1] disabled:text-gray-400  bg-[#1879B9] hover:bg-[#115f93]  mt-5 text-white font-medium rounded-md"
              >
                {" "}
                Submit
              </button>
            </form>
            <span
              onClick={() => {
                setOtpSent(false),
                  setUserEmail(""),
                  localStorage.removeItem("usertemEmail");
              }}
              className="text-[#1879B9] hover:text-[#115f93]   mt-2 text-sm ml-1"
            >
              <Link href="/login">Log in with a different email</Link>
            </span>
          </div>
        </>
      )}
      <Link href="/privacy-policy">
        <div className="text-[#1879B9] inline-block  mt-6 text-sm ml-1 hover:underline">
          Privacy
        </div>
      </Link>
    </div>
  </main>
);
}




export default function Searchbar() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Login />
    </Suspense>
  );
}



 