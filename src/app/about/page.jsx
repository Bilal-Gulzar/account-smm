import React from 'react'
import Image from 'next/image';
export default function About() {
  return (
    <main className="pt-5 pb-40 overflow-hidden">
      <div className="bg-[#fbfbfb]">
        <h1 className="text-2xl py-9 md:py-0 text-center font-medium">About Us</h1>
      </div>
      <div className="pt-8 max-w-[770px] mx-5 sm:mx-auto  relative ">
        <Image  src="/Account.jpg" width={800} height={800} className='h-auto mx-auto' alt="accountsmm"/>
        {/* <h1 className="tracking-wider text-5xl sm:text-7xl lg:text-8xl text-center font-bold">
          ACCOUNT&nbsp;SMM
        </h1> */}
        <p className="px-5 sm:px-14 lg:px-0.5 font-light text-sm text-balance mt-9 text-center">
          AccountsMM is your go-to destination for purchasing fully verified
          accounts from major global platforms like Alibaba, Amazon, Payoneer,
          and many more. We are committed to offering secure, ready-to-use
          accounts that meet the diverse needs of businesses, entrepreneurs, and
          freelancers. Whether you're looking to expand your online presence or
          streamline international transactions, our verified accounts help you
          get started instantly and confidently. At AccountsMM, we prioritize
          security and authenticity, ensuring each account is 100% legitimate
          and reliable. Our straightforward buying process allows you to acquire
          accounts with ease, backed by exceptional customer support and timely
          delivery. We aim to empower businesses by providing the tools they
          need to succeed in a competitive digital landscape. Trust AccountsMM
          to be your partner in scaling your online operations with verified
          accounts from trusted platforms.
        </p>
        <div className='relative mt-10'>
            <Image src="/smm.png" width={220} height={220} className='mx-auto h-auto rounded-full' alt='accountsmm' />
        </div>
      </div>
    </main>
  );
}
