import React from "react";
import Image from "next/image";
import Addtocart from "@/app/component/addtocart";
import ShowOption from "@/app/component/showOption";
import AddtoWishlist from "@/app/component/addtoWishlist";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { GoAlertFill } from "react-icons/go";
import Pagination from "../component/pagination";
// import GraterThanTotalPage from "../component/graterThanTotalPage";
export const metadata = {
  title: "Search",
};


export const getSearch = async (queryParam,page) => {
  // Fetch data from  API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/search?query=`+queryParam+"&pageno="+page,
    {
      cache: "no-store",
    }
  );
  const repo = await res.json();
  // Pass data to the page via props

  return repo;
};


 async function Search({ searchParams }) {
   const queryParam = searchParams.query // Access the 'qury' query parameter
   let page = parseInt(searchParams.pageno);
   let getData = await getSearch(queryParam,page);
    page = !page || page < 1 ? 1 : page;
    const totalPages =  getData.totalPages ;
    const prePage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    // const back = page - 1;
    // const front = page + 1;
    // const currentPageno = page;
    // const condition = page > totalPages
   return (
       <main>
         <div className="pb-32">
           <div className="mt-8 break-words px-7">
             <h1 className="text-center text-3xl font-medium ">
               {getData?.totalPosts} search Results for:{" "}
               {JSON.stringify(searchParams.query)}
             </h1>
           </div>
           {!getData.success && (
             <div className="flex gap-12  px-7 flex-col justify-center items-center my-52">
               <div>
                 <GoSearch className="size-20" />
               </div>
               <div className="w-full  border border-[#e0b252] px-14 py-4 flex items-center gap-3">
                 <span>
                   <GoAlertFill className="text-[#e0b252] size-5" />
                 </span>
                 <p className="text-sm text-[#e0b252] tracking-wider">
                   No products were found matching your selection.
                 </p>
               </div>
             </div>
           )}

           {getData.success && (
             <div className="lg:container grid grid-cols-2 md:grid-cols-3 md lg:grid-cols-4 gap-3 hide-scrollbar overflow-x-auto mx-auto px-3 lg:px-0  xl:px-2 mt-5">
               {getData?.results?.length > 0 &&
                 getData.results.map((v) => (
                   <div
                     key={v._id}
                     className="hover:shadow-lg   w-auto mt-2 flex flex-col"
                   >
                     <Link href={`/account/${v._id}`}>
                       <div className="w-full bg-gray-100 relative">
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
                         <p className="text-gray-600 text-xs sm:text-sm">
                           ${v.basePrice}
                         </p>
                       </div>
                       <Addtocart account={v} />
                     </div>
                   </div>
                 ))}
             </div>
           )}
           <ShowOption />
           {getData.success && (
             <Pagination
               page={page}
               totalPages={totalPages}
               nextPage={nextPage}
               prePage={prePage}
               queryParam={queryParam}
               totalPosts={getData.totalPosts}
               totalView={getData.results?.length}
             />
           )}
         </div>
       </main>
   );
 }

export default Search;
