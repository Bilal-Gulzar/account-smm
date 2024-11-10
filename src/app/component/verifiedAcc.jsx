import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function WhatsNew({images}) {
  const skeleton = Array.from({length:6})
  return (
    <div className="w-full lg:flex lg:justify-center lg:px-12 lg:mx-auto pb-3 mt-8  ">
      <div className="flex px-2  pl-5 gap-5 xl:gap-8 overflow-x-auto  hide-scrollbar items-center">
        <h1 className="text-4xl font-semibold  lg:-ml-4">
          Verfied <br />
          Account
        </h1>
        {images.length > 0
          ? images.map((v) => (
              <div key={v._id} className="flex flex-col items-center">
                <p className="line-clamp-1 order-2 mt-1 text-center tex-xs">
                  {v.name}
                </p>
                <Link href={`/account/${v.category}`}>
                  <div className="relative w-32 h-32 bg-gray-100 rounded-full order-1">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      size="100vw"
                      className="rounded-full"
                      priority
                    />
                  </div>
                </Link>
              </div>
            ))
          : skeleton.map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className=" w-32 h-32 rounded-full" />
                <Skeleton className=" w-20 mx-auto h-5" />
              </div>
            ))}
      </div>
    </div>
  );
}
