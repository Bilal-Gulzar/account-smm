"use client"
import React from 'react'
import { useState, useEffect, useRef } from "react";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';

var jwt = require("jsonwebtoken");

function UserOrderInfo({ proceedToCheckout, getInfo, setGetInfo }) {
   const router = useRouter()
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [checkNum, setCheckNum] = useState(false);
  const scrollableContentRef = useRef(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const decode = jwt.decode(token);
      setEmail(decode.email || "");
    }
  }, []);

  useEffect(() => {
    if (scrollableContentRef.current) {
      if (!getInfo) {
        enableBodyScroll(scrollableContentRef.current);
      } else {
        disableBodyScroll(scrollableContentRef.current);
      }
    }

    return () => {
        if (scrollableContentRef.current) {
      enableBodyScroll(scrollableContentRef.current); // Cleanup on unmount
    }
    };
  }, [getInfo]);

  function handleInfo(evt){
    evt.preventDefault()
 const length = `${phone}`.length;
 if (length < 10 || length > 15) return setCheckNum(true) ,router.push('###');
 setCheckNum(false);
 setGetInfo(false)
 let fullName = fName+" "+lName
 proceedToCheckout(email,fullName,address,postal,city,phone,country)
  }

  function removeState() {
setFName('')
setLName('')
setAddress('')
setCity('')
setCountry('')
setPhone('')
setPostal('')
  }
  return (
    <section>
      <div
        className={`fixed right-0 ${
          getInfo ? "flex" : " translate-y-full "
        } justify-center left-0 top-0 z-50  backdrop-blur-sm bg-[#666666]/80 w-full h-full items-end md:items-center`}
      >
        <div
          className={`${
            getInfo ? "translate-y-0" : "translate-y-full"
          } transition-all  duration-300 md:duration-200 ease-in w-full  max-h-[80vh] md:h-[350px] md:w-[690px] lg:w-[750px] overflow-y-auto hide-scrollbar rounded-t-xl md:rounded-md  px-5 bg-white`}
          ref={scrollableContentRef}
        >
          <div id="##" className="mt-3 ">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-medium">Address</h1>
              <div
                onClick={() => {
                  setGetInfo(false), setCheckNum(false), removeState();
                }}
                className="hover:bg-[#f5f5f5] rounded-md p-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.07797 6.07797C6.22442 5.93153 6.46186 5.93153 6.6083 6.07797L12 11.4697L17.3917 6.07797C17.5381 5.93153 17.7756 5.93153 17.922 6.07797C18.0685 6.22442 18.0685 6.46186 17.922 6.6083L12.5303 12L17.922 17.3917C18.0685 17.5381 18.0685 17.7756 17.922 17.922C17.7756 18.0685 17.5381 18.0685 17.3917 17.922L12 12.5303L6.6083 17.922C6.46186 18.0685 6.22442 18.0685 6.07797 17.922C5.93153 17.7756 5.93153 17.5381 6.07797 17.3917L11.4697 12L6.07797 6.6083C5.93153 6.46186 5.93153 6.22442 6.07797 6.07797Z"
                    stroke="gray"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`${
                checkNum ? "" : "hidden "
              } flex my-4 items-center gap-3 text-red-950 font-medium text-sm rounded border  border-red-200  p-3 bg-red-50`}
            >
              <span>
                <MdOutlineErrorOutline className="size-6 text-red-500" />
              </span>{" "}
              Phone number is not valid
            </div>
            <form onSubmit={handleInfo}>
              <div className="mt-3 grid md:grid-cols-2 gap-3 ">
                <div className="relative ">
                  <label
                    htmlFor="email"
                    className="left-5 top-1.5   absolute text-sm text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="off"
                    required
                    readOnly
                    value={email}
                    className="py-2.5 px-5 w-full outline-none  text-gray-500 text-sm pt-6 border border-gray-300 rounded"
                  />
                  <legend className="text-gray-500 text-xs mt-1 ml-1">
                    Email used for login can't be changed
                  </legend>
                </div>
                <div className="relative ">
                  <input
                    id="country"
                    type="text"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="py-2.5 input-field  px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="country"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                  >
                    country/region
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    className="py-2.5 input-field  px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="firstName"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                  >
                    First name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                    className="py-2.5 px-5 input-field w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="lastName"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                  >
                    Last name
                  </label>
                </div>
                <div className="relative md:col-span-2 ">
                  <input
                    id="address"
                    type="text"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="py-2.5 px-5 input-field w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="address"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                  >
                    Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="city"
                    type="text"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="py-2.5 px-5 input-field w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="city"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                  >
                    City
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="postalcode"
                    type="number"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="py-2.5 input-field px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="postalcode"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                  >
                    Postal code
                  </label>
                </div>
                <div className="relative md:col-span-2 ">
                  <input
                    id="phone"
                    type="number"
                    autoComplete="off"
                    placeholder=""
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="py-2.5 input-field px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="phone"
                    className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                  >
                    Phone
                  </label>
                  <legend className="text-gray-500 text-xs mt-1 ml-1">
                    Please provide your phone number so we can contact you if
                    needed.
                  </legend>
                </div>
              </div>
              <div className="py-5 flex justify-end ">
                <button
                  onClick={() => {
                    setGetInfo(false), setCheckNum(false);
                    removeState();
                  }}
                  type="button"
                  className="p-3 text-sm rounded-md "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[190px] flex justify-center items-center bg-black text-white bg[#C7C6C6] text-sm hover:bg-[#acabab] rounded-md font-medium"
                >
                  Continue to CheckOut
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserOrderInfo