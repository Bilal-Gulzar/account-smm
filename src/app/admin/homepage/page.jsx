"use client"
import React, { useEffect, useState } from 'react'
import Accountsetitngnavbar from '@/app/component/accountsetitngnavbar'
import Image from 'next/image';
import ImagesEditor from '@/app/component/imagesEditor';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from "next/navigation";
var jwt = require("jsonwebtoken");

function HomePage() {
  const router = useRouter();
 const [whatImg,setWhatImg] = useState([])
const [editProfile, setEditProfile] = useState(false);
const [dynamicImages, setDynamicImages] = useState([]);
const [data, setData] = useState('');
 const [profileMessage, setProfileMessage] = useState(false);
const [isloading, setIsloading] = useState(true);

useEffect(() => {
  Next_Auth();
 fetchData()
}, [])

const fetchData =()=>{
 fetch("/api/homeImages")
   .then((res) => res.json())
   .then((data) => {
     if (data && data.length > 0) {
       setWhatImg(data);
       setIsloading(false);
     } else {
       // Optionally, handle the case where no data is returned
       console.warn("No data received from the database.");
     }
   });
 fetch("/api/homeMainImges")
   .then((res) => res.json())
   .then((data) => {
     if (data && data.length > 0) {
       setDynamicImages(data);
       setIsloading(false);
     } else {
       // Optionally, handle the case where no data is returned
       console.warn("No data received from the database.");
     }

   });
}

function Next_Auth() {
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

const skeleton = Array.from({length:3})
  return (
    <main className="bg-[rgb(245,245,245)] min-h-[100vh] flex flex-col justify-between ">
      <div className="flex flex-col gap-12 pb-44">
        <Accountsetitngnavbar />
        {isloading ? (
          <div>
            <div className="mt-5 p-5 grid rounded w-[90vw] sm:max-w-[1050px] mx-auto bg-white pb-8 lg:mx-auto lg:px-14">
              <Skeleton className="w-[45%] sm:w-[30%] h-10" />
              {skeleton.map((_, i) => (
                <div key={i} className="mt-8 flex flex-col gap-5">
                  <div className="w-full gap-5 overflow-hidden mx-auto flex sm:flex-row flex-col justify-between items-center  rounded-lg ">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 p-5 grid rounded w-[90vw] sm:max-w-[1050px] mx-auto bg-white pb-8 lg:mx-auto lg:px-14">
              <Skeleton className="w-[45%] sm:w-[30%] h-10" />
              {skeleton.map((_, i) => (
                <div key={i} className="mt-8 flex flex-col gap-5">
                  <div className="w-full gap-5 overflow-hidden mx-auto flex sm:flex-row flex-col justify-between items-center  rounded-lg ">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <section className="mt-5 px-5 grid rounded w-[90vw] sm:max-w-[1050px] mx-auto bg-white pb-8 lg:mx-auto lg:px-14">
              <h1 className="text-2xl font-medium  mt-7">Dynamic Images</h1>
              <div className="mt-7 grid sm:grid-cols-2  gap-5 w-full ">
                {dynamicImages?.length > 0 &&
                  dynamicImages.map((v) => (
                    <div
                      key={v._id}
                      className="w-full gap-4 overflow-hidden  mx-auto flex justify-between items-center pl-4 rounded-lg border h-12  shadow-sm  bg-white sm:text-sm  sm:leading-6 outline-none"
                    >
                      <div className="line-clamp-1 flex-grow">
                        <p className="">{v.image}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="min-w-14 relative rounded min-h-full bg-gray-100">
                          <Image
                            src={v.image}
                            fill
                            className="rounded"
                            sizes="100vw"
                            alt='homePageImage'
                            priority
                          />
                        </div>
                        <button
                          onClick={() => {
                            setEditProfile(true), setData(v);
                          }}
                          className="bg-gray-100  border-gray-400 border text-gray-900 px-4 py-2.5 rounded-md font-sans font-bold  outline-none"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
            <section className="mt-5 px-5 grid rounded w-[90vw] sm:max-w-[1050px] mx-auto bg-white pb-8 lg:mx-auto lg:px-14">
              <h1 className="text-2xl font-medium mt-7">What's New Images</h1>
              <div className="mt-7 grid sm:grid-cols-2 gap-5 w-full">
                {whatImg?.length > 0 &&
                  whatImg.map((v) => (
                    <div
                      key={v._id}
                      className="w-full gap-4 overflow-hidden relate mx-auto flex justify-between items-center pl-4 rounded-lg border h-12  shadow-sm  bg-white sm:text-sm  sm:leading-6 outline-none"
                    >
                      <div className="line-clamp-1 flex-grow">
                        <p className="">{v.image}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="min-w-14 relative rounded min-h-full bg-gray-100">
                          <Image
                            src={v.image}
                            fill
                            className="rounded"
                            sizes="100vw"
                            alt={v.name}
                            priority
                          />
                        </div>
                        <button
                          onClick={() => {
                            setEditProfile(true), setData(v);
                          }}
                          className="bg-gray-100 border-gray-400 border text-gray-900 px-4 py-2.5 rounded-md font-sans font-bold outline-none"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}
        <div
          className={`${
            profileMessage ? "" : "translate-y-full"
          } z-40 w-screen fixed bottom-12 flex justify-center items-center`}
        >
          <span
            className={`bg-[#4c4c4c] ${
              profileMessage ? "" : "translate-y-full"
            } p-5 flex justify-between items-center rounded-md  text-white text-sm `}
          >
            Image updated &nbsp;x
          </span>
        </div>
        <ImagesEditor
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          data={data}
          profileMessage={profileMessage}
          setProfileMessage={setProfileMessage}
          fetchData={fetchData}
        />
      </div>

      <div className="border-t lg:container lg:mx-auto px-5  text-xs flex lg:flex-row flex-col items-center  underline gap-7 py-8 w-full  border-gray-300 mt-14">
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

export default HomePage