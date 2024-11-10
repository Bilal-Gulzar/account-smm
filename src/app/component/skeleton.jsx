import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonLoading() {
  const skeleton = Array.from({ length: 4 });
  return (
    <div className="lg:container grid grid-cols-2 md:grid-cols-3 gap-y-10 md lg:grid-cols-4 gap-3 mx-auto px-5 lg:px-0 mt-5">
      {skeleton.map((_, i) => (
        <div key={i} className="flex-col flex gap-4">
          <Skeleton className="w-full h-48  md:h-64 xl:h-80 2xl:h-96" />
          <Skeleton className="w-28 h-5" />
          <Skeleton className="w-full h-5 " />
          <Skeleton className="w-28 h-5 " />
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoading