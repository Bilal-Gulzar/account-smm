"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowRightCircleLine } from "react-icons/ri";
import Accountsetitngnavbar from "@/app/component/accountsetitngnavbar";
import { Skeleton } from "@/components/ui/skeleton";
var jwt = require("jsonwebtoken");

export default function EditAccount() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
      Next_Auth()
       fetch("/api/accountcategories").then((res) => {
         res
           .json()
           .then((data) => {
             setCategories(data?.getAccountcategory || []);
           })
           .catch((error) => {
             console.log("something went wrong.", error);
           });
       });
      
    fetch("/api/Accounts")
      .then((resp) => resp.json())
      .then((result) => {
        if(result && result.length> 0 ){
        setData(result.reverse());
      setIsLoading(false);
      }
      });

  }, []);


  function Next_Auth(){

    if (typeof window !== "undefined") {
      let jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        let decode = jwt.decode(jwtToken);
        fetch("/api/isAdmin?id="+decode.id)
          .then((res) => res.json())
          .then((data) => {
            if (!data.success || !data.admin) {
              router.push("/");
            }
          })
          .catch((e) => console.error(e));
      } else {
        router.push("/");
      }
    }

  }

  const skeleton = Array.from({length:6})
  return (
    <main className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between">
      <div>
        <Accountsetitngnavbar />
        <section className="overflow-x-hidden  mx-auto pb-28">
          <Link href={"/admin/accountPanel/new"}>
            <div className="sm:w-[36rem] gap-2 mx-5 sm:mx-auto flex mt-14 items-center  justify-center lg:w-[47rem] border py-2.5 px-4 shadow-sm border-gray-300  font-semibold rounded-lg">
              <p className="font-bold"> Create new Account</p>
              <span>
                <RiArrowRightCircleLine className="size-6" />
              </span>
            </div>
          </Link>
          {isLoading ? (
            <div className="sm:w-[36rem] mx-5 sm:mx-auto mt-14 lg:w-[47rem]">
              <Skeleton className="w-14 h-5 mb-14" />
              <Skeleton className="w-44 h-10 mx-auto mb-7 " />
              <div className=" w-full  grid grid-cols-2 gap-3 md:grid-cols-3">
                {skeleton.map((_, i) => (
                  <div key={i} className="bg-white pb-4 flex flex-col gap-5">
                    <Skeleton className="w-full h-48 sm:h-52" />
                    <div className="flex gap-5 justify-between px-1">
                      <Skeleton className="w-36 sm:w-40 h-5 " />
                      <Skeleton className="w-12 h-5 " />
                    </div>
                    <div className="px-1">
                      <Skeleton className="w-full h-10 " />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            data.length > 0 && (
              <div className="sm:w-[36rem]  relative mx-5 sm:mx-auto mt-14 lg:w-[47rem]">
                <p className="absolute  font-medium  -top-6 left-0 text-gray-600 text-sm ">
                  Edit Account:
                </p>
                {categories.map((v, index) => (
                  <div key={index}>
                    <h1 className="text-xl text-center pb-3 pt-10 font-medium">
                      {v.menu}
                    </h1>
                    <div className=" w-full  grid grid-cols-2 gap-3 md:grid-cols-3">
                      {data
                        .filter((a) => a.category === v._id)
                        .map((x) => (
                          <div
                            key={x._id}
                            className="pb-3 bg-white flex-col relative justify-center  flex items-center gap-2"
                          >
                            <div className=" bg-gray-100 border-none w-full  relative h-48 sm:h-52 mb-1">
                              <Image
                                src={x.img}
                                fill
                                alt={x.accountName}
                                sizes="(min-width: 808px) 50vw, 100vw"
                                priority
                              />
                            </div>
                            <div className="w-full flex justify-between items-center px-2">
                              <p className="tracking-wide font-medium  px-2 break-words text-sm sm:text-base line-clamp-1">
                                {x.accountName}
                              </p>
                              <span className="text-gray-500 tracking-wide text-sm">
                                ${x.basePrice}
                              </span>
                            </div>
                            <div className="w-full p-2">
                              <Link href={`/admin/accountPanel/${x._id}`}>
                                <button className="bg-black w-full tracking-wider py-2 rounded-md text-white font-medium text-xs sm:text-sm">
                                  Update Account
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </section>
      </div>

      <div className="border-t lg:max-w-[1085px] lg:mx-auto px-5  text-xs flex lg:flex-row flex-col items-center  underline gap-7 py-8  w-full  border-gray-300 mt-14">
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
    </main>
  );
}
