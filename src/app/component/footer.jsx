"use client"
import React, { useState } from 'react'
import { RiWhatsappLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { GrSnapchat } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoCheckmark } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
export default function Footer() {
  const {id} = useParams()
  const path = usePathname()
  const [email,setEmail] = useState('')
  const [contact,setContact]  = useState(false)
  const [policy,setPolicy]  = useState(false)
  const [customer,setCustomer]  = useState(false)
  const [newUser,setNewUser]  = useState(false)
  const [subscribe,setSubcribe]  = useState(false)
  const [subscriberExist,setSubcriberExist]  = useState(false)
  const currentYear = new Date().getFullYear();
  const noNavbarRoutes =  ["/login", "/logoutSetting", "orders","/profile","/admin/user","/admin/accountPanel","/admin/accountPanel/new",`/admin/accountPanel/${id}`, "/admin/homepage","/orders",`/orders/${id}`];

async function addsubscriber(evt){
evt.preventDefault()
setSubcribe(false)
setSubcriberExist(false)
const  data = {email}
const res =  await fetch('/api/addSubscription',{

  method: 'POST',
headers:{"Content-Type" : "application/json"  
},
body : JSON.stringify(data)
})

let result = await res.json()

if(result.error){
 setSubcriberExist(true)
  console.log(result.error);
return

}

setSubcribe(true)

}


  return (
    <footer
      className={`bg-[#f7fafa] ${
        noNavbarRoutes.includes(path) ? "hidden" : ""
      }`}
    >
      <div className="2xl:container 2xl:mx-auto">
        <div className="flex-col md:flex-row flex items-center md:gap-5 md:items-baseline md:justify-between px-10 pt-20 pb-5 ">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex justify-center gap-2 items-center">
              <h1 className="text-sm font-semibold mb-2">CONTACT US</h1>
              <span
                onClick={() => setContact(!contact)}
                name=" cantactUs"
                className={`md:hidden ${
                  contact ? "rotate-0" : "-rotate-45"
                } transition-all duration-500`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
              </span>
            </div>
            <div
              className={`flex flex-col gap-2 ${
                contact ? "max-h-[250px]  mb-3 md:mb-0 " : "max-h-0"
              } duration-500 transition-all ease-in-out overflow-hidden items-center md:items-start md:max-h-[250px]`}
            >
              <Link href="mailto:Egzk.zesh@gmail.com">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  Email us: Egzk.zesh@gmail.com
                </p>
              </Link>
              <Link href="tel:+923114004101">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  call us: +923114004101
                </p>
              </Link>
              <Link href="https://wa.me/15159150081" target="_blank">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  Whatsapp us: +15159150081
                </p>
              </Link>
              <h2 className="flex items-center  text-green-500 font-bold mt-2 md:mt-3 gap-2 ">
                <span>
                  <RiWhatsappLine className="size-6" />
                </span>
                Join our Whatsapp Channel
              </h2>
              <div className="px-8  md:hidden relative mt-2 flex gap-2">
                <div
                  title="Follow on Facebook"
                  className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
                >
                  <FaFacebookF className="size-5" />
                </div>
                <div
                  title="Follow on X"
                  className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
                >
                  <FaXTwitter className="size-5" />
                </div>
                <div
                  title="Follow on Instagram"
                  className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
                >
                  <FaInstagram className="size-5" />
                </div>
                <div
                  title="Follow on Snapchat"
                  className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
                >
                  <GrSnapchat className="size-5" />
                </div>
                <div
                  title="Follow on Tiktok"
                  className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
                >
                  <FaTiktok className="size-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start md:mt-0 mt-5">
            <div className="flex justify-center gap-2 items-center">
              <h1 className="text-sm font-semibold mb-2">CUSTOMER CARE</h1>
              <span
                onClick={() => setCustomer(!customer)}
                name="customerCare"
                className={`md:hidden ${
                  customer ? "rotate-0" : "-rotate-45"
                } transition-all duration-500`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
              </span>
            </div>
            <div
              className={`flex flex-col gap-2 md:items-start items-center ${
                customer ? "max-h-[250px]  mb-3 md:mb-0 " : "max-h-0"
              } duration-500 transition-all ease-in-out overflow-hidden md:max-h-[250px]`}
            >
              <Link href="/orders">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  My Account
                </p>
              </Link>
              <Link href="/contact">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  Contact Us
                </p>
              </Link>
              <Link href="/about">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  About Us
                </p>
              </Link>
              <Link href="/faqs">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  FAQs
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start mt-5 md:mt-0">
            <div className="flex justify-center gap-2 items-center">
              <h1 className="text-sm font-semibold mb-2">POLICIES</h1>
              <span
                onClick={() => setPolicy(!policy)}
                name="Policy"
                className={`md:hidden ${
                  policy ? "rotate-0" : "-rotate-45"
                } transition-all duration-500`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
              </span>
            </div>
            <div
              className={`flex flex-col gap-2 md:items-start items-center ${
                policy ? "max-h-[250px]  mb-3 md:mb-0 " : "max-h-0"
              } duration-500 transition-all lg:mb-6 ease-in-out overflow-hidden md:max-h-[250px]`}
            >
              <Link href="/privacy-policy">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  Privacy Policy
                </p>
              </Link>
              <Link href="/exchange&return">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  Return and Exchanges
                </p>
              </Link>
              <Link href="/terms&conditions">
                <p className="text-[13px] font-light text-gray-600 hover:text-black">
                  terms & Conditions
                </p>
              </Link>
              {/* <p className="text-[13px] font-light text-gray-600 hover:text-black">
                Blogs
              </p> */}
            </div>
          </div>

          <div className="md:hidden lg:block relative    mt-5 lg:-mt-3 md:mt-0">
            <div className="flex justify-center lg:justify-start gap-2 items-center lg:items-start">
              <h1 className="text-sm font-semibold mb-2 lg:text-start text-center">
                NEWSETTLER SIGNUP
              </h1>
              <span
                onClick={() => setNewUser(!newUser)}
                name="newUser"
                className={`md:hidden ${
                  newUser ? "rotate-0" : "-rotate-45"
                } transition-all duration-500`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
              </span>
            </div>
            <div
              className={`relative  ${
                newUser ? "max-h-[250px]  mb-3 md:mb-0 " : "max-h-0"
              } duration-500 transition-all ease-in-out overflow-hidden md:max-h-[250px]`}
            >
              <p className="text-[13px] mb-5 mt-1 font-light text-center lg:text-left px-0.5 text-gray-600 hover:text-black">
                Enter your email to receive our latest update about AccountSMM
              </p>
              <form onSubmit={addsubscriber}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2.5 border  pr-32 w-full font-light placeholder:text-gray-600 text-sm rounded-md border-gray-600 outline-none px-3"
                  required
                />
                <button
                  type="submit"
                  className="absolute rounded-r-md  right-0 py-[9px] px-4 sm:px-6  bg-black text-white font-medium "
                >
                  Subscribe
                </button>
              </form>
              {subscribe && (
                <div className="flex gap-1 text-xs py-2  px-4 rounded-full my-3 text-[#488645] items-center max-w-full  border border-[#488645] ">
                  <span>
                    <IoCheckmark />
                  </span>
                  <p>Thanks for subscribing</p>
                </div>
              )}
              {subscriberExist && (
                <div className="flex gap-1 text-xs py-2  px-4 rounded-full my-3 text-red-500 items-center max-w-full  border border-red-500 ">
                  <span>
                    <IoIosClose className="size-4" />
                  </span>
                  <p>Please provide a valid email</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`px-8 hidden relative pb-28 ${
            subscribe || subscriberExist ? "lg:-mt-6" : ""
          } md:flex gap-3.5`}
        >
          <div
            title="Follow on Facebook"
            className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
          >
            <FaFacebookF className="size-5" />
          </div>
          <div
            title="Follow on X"
            className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
          >
            <FaXTwitter className="size-5" />
          </div>
          <div
            title="Follow on Instagram"
            className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
          >
            <FaInstagram className="size-5" />
          </div>
          <div
            title="Follow on Snapchat"
            className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
          >
            <GrSnapchat className="size-5" />
          </div>
          <div
            title="Follow on Tiktok"
            className="cursor-pointer hover:-translate-y-3 transition-all duration-700"
          >
            <FaTiktok className="size-5" />
          </div>
          <div className="md:block lg:hidden hidden absolute right-11 top-5">
            <h1 className="text-sm font-semibold mb-2">NEWSETTLER SIGNUP</h1>
            <p className="text-[13px] font-light text-center text-gray-600 hover:text-black">
              Enter your email to receive our latest update about AccountSMM
            </p>
            <div className="relative  mt-7">
              <input
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                className="py-2.5 border pr-32 w-full font-light  placeholder:text-gray-600 text-sm rounded-md border-gray-600 outline-none px-3"
              />
              <button className="absolute rounded-r-md  right-0 py-[9px] px-6  bg-black text-white font-medium ">
                Subscribe
              </button>
              {subscribe && (
                <div className="flex gap-1 text-xs py-2 px-4 rounded-full my-3 text-[#488645] items-center max-w-full  border border-[#488645] ">
                  <span>
                    <IoCheckmark />
                  </span>
                  <p>Thanks for subscribing</p>
                </div>
              )}
              {subscriberExist && (
                <div className="flex gap-1 text-xs py-2  px-4 rounded-full my-3 text-red-500 items-center max-w-full  border border-red-500 ">
                  <span>
                    <IoIosClose className="size-4" />
                  </span>
                  <p>Please provide a valid email</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-5 pb-20 mt-12 md:mt-28 lg:mt-0 lg:pb-5 flex sm:flex-row flex-col gap-3 sm:gap-2  sm:justify-between items-center">
          <div className=" text-xs text-gray-500 text-center sm:text-left font-bold tracking-wide">
            ©{currentYear} AccountsSMM All Rights Reserved.
          </div>
          <div>
            <Image
              src="/goda.png"
              width={150}
              height={150}
              alt="secure payment"
              className="h-auto"
              priority
            />
          </div>
          <div>
            <Image
              src="/paymentImg.webp"
              width={200}
              height={200}
              alt="secure payment"
              className="h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
