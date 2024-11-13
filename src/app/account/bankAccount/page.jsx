import React from 'react'
import Image from 'next/image';
import Addtocart from '@/app/component/addtocart';
import ShowOption from '@/app/component/showOption';
import AddtoWishlist from '@/app/component/addtoWishlist';
import Link from 'next/link';
import Pagination from '@/app/component/pagination';
import OutOfStock from '@/app/component/outOfStock';
import GraterThanTotalPage from '@/app/component/graterThanTotalPage';


export const  metadata = {
 title:"Bank Account"
}

export const getBankAccount = async (page) => {
  // Fetch data from  API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/accountpage?id=66fb0753f11f7725e9b49359&pageno=${page}`,
    {
      cache: "no-store",
    }
  );
  const repo = await res.json();
  // Pass data to the page via props
  
  return repo;

};

export default async function BankAccount({ searchParams }) {
  let page = parseInt(searchParams.pageno);
  page = !page || page < 1 ? 1 : page;
  const getData = await getBankAccount(page);
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
              <div className="max-w-[600px] sm:mx-auto gap-3 flex  mx-10 flex-col justify-center items-center">
                <h1 className="font-medium text-center text-xl sm:text-2xl">
                  Elevate Your Strategy with Authentic Accounts
                </h1>
                <p className="font-light text-sm text-start ">
                  Discover our exclusive range of verified bank accounts
                  designed for your social media marketing needs. Each account
                  is carefully vetted for authenticity, ensuring reliability for
                  all your transactions. Our platform offers a variety of
                  options tailored to different budgets and requirements, making
                  it easy to find the perfect fit. With secure payment
                  processing and dedicated customer support, you can shop with
                  confidence. Elevate your social media strategy today with our
                  trusted bank accounts!
                </p>
              </div>

              <div className="lg:container grid grid-cols-2 md:grid-cols-3 md lg:grid-cols-4 gap-3 hide-scrollbar overflow-x-auto mx-auto px-3 lg:px-0 xl:px-2  mt-5">
                {getData?.accounts.length > 0 &&
                  getData.accounts.map((v) => (
                    <div
                      key={v._id}
                      className="hover:shadow-lg   w-auto mt-2 flex flex-col"
                    >
                      <Link href={`/account/${v._id}`}>
                        <div className="w-full  h48  md:h64 2xl:h72 bg-gray-100 relative">
                          <Image
                            src={v.img}
                            width={900}
                            height={900}
                            alt={v.accountName}
                            quality={100}
                            priority
                          />
                        </div>
                      </Link>
                      <div className="mt-3 ml-2 flex items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                          <p className="line-clamp-1 pr-3 sm:pr-0 text-xs sm:text-sm">
                            {v.accountName}
                          </p>
                          <AddtoWishlist item={v} />
                          {/* <div className="flex text-xs sm:text-sm items-center justify-between relative">
                    <span className=" sm:flex hidden gap-1 items-center cursor-pointer">
                      Add whislist <FaRegHeart className="size-3" />
                      Add whislist
                      <BiSolidHeart className="size-4 text-[#cc0808]" />
                    </span>
                    <span className=" sm:hidden flex gap-1 items-center cursor-pointer">
                      <FaRegHeart className="size-3" />
                      Add Whistlist
                    </span>
                  </div> */}
                          <p className="text-gray-600 text-xs sm:text-sm">
                            ${v.basePrice}
                          </p>
                        </div>
                        {/* <div className="">
                  <button className="bg-black md:block hidden text-white font-medium  py-2 px-3 rounded-md text-xs">
                    ADD&nbsp;TO&nbsp;CART
                  </button>
                  <span className="md:hidden block bg-black  p-2 rounded-md ">
                    <CiShoppingCart className=" size-6 text-white" />
                  </span>
                </div> */}
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
