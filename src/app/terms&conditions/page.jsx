"use client"
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

export default function Terms() {
 const [ques1, setQues1] = useState(false);
 const [ques2, setQues2] = useState(false);
 const [ques3, setQues3] = useState(false);
 const [ques4, setQues4] = useState(false);
 const [ques5, setQues5] = useState(false);
 const [ques6, setQues6] = useState(false);
 const [ques7, setQues7] = useState(false);
 const [ques8, setQues8] = useState(false);
 const [ques9, setQues9] = useState(false);
  return (
    <main className="max-w-[720px] pb-28 mx-auto">
      <div className="mt-8">
        <h1 className="text-center text-2xl font-medium">TERMS & CONDITIONS</h1>
        <p className="px-5 lg:px-0 font-light text-sm  mt-9 ">
          Welcome to AccountsMM! By accessing or purchasing from our website,
          you agree to the following terms and conditions. Please read them
          carefully before proceeding with any purchase of verified accounts.
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
              Acceptance of Terms
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
              By using our website and purchasing verified accounts, you agree
              to comply with these Terms & Conditions. If you do not agree to
              any part of these terms, please do not use our services.
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
              Account Purchase
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
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; Nature of Products:</span>{" "}
                The accounts available on AccountsMM are verified and created
                according to the information provided by you or generated for
                you.
              </li>
              <li className="font-light text-sm mt-2">
                <span className="font-medium">&bull; Eligibility: </span>By
                purchasing an account, you confirm that you are at least 18
                years old and are legally permitted to own and use the accounts
                you purchase.
              </li>
            </ul>
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
              Account Ownership & Usage
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
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; Responsibility:</span>{" "}
                Once an account is delivered to you, it is your responsibility
                to use it in compliance with the terms of the specific service
                provider (Payoneer, Amazon, Alibaba, etc.).
              </li>
              <li className="font-light text-sm mt-2">
                <span className="font-medium">
                  &bull; Prohibited Activities:{" "}
                </span>
                You agree not to misuse the accounts, engage in fraudulent
                activities, or violate the terms of service of the platforms for
                which the accounts are provided. AccountsMM is not responsible
                for any suspension or termination of accounts due to user
                actions.
              </li>
            </ul>
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
              Account Delivery
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
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; Delivery Time:</span>{" "}
                Account details will be delivered via email or through your user
                account dashboard within 24 to 48 hours after purchase
                confirmation.
              </li>
              <li className="font-light text-sm mt-2">
                <span className="font-medium">
                  &bull; Accuracy of Information:
                </span>
                &nbsp;Ensure that the email address and other contact details
                you provide are accurate. AccountsMM is not responsible for any
                miscommunication or non-delivery caused by incorrect details.
              </li>
            </ul>
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
              Refund & Exchange Policy
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
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; No Refunds:</span>
                &nbsp; Due to the nature of digital products, all sales are final
                and no refunds will be provided once an account is delivered.
                Please see our{" "}
                <Link
                  href="/exchange&return"
                  className="text-[#3b82f6] font-normal"
                >
                  Exchange & Return Policy{" "}
                </Link>{" "}
                for further details.
              </li>
              <li className="font-light text-sm mt-2">
                <span className="font-medium">&bull; Exchanges:</span> &nbsp;In
                case of incorrect or non-functional accounts, please follow our
                exchange policy as outlined on the website.
              </li>
            </ul>
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
              Limitation of Liability
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
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium">
                  {" "}
                  &bull; No Liability for Bans:
                </span>
                &nbsp;AccountsMM is not liable for accounts that are banned,
                suspended, or restricted by the respective platform due to
                violations of their terms or improper usage after delivery.
              </li>
              <li className="font-light text-sm mt-2">
                <span className="font-medium">
                  &bull; Service Interruption:
                </span>
                &nbsp;We do not guarantee that the website or its services will
                be error-free, secure, or uninterrupted. AccountsMM is not
                responsible for any interruptions or technical issues
                experienced by the user.
              </li>
            </ul>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues7(!ques7)}
            className={`${
              ques7 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              User Responsibilities
              <span
                className={`${
                  ques7 ? "rotate-45" : ""
                } duration-300 transition-all ease-in-out`}
              >
                +
              </span>
            </h2>
          </div>
          <div
            className={`duration-200 transition-all ease-in-out px-6 ${
              ques7 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium">
                  {" "}
                  &bull; Compliance with Platform Terms:
                </span>
                &nbsp;By purchasing accounts, you agree to follow the rules and
                policies set forth by the platforms associated with the account
                (e.g., Payoneer, Amazon, Alibaba).
              </li>
              <li className="font-light text-sm mt-2">
                <span className="font-medium">&bull; Account Information:</span>
                &nbsp;You agree not to resell, share, or distribute the accounts
                in a manner that violates the platform’s terms of use.
              </li>
            </ul>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues8(!ques8)}
            className={`${
              ques8 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Governing Law
              <span
                className={`${
                  ques8 ? "rotate-45" : ""
                } duration-300 transition-all ease-in-out`}
              >
                +
              </span>
            </h2>
          </div>
          <div
            className={`duration-200 transition-all ease-in-out px-6 ${
              ques8 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; Jurisdiction:</span>
                &nbsp;These Terms & Conditions are governed by the laws of [your
                country]. Any disputes arising from the use of our services will
                be resolved in the courts of [your country]
              </li>
            </ul>
          </div>
        </div>
        <div className="sm:mb-[5px] rounded mb-[4px] sm:mx-2 mx-6">
          <div
            onClick={() => setQues9(!ques9)}
            className={`${
              ques9 ? "bg-[#cccccc]" : ""
            } text-base py-2.5 relative font-light pl-5 sm:pt-3 p-2  hover:bg-[#cccccc] cursor-pointer duration-300 FaqQuestion hover:text-white`}
          >
            <h2 className="flex justify-between items-center">
              Contact Information
              <span
                className={`${
                  ques8 ? "rotate-45" : ""
                } duration-300 transition-all ease-in-out`}
              >
                +
              </span>
            </h2>
          </div>
          <div
            className={`duration-200 transition-all ease-in-out px-6 ${
              ques9 ? "max-h-[300px] mb-3" : "max-h-0 "
            } overflow-hidden `}
          >
            <p className="font-light text-sm mt-1">
              If you have any questions or concerns about these Terms &
              Conditions, please contact us:
            </p>
            <ul className="mt-2 px-3 lg:px-0 font-light text-sm">
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; Email:</span>{" "}
                <Link href="#" className="text-[#3b82f6] font-normal">
                  {" "}
                  support@accountsmm.com
                </Link>
              </li>
              <li className="text-sm font-light">
                <span className="font-medium"> &bull; Support Hours:</span>{" "}
                Monday - Friday, 9:00 AM to 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
