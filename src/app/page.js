"use client"
import Image from "next/image";
import MainImg from "./component/mainImg";
import WhatsNew from "./component/verifiedAcc";
import ShowOption from "./component/showOption";
import Addtocart from "./component/addtocart";
import AddtoWishlist from "./component/addtoWishlist";
import { useEffect, useState } from "react";
import Link from "next/link"; 
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
const [eachData,setEachData] = useState([])
const [images,setImages] = useState([])
const [dyImg, setDyImg] = useState([]);

useEffect(()=>{
  fetch("/api/home")
    .then((res) => res.json())
    .then((data) => setEachData(data));

  fetch("/api/homeImages")
    .then((res) => res.json())
    .then((img) => setImages(img));
  fetchImages();

    
},[])

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/homeMainImges");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const imgData = await res.json();

      // Extract just the URLs from the objects
      const imageUrls = imgData.map((item) => item.image); // Assuming 'image' is the property with the URL
      setDyImg(imageUrls); // Set the images state once
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const skeleton = Array.from({length:6})
  return (
    <main className="pb-10">
      <ShowOption />
      <MainImg DynamicImg={dyImg} />
      <WhatsNew images={images} />

      <div className="lg:container grid grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-3 hide-scrollbar overflow-x-auto mx-auto px-3 lg:px-0 xl:px-1  mt-5">
        {eachData?.length > 0
          ? eachData.map((v) => (
              <div
                key={v._id}
                className="hover:shadow-lg   w-auto mt-2 flex flex-col"
              >
                <Link href={`/account/${v._id}`}>
                  <div className="w-full md:block hidden h-64 lg:h-72 xl:h-96 2xl:h-[27rem] bg-gray-100 relative">
                    <Image
                      src={v.img}
                      fill
                      sizes="100vw"
                      alt={v.accountName}
                      quality={100}
                      priority
                    />
                  </div>
                  <Image
                    src={v.img}
                    width={900}
                    height={900}
                    alt={v.accountName}
                    quality={100}
                    className="md:hidden bg-gray-100"
                    priority
                  />
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
            ))
          : skeleton.map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="w-full h-48 sm:h-64 lg:h-72 xl:h-96" />
                <div className="flex justify-between items-center">
                  <div className="flex flex-col w-full flex-grow gap-1">
                    <Skeleton className="w-[80%] sm:w-52 h-5 " />
                    <Skeleton className="w-[60%] sm:w-36 h-5" />
                    <Skeleton className="w-[40%] sm:w-20 h-5 " />
                  </div>
                  <Skeleton className="w-12 sm:w-16 md:h-7 h-10 " />
                </div>
              </div>
            ))}
      </div>
      <div className="mt-14">
        <h1 className="text-2xl sm:text-4xl font-semibold text-center ">
          Trusted and and verified Exchanges & payment Gateways{" "}
        </h1>
        <div className="relative  overflow-x-hidden mt-5 flex flex-col sm:flex-row gap-3 px-0.5">
          <div>
            <Image
              src="/img3.webp"
              width={900}
              quality={100}
              height={900}
              sizes="auto"
              priority
              alt="trust of account smm"
            />
          </div>
          <div>
            <Image
              src="/img4.webp"
              width={900}
              height={900}
              quality={100}
              sizes="auto"
              priority
              alt="trust of account smm"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 px-4 sm:pl-8">
        <h2 className=" text-center text-4xl font-semibold">
          30-Day Return and Replace Warranty at AccountsSMM 🛡
        </h2>
        <h2 className="text-xl font-semibold mt-8">
          Risks of Buying Verified Accounts
        </h2>
        <p className=" pt-1 text-sm font-light">
          Violation of Terms of Service: Most online platforms explicitly
          prohibit buying, selling, or transferring accounts. Engaging in these
          activities can result in account suspension or banning. Legal Issues:
          Purchasing accounts can lead to legal repercussions. If the original
          account holder files a complaint, you could face legal action for
          fraud or identity theft. Loss of Funds: If you buy an account and it
          gets banned, you may lose any funds or assets associated with it.
          Recovery options are usually limited or nonexistent. Security Risks:
          Accounts purchased from unofficial sources may be compromised or
          previously used for fraudulent activities. This could expose your
          personal or financial information to risks. Lack of Support: If you
          encounter issues with a purchased account, you typically won’t receive
          support from the platform, making it hard to resolve problems.
        </p>

        <h2 className="font-semibold  text-xl mt-3">Legitimate Alternatives</h2>
        <div>
          <p className="pt-1 font-light text-sm">
            A warranty for social media management (SMM) accounts refers to the
            assurances provided by the seller or service provider regarding the
            account's functionality, security, and compliance with platform
            policies. This warranty typically includes guarantees about the
            account's integrity, confirming that it is legitimate and has not
            been previously banned or flagged. Security guarantees are also a
            crucial aspect, ensuring protection against unauthorized access and
            potential data breaches. Additionally, the warranty usually verifies
            that the account complies with the terms of service of the
            respective social media platforms. There are different types of
            warranties. A limited warranty may cover specific issues for a
            defined period, such as restoring the account if it gets banned
            within a certain timeframe. In contrast, a full warranty offers
            broader protection, covering various account-related issues over a
            longer duration. The claims process often requires documentation,
            such as proof of issues, including screenshots or communication with
            platform support. There is typically an expected timeframe for the
            provider to respond to these claims. However, warranties often have
            exclusions. For instance, they might not cover actions taken against
            the account due to user violations of platform policies or changes
            in those policies that affect the account's status. Understanding
            these warranty details is vital for businesses investing in SMM
            accounts, as they provide a level of protection and peace of mind.
            It’s always important to review the specific terms provided by the
            seller or service provider before making a purchase.
          </p>
        </div>
      </div>
      <div className="relative mt-9 p-3">
        <h1 className="text-center text-3xl font-medium">@AccountsSMM</h1>
        <Image
          src="/greenImg.webp"
          width={150}
          height={150}
          alt="@accountSMM"
          className="w-full h-auto"
          sizes="100vw"
          priority
        />
        <p className="ml-3 sm:ml-8 text-sm font-light">
          A referral program for social media management (SMM) accounts is
          designed to leverage the satisfaction and network of existing users to
          attract new customers. The program encourages current users to share
          their positive experiences with the service by providing them with
          unique referral links or codes. When a new user signs up using one of
          these links and completes a purchase, the referring user earns
          incentives as a reward.
          <br />
          <br /> Incentives can vary widely but typically include monetary
          rewards, such as a cash bonus for each successful referral.
          Alternatively, users might receive account credits that can be applied
          to future services or subscriptions, or even access to exclusive
          features and tools for a limited period, enhancing their overall
          experience with the platform.
          <br />
          <br /> To participate in the referral program, existing users usually
          need to sign up and agree to the terms, which outline how rewards are
          earned and any restrictions that may apply, such as prohibiting
          self-referrals. The program includes a tracking system that accurately
          monitors which new users sign up through referral links, ensuring that
          rewards are correctly assigned. Promotion of the referral program is
          often encouraged through various channels, including social media,
          email, and word of mouth. This not only helps existing users feel
          engaged but also creates a sense of community around the service. Some
          referral programs may have time-limited promotions to create urgency,
          encouraging users to act quickly and refer new customers. Overall, a
          well-structured referral program can significantly boost the growth of
          an SMM account service, benefiting both the company and its users by
          fostering loyalty, enhancing customer engagement, and driving new
          business.
        </p>
      </div>
    </main>
  );
}
