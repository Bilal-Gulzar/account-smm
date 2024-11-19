import React from "react";
import Image from "next/image";
import Addtocart from "@/app/component/addtocart";
import ShowOption from "@/app/component/showOption";
import AddtoWishlist from "@/app/component/addtoWishlist";
import Link from "next/link";
import OutOfStock from "@/app/component/outOfStock";
import Pagination from "@/app/component/pagination";
import GraterThanTotalPage from "@/app/component/graterThanTotalPage";


export const metadata = {
  title: "Payment Gateway",
};



export const getPaymentGateway = async (page) => {
  // Fetch data from  API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/accountpage?id=66fb0bac2f0dbf2aca5f46b4&pageno=${page}`,
    {
      cache: "no-store",
    }
  );
  const repo = await res.json();
  // Pass data to the page via props

  return repo;
};
export default async function PaymentGateway({ searchParams }) {
   let page = parseInt(searchParams.pageno);
   page = !page || page < 1 ? 1 : page;
  const getData = await getPaymentGateway(page);
 const totalPages = getData.totalPages;
 const prePage = page - 1 > 0 ? page - 1 : 1;
 const nextPage = page + 1;
 const condition = page > totalPages;

  return (
    <>
      {getData.totalPosts !== 0 ? (
        <main>
          {condition ? (
            <GraterThanTotalPage />
          ) : (
            <div className="mb-24 mt-4">
              <div className="max-w-[600px] sm:mx-auto gap-3 flex mx-10 flex-col justify-center items-center">
                <h1 className="font-medium text-center text-xl sm:text-2xl">
                  Simplify Your Payments with Verified Gateway Accounts
                </h1>
                <p className="font-light text-sm text-start ">
                  Unlock the potential of your business with verified payment
                  gateway accounts tailored for seamless transactions. Our
                  selection ensures security and reliability, allowing you to
                  accept payments with confidence. Each account is meticulously
                  verified to protect against fraud and ensure smooth
                  operations. Enhance your customer experience by offering a
                  variety of payment options that cater to your audience. With
                  our trusted service, you can focus on growing your business
                  without worrying about payment processing. Join us today and
                  elevate your transaction capabilities to the next level!
                </p>
              </div>

              <div className="lg:container grid grid-cols-2 md:grid-cols-3 md lg:grid-cols-4 gap-3 hide-scrollbar overflow-x-auto mx-auto px-3 lg:px-1  xl:px-2 mt-5">
                {getData?.accounts.length > 0 &&
                  getData.accounts.map((v) => (
                    <div
                      key={v._id}
                      className="hover:shadow-lg   w-auto mt-2 flex flex-col"
                    >
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
                  ))}
              </div>
              <ShowOption />
              <Pagination
                page={page}
                totalPages={totalPages}
                nextPage={nextPage}
                prePage={prePage}
                queryParam={null}
                totalPosts={getData.totalPosts}
                totalView={getData.accounts.length}
              />
            </div>
          )}
        </main>
      ) : (
        <OutOfStock />
      )}
    </>
  );
}
