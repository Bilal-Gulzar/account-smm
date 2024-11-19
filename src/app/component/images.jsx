import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Addtocart from './addtocart';
import AddtoWishlist from './addtoWishlist';

export default function Images({ relatedProduct }) {
  return (
    <section>
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProduct?.length > 0 &&
          relatedProduct.map((v) => (
            <div key={v._id}>
              <div className="hover:shadow-lg w-auto mt-2 flex flex-col">
                <Link href={`/account/${v._id}`}>
                  <div className="relative h-48 sm:h-64 2xl:h-[300px] bg-gray-100">
                    {v.img && (
                      <Image
                        src={v.img}
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        alt={v.accountName}
                        priority
                      />
                    )}
                  </div>
                </Link>
                <div className="mt-3 ml-2 flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <p className="line-clamp-1 pr-3 sm:pr-0 text-xs sm:text-sm">
                      {v.accountName}
                    </p>
                    <AddtoWishlist item={v} />
                    <p className="text-gray-600 text-xs sm:text-sm">
                      ${v.basePrice}
                    </p>
                  </div>
                  <Addtocart account={v} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );

}
