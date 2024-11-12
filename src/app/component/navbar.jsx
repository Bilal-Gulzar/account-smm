"use client";
import React from "react";
import { IoIosCall } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import Mobilenavbar from "./mobilenavbar";
import SearchBar from "./searchBar";
import Cart from "./cart";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/contextApi/Accoutsmm";
import { useParams, usePathname } from "next/navigation";
import Menu from "./menu";
import Afterlogin from "./afterlogin";
import LogOut from "./logout";
import LoginSVG from "./loginSVG";
import WhatsappIcon from "./whatsappIcon";
import { useRef } from "react";

export default function Navbar() {
  const { jwttoken, setJwttoken, setCart, search, setSearch, shoppingCart, wishlist, Logout } =
    useAppContext();
    const {id} = useParams()
    const path = usePathname();
  //  / Define the routes where the navbar should be hidden
  const noNavbarRoutes = ["/login", "/logoutSetting", "orders","/profile","/admin/user","/admin/accountPanel","/admin/accountPanel/new", `/admin/accountPanel/${id}` ,"/admin/homepage","/orders",`/orders/${id}`];
  // console.log(noNavbarRoutes.includes(path))
  const [menu, setMenu] = useState(false);
  const [istoken, setIstoken] = useState(false);
  

let data = {setMenu,path,menu}

 useEffect(() => {
   if (typeof window !== "undefined") {
     let token = localStorage.getItem("token");
     if (token) {
       setJwttoken(true);
     } else {
       setIstoken(false);
     }
   }
 }, []);

    const [isSticky, setIsSticky] = useState(false);
    const targetRef = useRef(null);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if the page is scrolled down
      if (scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

const RefreshButton = () => {

if(path !== '/cart'){
  setCart(true)
}else{
window.location.reload();
}
}
  return (
    <header
      className={`sticky top-0 shadow z-50 right-0 left-0 bg-white ${
        noNavbarRoutes.includes(path) ? "hidden" : ""
      }`}
    >
      <div
        ref={targetRef}
        className={`${
          isSticky ? "max-h-0" : " py-2 max-h-[500px] "
        } flex transition-all duration-200 text-sm items-center gap-6 justify-center bg-black text-white`}
      >
        <div className="flex items-center gap-1">
          <span>
            <MdMailOutline />
          </span>{" "}
          smmseoit@gamil.com
        </div>
        <div className="sm:flex items-center gap-1 hidden">
          <span>
            <IoIosCall />
          </span>{" "}
          (862) 272-7541
        </div>
      </div>
      <div className="lg:hidden mx-w-[900px]  items-center my-2 flex  gap-5 mx-3">
        <div className="w-full">
          <Link href={"/"}>
            <button
              className={`${
                !path.includes("/accountService")
                  ? "bg-black font-medium text-white"
                  : "hover:border border-gray-400"
              }  py-1.5 w-full sm:py-2  text-sm tracking-wider `}
            >
              ACCOUNTS
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Link href={"/accountService"}>
            <button
              className={`${
                path.includes("/accountService")
                  ? "bg-black font-medium text-white"
                  : " hover:border border-gray-400"
              } py-1.5 sm:py-2  w-full text-sm tracking-wider `}
            >
              SERVICES
            </button>
          </Link>
        </div>
      </div>
      <div className="flex mt-1 justify-between border-b pb-1.5 items-center px-4 lg:px-7 2xl:container 2xl:mx-auto">
        <div className="lg:flex hidden items-center mt-2 ">
          <Link href={"/"}>
            <button
              className={` ${
                !path.includes("/accountService")
                  ? "bg-black font-medium text-white"
                  : " hover:border border-gray-400"
              } py-1.5 px-9  text-sm  tracking-wider`}
            >
              ACCOUNTS
            </button>
          </Link>
          <Link href={"/accountService"}>
            <button
              className={`${
                path.includes("/accountService")
                  ? "bg-black font-medium text-white"
                  : " hover:border border-gray-400"
              }  tracking-wider py-1.5 px-9 text-sm  `}
            >
              SERVICES
            </button>
          </Link>
        </div>
        <div onClick={() => setMenu(true)} className="lg:hidden">
          <HiOutlineMenuAlt1 className="size-7" />
        </div>
        <div className="relative ml-10 lg:-ml-8">
          <Link href="/">
            <Image
              src="/smm.png"
              alt="accountsmm"
              width={60}
              height={60}
              className="h-auto"
              // unoptimized
              priority
            />
          </Link>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center mt-4 ">
          <div onClick={() => setSearch(!search)}>
            <IoIosSearch className="size-[22px] lg:size-[20px] cursor-pointer" />
          </div>
          {jwttoken ? (
            <div
              onMouseOutCapture={() => setIstoken(false)}
              onMouseOver={() => setIstoken(true)}
              className="lg:block relative hidden "
            >
              <Link href="/orders">
                <LoginSVG />
              </Link>
              <Afterlogin
                istoken={istoken}
                setIstoken={setIstoken}
                Logout={Logout}
              />
            </div>
          ) : (
            <div className="lg:block hidden">
              <Link href="/login">
                <LoginSVG />
              </Link>
            </div>
          )}
          {/* <div>
            <LiaShippingFastSolid className="size-6 lg:size-5" />
          </div> */}
          <div className="relative lg:block hidden">
            <Link href="/wishlist">
              <LuHeart className="size-[19px]" />
              <span className="absolute w-[15px] text-[9px] -top-1 -right-2.5 flex justify-center items-center h-[15px] rounded-full bg-black text-white">
                {wishlist.length}
              </span>
            </Link>
          </div>
          <div onClick={RefreshButton} className="relative cursor-pointer">
            <LiaShoppingBagSolid className="size-[22px] lg:size-[21px]" />
            <span className="absolute w-[15px] text-[10px] -top-1 -right-2 flex justify-center items-center h-[15px] rounded-full bg-black text-white">
              {shoppingCart.length}
            </span>
          </div>
        </div>
      </div>
      <Menu path={data} />
      <Mobilenavbar path={data} />
      <Cart />
      <SearchBar />
      <LogOut />
      <WhatsappIcon />
    </header>
  );
}
