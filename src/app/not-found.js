import React from 'react'
import Link from 'next/link';

export default function NotFound() {
  return (
    <mian className="min-w-screen min-h-screen  flex justify-center items-center">
      <div className="w-full h-full flex flex-col sm:items-center gap-4">
        <h1 className="text-8xl font-bold text-center tracking-widest">404</h1>
        <p className="text-lg font-medium px-5 br text-center tracking-wider">
          SORRY! PAGE YOU ARE LOOKING FOR CAN'T BE FOUND.
        </p>
        <p className="text-base font-light tracking-widest text-center">
          Go back to the{" "}
          <Link href="/">
            <span className="underline underline-offset-[7px] hover:bg-black py-1 hover:text-white px-1.5 font-semibold decoration-black text-gray-500">
              homepage
            </span>
          </Link>
        </p>
      </div>
    </mian>
  );
}
