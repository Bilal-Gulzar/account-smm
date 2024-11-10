"use client"
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useAppContext } from "@/app/contextApi/Accoutsmm";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import Animation from "./animation";
import { useRouter } from "next/navigation";


export default function SearchBar() {
  const router = useRouter()
  const { search, setSearch } = useAppContext();
  const [fiveData,setFiveData] = useState([]) 
  const [query,setQuery] = useState('')
  const [result,setResult] = useState([])
  const [animate,setAnimate] = useState(false)
  useEffect(()=>{
  
fetch('/api/Accounts').then((res)=>res.json()).then((data)=>{
  if(data?.length > 0){
  setFiveData(data?.splice(-5))

  }
})

},[])


const handleSearch =()=>{
setAnimate(true)
fetch("/api/search?query=" + query)
.then((res) => res.json())
.then((data) =>{
  setTimeout(() => {
    setAnimate(false);
  }, 500);
  if(data.success){
  setResult(data?.results?.splice(0, 5))
}else{
  
  setResult([])

}
}).catch((e)=>console.log(e))

}

useEffect(()=>{

handleSearch()

},[query])


 const navigateToSearchPage = (value) =>{

router.push(`/search?query=`+value)
setSearch(false)
setQuery('')
}

  return (
    <section className={`${search ? "fixed bg-black/80 inset-0" : ""}`}>
      <div
        className={`min-h-screen sm:ml-0  ml-12 max-w-[900px] z-50 sm:w-80 fixed right-0 top-0 bg-white ${
          search ? "" : "translate-x-full"
        } transition-all duration-500`}
      >
        <div className="bg-black items-center flex justify-between py-3 px-4 text-white text-lg">
          <p>SEARCH OUR SITE</p>
          <span
            onClick={() => setSearch(false)}
            className="cursor-pointer hover:rotate-180 transition-all delay-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.07797 6.07797C6.22442 5.93153 6.46186 5.93153 6.6083 6.07797L12 11.4697L17.3917 6.07797C17.5381 5.93153 17.7756 5.93153 17.922 6.07797C18.0685 6.22442 18.0685 6.46186 17.922 6.6083L12.5303 12L17.922 17.3917C18.0685 17.5381 18.0685 17.7756 17.922 17.922C17.7756 18.0685 17.5381 18.0685 17.3917 17.922L12 12.5303L6.6083 17.922C6.46186 18.0685 6.22442 18.0685 6.07797 17.922C5.93153 17.7756 5.93153 17.5381 6.07797 17.3917L11.4697 12L6.07797 6.6083C5.93153 6.46186 5.93153 6.22442 6.07797 6.07797Z"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </span>
        </div>
        <div className="w-[90%] mx-auto mt-5 relative">
          <IoIosSearch
            onClick={() => navigateToSearchPage(query)}
            className=" cursor-pointer size-[22px] absolute right-4 top-2"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="border rounded-full py-[8px] border-gray-500 w-full pl-4 pr-12 text-sm font-light outline-none"
          />
        </div>
        <div className="font-light text-sm pr-3 pl-8 mt-3">
          <p className="font-normal font-sans">Quick search:</p>
          <p>Find your account quickly with our streamlined search feature!</p>
        </div>
        <div className="py-2 px-5 mt-9 border shadow-md  border-l-0 font-medium border-t-black border-b-black">
          search result
          <span className="hidden">need some verified account</span>
        </div>
        {result?.length > 0 && query !== "" && (
          <div className="pl-5 overflow-y-auto h-screen  hide-scrollbar pb-[17.5rem]">
            {result.map((v) => (
              <div key={v._id} className="mt-3  gap-3 flex">
                <Link href={`/account/${v._id}`}>
                  <div
                    onClick={() => setSearch(false)}
                    className="relative min-w-20 h-24 bg-gray-100"
                  >
                    <Image src={v.img} alt={v.accountName} fill sizes="100vw" />
                  </div>
                </Link>
                <div className="text-sm flex flex-col gap-0.5 break-all pr-4">
                  <p className="text-black">{v.accountName}</p>
                  <p className=" text-gray-500">${v.basePrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {query !== "" && result?.length === 0 && !animate && (
          <div className="px-4 mt-3">
            <p className="text-sm font-light">
              No accounts were found matching your search criteria.
            </p>
          </div>
        )}
        {animate && (
          <div>
            <Animation />
            <Animation />
            <Animation />
            <Animation />
          </div>
        )}
        <div className="pl-5 overflow-y-auto h-screen  hide-scrollbar pb-[17.5rem]">
          {fiveData?.length > 0 &&
            query === "" &&
            fiveData.map((v, index) => (
              <div key={index} className="mt-3  gap-3 flex">
                <Link href={`/account/${v._id}`}>
                  <div
                    onClick={() => setSearch(false)}
                    className="relative min-w-20 h-24 bg-gray-100"
                  >
                    <Image src={v.img} alt={v.accountName} fill sizes="100vw" />
                  </div>
                </Link>
                <div className="text-sm flex flex-col gap-0.5 break-all pr-4">
                  <p className="text-black">{v.accountName}</p>
                  <p className=" text-gray-500">${v.basePrice}</p>
                </div>
              </div>
            ))}
          {fiveData?.length > 0 && query == "" && (
            <Link href={`/account/bankAccount`}>
              <div
                onClick={() => setSearch(false)}
                className="shadow-md flex mt-5 pl-5 gap-2 w-[90%] sm:w-[270px] border-t border-black py-3 items-center  relative text-sm font-medium"
              >
                <p>View All</p>
                <span>
                  <GoArrowRight className="size-5" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
