"use client";
import React from "react";
import { useAppContext } from "../contextApi/Accoutsmm";
import { usePathname} from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ShowToAdmin from "./showToAdmin";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
var jwt = require("jsonwebtoken");
export default function Div() {
  const path = usePathname();
  const { Logout, showdiv, setShowdiv } = useAppContext();
  const [letter, setLetter] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
 const scrollableContentRef = useRef(null);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      let decode = jwt.decode(token);
      fetch("/api/isAdmin?id=" +decode.id)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) return setAdmin(data.admin);
        })
        .catch((e) => console.error(e));

      fetch("/api/profile?id=" + decode.id)
        .then((res) => res.json())
        .then((data) => {
          let first = data.firstName
            ? data.firstName.charAt(0).toLocaleUpperCase()
            : "";
          let second = data.lastName
            ? data.lastName.charAt(0).toLocaleUpperCase()
            : "";
          let name = first + second;
          setEmail(data?.email);
          setLetter(name.trim() || "");
          const fullName =
            (data.firstName || "").trim() + " " + (data.lastName || "").trim();
          setFullName(fullName.trim() || "");
        });
    }
  }, []);


    useEffect(() => {
      if (scrollableContentRef.current) {
        if (!showdiv) {
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
    }, [showdiv]);

  return (
    <>
      <section
        className={`${
          showdiv ? "md:block hidden" : "hidden"
        } absolute px-6 w-[300px] bg-white z-20 shadow-bottom  top-16 shadow-lg -right-36 lg:-right-44 cursor-default`}
        ref={scrollableContentRef}
      >
        <div className="flex gap-3 items-center text-sm text-gray-500 border-b pt-3 border-gray-300  pb-4">
          <div className="">
            {letter ? (
              <div className="w-8 h-8  text-black rounded-full bg-[#f5f5f5] flex justify-center items-center text-sm">
                {letter}
              </div>
            ) : (
              <svg
                height="32"
                width="32"
                viewBox="0 0 19.05 19.05"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs />
                <g style={{ opacity: 1 }}>
                  <g>
                    <circle
                      cx="9.6948"
                      cy="8.6535"
                      r="2.8189"
                      style={{
                        fill: "none",
                        stroke: "#707070", // Updated color
                        strokeWidth: 0.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                    <path
                      d="M4.6323,15.2284 A5.1757,5.1757 0 0 1 9.5562,11.6475 A5.1757,5.1757 0 0 1 14.4801,15.2281"
                      style={{
                        fill: "none",
                        stroke: "#707070", // Updated color
                        strokeWidth: 0.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                    <circle
                      cx="9.5562"
                      cy="9.3467"
                      r="7.6711"
                      style={{
                        fill: "none",
                        stroke: "#707070", // Updated color
                        strokeWidth: 0.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                  </g>
                </g>
              </svg>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            {fullName && (
              <div className="text-sm text-black break-all pr-12">
                {fullName}
              </div>
            )}
            <div className="text-xs  break-all pr-12">{email}</div>
          </div>
        </div>
        {path.includes("admin") ? (
          <ShowToAdmin setShowdiv={setShowdiv} />
        ) : (
          <div className="flex flex-col text-sm text gap-3 py-5  ">
            <Link href="/profile">
              <p
                onClick={() => setShowdiv(false)}
                className={`hover:bg-[#f5f5f5] p-2.5 ${
                  path.includes("/profile") ? "underline" : "no-underline"
                }`}
              >
                Profile
              </p>
            </Link>
            <Link href="/logoutSetting">
              <p
                onClick={() => setShowdiv(false)}
                className={`hover:bg-[#f5f5f5] p-2.5  ${
                  path.includes("/logoutSetting") ? "underline" : "no-underline"
                }`}
              >
                Settings
              </p>
            </Link>
            <p
              onClick={()=>{Logout(),setShowdiv(false)}}
              className="hover:bg-[#f5f5f5] cursor-pointer p-2.5"
            >
              Log out
            </p>
            {admin && (
              <Link href="/admin/accountPanel">
                <p
                  onClick={() => setShowdiv(false)}
                  className="hover:bg-[#f5f5f5] p-2.5"
                >
                  Admin
                </p>
              </Link>
            )}
          </div>
        )}
      </section>

      <section
        className={`min-h-screen transition-all duration-500 overflow-x-hidden border-t border-gray-500 bg-white fixed px-3 left-0 top-[120px] bottom-0 z-30  w-[80vw] md:hidden ${
          showdiv ? "" : "-translate-x-full"
        }  `}
        ref={scrollableContentRef}
      >
        <div className="flex gap-3 items-center text-sm text-gray-500 border-b py-6 border-gray-300  ">
          <div className="">
            {letter ? (
              <div className="w-8 h-8  text-black rounded-full bg-[#f5f5f5] flex justify-center items-center text-sm">
                {letter}
              </div>
            ) : (
              <svg
                height="32"
                width="32"
                viewBox="0 0 19.05 19.05"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs />
                <g style={{ opacity: 1 }}>
                  <g>
                    <circle
                      cx="9.6948"
                      cy="8.6535"
                      r="2.8189"
                      style={{
                        fill: "none",
                        stroke: "#707070", // Updated color
                        strokeWidth: 0.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                    <path
                      d="M4.6323,15.2284 A5.1757,5.1757 0 0 1 9.5562,11.6475 A5.1757,5.1757 0 0 1 14.4801,15.2281"
                      style={{
                        fill: "none",
                        stroke: "#707070", // Updated color
                        strokeWidth: 0.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                    <circle
                      cx="9.5562"
                      cy="9.3467"
                      r="7.6711"
                      style={{
                        fill: "none",
                        stroke: "#707070", // Updated color
                        strokeWidth: 0.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                  </g>
                </g>
              </svg>
            )}
          </div>
          <div className="break-all flex flex-col gap-0.5 text-sm pr-3 text-balance">
            {fullName && (
              <div className="text-sm text-black break-all pr-3">
                {fullName}
              </div>
            )}
            <p className="text-xs">{email}</p>
          </div>
        </div>
        <Link href="/orders">
          <div
            className={`flex items-center pl-3 text-sm  border-b py-6 border-gray-300 ${
              path.includes("/orders") ? "underline" : "no-underline"
            }`}
          >
            Orders
          </div>
        </Link>
        {path.includes("admin") ? (
          <ShowToAdmin setShowdiv={setShowdiv} />
        ) : (
          <div className="flex  flex-col text-sm text gap-3 py-5  ">
            <Link href="/profile">
              <p
                className={`hover:bg-[#f5f5f5] p-2.5 ${
                  path.includes("/profile") ? "underline" : "no-underline"
                }`}
              >
                Profile
              </p>
            </Link>
            <Link href="/logoutSetting">
              <p
                className={`hover:bg-[#f5f5f5] p-2.5 ${
                  path.includes("/logoutSetting") ? "underline" : "no-underline"
                }`}
              >
                Settings
              </p>
            </Link>
            <p onClick={()=>{Logout(),setShowdiv(false)}} className="hover:bg-[#f5f5f5] p-2.5">
              Log out
            </p>
            {admin && (
              <Link href="/admin/accountPanel">
                <p className="hover:bg-[#f5f5f5] p-2.5">Admin</p>
              </Link>
            )}
          </div>
        )}
      </section>
    </>
  );
}
