
import React from 'react'
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";

export  const metadata ={
title: "Service "

}

export const getServiceContent = async () => {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/servicePage`,
    {
      cache: "no-store",
    }
  );
  const repo = await res.json();
  // Pass data to the page via props
  return repo;
};





export default async function AccountService() {
const getData = await getServiceContent()
function createMarkup(c) {
  return { __html: c };
}
// console.log(getData) 
let skeleton = Array.from({length:4})

  return (
    <main className="2xl:container 2xl:mx-auto mb-28">
      {getData && getData?.length > 0  ?
         getData.map((v, index) => (
          <div key={index} className=" relative mt-9 p-3">
            <h1 className="text-center text-2xl sm:text-4xl font-medium">
              {v.heading}
            </h1>
            <div className="flex lg:flex-row lg:gap-0  gap-4 flex-col mt-8">
              <div className="lg:block hidden relative text-black min-w-80 max-w-96 min-h-64 max-h-96 bg-purple-100">
                <Image
                  src={v.img}
                  fill
                  className=" absolute bg-slate-100"
                  sizes="100vw"
                  alt={v.heading}
                  priority
                  quality={100}
                />
              </div>
              <Image
                src={v.img}
                width={150}
                height={150}
                className="lg:hidden w-full h-auto bg-gray-100"
                sizes="100vw"
                priority
                alt={v.heading}
                quality={100}
              />

              <p
                className="ml-3 sm:ml-8 text-sm font-light"
                dangerouslySetInnerHTML={createMarkup(v.content)}
              ></p>
            </div>
          </div>
        ))
       :
        skeleton.map((_,i)=>(
      <div key={i} className="px-5 gap-2 grid  md:gap-7 md:grid-cols-2 lg:grid-cols-[23%_auto] mt-14">
        <Skeleton className="  min-h-72 max-h-96 " />
        <div className='flex flex-col gap-5 mt-3 md:mt-10 w-full'>
          <Skeleton className="h-5 text-sm font-light" />
          <Skeleton className=" h-5 text-sm font-light" />
          <Skeleton className="h-5 text-sm font-light" />
          <Skeleton className="h-5 text-sm font-light" />
          <Skeleton className="h-5 text-sm font-light" />
          <Skeleton className="h-5 text-sm font-light" />
        </div>
      </div>
        ))}
    </main>
  );
}
