"use client"
import React from 'react'
import Link from 'next/link';
import { useState } from 'react';

export default function FAQs() {
    const [ques1,setQues1] = useState(false)
    const [ques2,setQues2] = useState(false)
    const [ques3,setQues3] = useState(false)
    const [ques4,setQues4] = useState(false)
    const [ques5,setQues5] = useState(false)
  return (
    <main className="min-w-full py-12 pb-28 ">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-center font-semibold text-3xl ">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col mt-10 gap-1 ">
          <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-16 mx-8">
            <div
              onClick={() => setQues1(!ques1)}
              className={`${
                ques1 ? "bg-[#cccccc]" : ""
              } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-200 FaqQuestion hover:text-white `}
            >
              <h2 className='flex justify-between items-center'>
                1. What payment methods do we accept?{" "}
                <span
                  className={`${
                    ques1 ? "rotate-45" : ""
                  } duration-300 transition-all ease-in-out`}
                >
                  +
                </span>
              </h2>
            </div>
            <div
              className={`duration-200 transition-all ease-in-out px-6 ${
                ques1 ? "max-h-[150px] mb-3" : "max-h-0 "
              } overflow-hidden `}
            >
              <p className="font-light text-sm">
                Our clients can make the payment either through their
                debit/credit card.
              </p>
            </div>
          </div>
          <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-16 mx-8">
            <div
              onClick={() => setQues2(!ques2)}
              className={`${
                ques2 ? "bg-[#cccccc]" : ""
              } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer FaqQuestion hover:text-white`}
            >
              <h2 className='flex justify-between items-center'>
                2. How will I know if my order is comfirmed?
                <span
                  className={`${
                    ques2 ? "rotate-45" : ""
                  } duration-200 transition-all ease-in-out`}
                >
                  +
                </span>
              </h2>
            </div>
            <div
              className={`duration-200 transition-all ease-in-out px-6 ${
                ques2 ? "max-h-[150px] mb-3" : "max-h-0 "
              } overflow-hidden `}
            >
              <p className="font-light text-sm">
                After the order is placed on our website, our customers will be
                receiving a confirmation SMS/Email or a call from our respective
                team, along with their order details and order number.
              </p>
            </div>
          </div>
          <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-16 mx-8">
            <div
              onClick={() => setQues3(!ques3)}
              className={`${
                ques3 ? "bg-[#cccccc]" : ""
              } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
            >
              <h2 className='flex justify-between items-center'>
                3. Is my payment information secure? 
                <span
                  className={` ${
                    ques3 ? "rotate-45" : ""
                  } duration-300 transition-all ease-in-out`}
                >
                  +
                </span>
              </h2>
            </div>
            <div
              className={`duration-200 transition-all ease-in-out px-6 ${
                ques3 ? "max-h-[150px] mb-3" : "max-h-0 "
              } overflow-hidden `}
            >
              <p className="font-light text-sm">
                All payments are carried out through a payment secure gateway.
              </p>
            </div>
          </div>
          <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-16 mx-8">
            <div
              onClick={() => setQues4(!ques4)}
              className={`${
                ques4 ? "bg-[#cccccc]" : ""
              } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
            >
              <h2 className='flex justify-between items-center'>
                4. How can I can my order?
                <span
                  className={`${
                    ques4 ? "rotate-45" : ""
                  } duration-300 transition-all ease-in-out`}
                >
                  +
                </span>
              </h2>
            </div>
            <div
              className={`duration-200 transition-all ease-in-out px-6 ${
                ques4 ? "max-h-[150px] mb-3" : "max-h-0 "
              } overflow-hidden `}
            >
              <p className="font-light text-sm">
                You may reach out to our team on call, whatsapp, or any of our
                official social media channels to cancel your order. Please note
                that the order can only be cancelled if it is not processed by
                our team.
              </p>
            </div>
          </div>
          <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-16 mx-8">
            <div
              onClick={() => setQues5(!ques5)}
              className={`${
                ques5 ? "bg-[#cccccc]" : ""
              } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
            >
              <h2 className='flex justify-between items-center'>
                5.What is your exchange/return policy?
                <span
                  className={`${
                    ques5 ? "rotate-45" : ""
                  } duration-300 transition-all ease-in-out`}
                >
                  +
                </span>
              </h2>
            </div>
            <div
              className={`duration-200 transition-all ease-in-out px-6 ${
                ques5 ? "max-h-[150px] mb-3" : "max-h-0 "
              } overflow-hidden `}
            >
              <p className="font-light text-sm">
                For more information, please&nbsp; <Link className='text-gray-500' href="/exchange&return">click here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
