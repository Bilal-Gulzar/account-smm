import React from 'react'
import { ImFilesEmpty } from "react-icons/im";

export default function OutOfStock() {
  return (
    <section className="gap-3 flex-col flex items-center my-40">
        <div>
          <ImFilesEmpty className="text-[#d7d7d7] size-48" />
        </div>
        <h2 className="text-3xl font-medium">Out of Stock.</h2>
        <div className="flex flex-col gap-1 items-center sm:px-0 px-5 ">
          <p className="text-gray-500 text-sm text-center">
            "Oops! It looks like we're out of stock on Account SMM. Please check
            back soon!"
          </p>
          <p className="text-gray-500 text-sm text-center">
            In the meantime, feel free to explore our other services. You will
            find a lot of interesting products on our "Shop" page.
          </p>
        </div>
    </section>
  );
}
