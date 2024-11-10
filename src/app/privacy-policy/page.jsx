"use client"
import React from 'react'
import { useState } from 'react';

export default function PrivacyPolicy() {
      const [ques1, setQues1] = useState(false);
      const [ques2, setQues2] = useState(false);
      const [ques3, setQues3] = useState(false);
      const [ques4, setQues4] = useState(false);
      const [ques5, setQues5] = useState(false);
      const [ques6, setQues6] = useState(false);
  return (
    <main className="max-w-[800px] pb-28 mx-auto">
      <div className="mt-8">
        <h1 className="text-center text-2xl font-medium">PRIVACY POLICY</h1>
        <p className="px-5 sm:px-14 lg:px-0.5 font-light text-sm text-balance mt-9 text-start">
          At AccountsMM, we prioritize your privacy and are committed to
          protecting your personal information. We collect necessary details to
          process your orders and enhance your experience on our platform. Your
          data is never sold or shared with third parties without your explicit
          consent, except as required by law. Payment information is securely
          processed through trusted payment gateways and is not stored on our
          servers. We implement industry-standard security measures to safeguard
          your information from unauthorized access. By using our website, you
          consent to this privacy policy and its terms. We encourage you to
          review this policy regularly for any updates.
        </p>
      </div>

      <div className="flex flex-col mt-8 gap-1 ">
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues1(!ques1)}
            className={`${
              ques1 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-200 FaqQuestion hover:text-white `}
          >
            <h2 className="flex justify-between items-center">
              Privacy Poloicy Info
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
              ques1 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm">
              This policy covers how we use your personal information. We take
              your privacy seriously and will take all measures to protect your
              personal information. Any personal information received will only
              be used to fulfill your order, and may be used for internal
              analytical purposes. We will not sell or redistribute your
              information to anyone.
            </p>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues2(!ques2)}
            className={`${
              ques2 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Password and Security
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
              ques2 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm">
              You are responsible for maintaining the confidentiality of your
              password and account and any activities that occur under your
              account. We shall not be liable to any person for any loss or
              damage which may arise as a result of any failure by you to
              protect your password or account.
            </p>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues3(!ques3)}
            className={`${
              ques3 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Damage to your computer
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
              ques3 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm">
              We have made and continue to make every effort to ensure that this
              website is free from viruses or defects. However, we cannot
              guarantee that your use of this website or any websites accessible
              through it won't cause damage to your computer. It is your own
              responsibility to ensure that the right equipment is available to
              use the website and screen out anything that may damage it. We
              shall not be liable to any person for any loss or damage which may
              arise to computer equipment as a result of using this website.
            </p>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues4(!ques4)}
            className={`${
              ques4 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Consent
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
              ques4 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm">
              By using our website you hereby consent to our privacy policy and
              agree to the terms and conditions set out herein.
            </p>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues5(!ques5)}
            className={`${
              ques5 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Intellectual Property
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
              ques5 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm">
              All content on the AccountsMM website, including text, images,
              logos, and product listings, is the intellectual property of
              AccountsMM and is protected by applicable copyright and trademark
              laws. Unauthorized use, reproduction, or distribution of any
              material from our site is strictly prohibited. You may not copy,
              modify, or use any part of our content without prior written
              permission. Any misuse of our intellectual property may result in
              legal action. By using our site, you agree to respect our
              intellectual property rights.
            </p>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues6(!ques6)}
            className={`${
              ques6 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Use
              <span
                className={`${
                  ques6 ? "rotate-45" : ""
                } duration-300 transition-all ease-in-out`}
              >
                +
              </span>
            </h2>
          </div>
          <div
            className={`duration-200 transition-all ease-in-out px-6 ${
              ques6 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm">
              This website may not be used in any manner that could damage,
              disable, overburden, or impair the site or its products.
              Unauthorized access, hacking, or interfering with the
              functionality of the site is strictly prohibited. Any misuse of
              the website will result in account suspension and possible legal
              action.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
