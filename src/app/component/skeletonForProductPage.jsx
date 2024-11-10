import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SkeletonForProductPage() {
  return (
      <div className="grid md:grid-cols-2  gap-5 lg:gap-0 xl:gap-7 lg:container lg:mx-auto">
        <div className="px-1 sm:px-3">
          <Skeleton className="w-full h-96 xl:h-full" />
        </div>
        <div className="">
          <Skeleton className="w-44 h-5 mb-1" />
          <Skeleton className="w-24 h-5 mb-5" />
          <Skeleton className="w-full  sm:w-72 h-5" />
          <div className="flex gap-5 mt-8 mb-5">
            <div className="flex gap-1">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
            <Skeleton className="w-28 h-9" />
            <Skeleton className="w-12 h-7" />
          </div>
          <Skeleton className="w-[80%] h-14 mb-5" />
          <Skeleton className="sm:w-72 w-full h-5 mb-7" />
          <Skeleton className="w-full h-12 mb-5 " />
          <div className="flex flex-col gap-2 ">
            <Skeleton className="w-[80%] h-5" />
            <Skeleton className="w-[60%] h-5" />
            <Skeleton className="w-[40%] h-5" />
            <Skeleton className="w-[20%] h-5" />

            <Skeleton className="w-full h-12 mt-5 " />
            <div className=" flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between  sm:px-10 mt-5">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full sm:w-36 h-8" />
                <Skeleton className="w-36 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full sm:w-36 h-8" />
                <Skeleton className="w-36 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
