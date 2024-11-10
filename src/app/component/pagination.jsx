import React from 'react'
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Link from 'next/link';

function Pagination({ totalPages, page, nextPage, prePage,queryParam,totalPosts,totalView}) {
  // console.log(totalPages, page, nextPage, prePage,);
 let totalcounts = page - 1 > 0 ?   totalView + (page - 1 ) * 16  : 1 * totalView
 console.log(totalcounts)
  console.log(queryParam);
let pageNumber = []
const offset = 3
for(let i = page-offset; i <= page+offset; i++){
if(i >=1 && i <= totalPages){

pageNumber.push(i)
}
}
  return (
    <section className="flex flex-col text-sm gap-10 items-center mt-20">
      <div className="flex items-center  text-sm gap-2">
        {queryParam !== null ? (
          <Link href={`?query=${queryParam}&pageno=${prePage}`}>
            <button
              disabled={page == 1}
              className="flex disabled:cursor-not-allowed items-center cursor-pointer hover:bg-gray-100 py-1.5 px-3 rounded "
            >
              <span>
                <LuChevronLeft />
              </span>
              Previous
            </button>
          </Link>
        ) : (
          <Link href={`?pageno=${prePage}`}>
            <button
              disabled={page == 1}
              className="flex disabled:cursor-not-allowed items-center cursor-pointer hover:bg-gray-100 py-1.5 px-3 rounded "
            >
              <span>
                <LuChevronLeft />
              </span>
              Previous
            </button>
          </Link>
        )}
        {pageNumber.map((n) => (
          <div
            key={n}
            className={`cursor-pointer px-3 rounded ${
              n === page ? "bg-gray-100" : ""
            } py-1.5 hover:bg-gray-100`}
          >
            {queryParam !== null ? (
              <Link className='w-full ' href={`?query=${queryParam}&pageno=${n}`}>{n}</Link>
            ) : (
              <Link href={`?pageno=${n}`}>{n}</Link>
            )}
          </div>
        ))}
        {queryParam !== null ? (
          <Link href={`?query=${queryParam}&pageno=${nextPage}`}>
            <button
              disabled={nextPage > totalPages}
              className="disabled:cursor-not-allowed flex cursor-pointer text-sm hover:bg-gray-100 py-1.5 px-3 rounded items-center"
            >
              Next
              <span>
                <LuChevronRight />
              </span>
            </button>
          </Link>
        ) : (
          <Link href={`?pageno=${nextPage}`}>
            <button
              disabled={nextPage > totalPages}
              className="disabled:cursor-not-allowed flex cursor-pointer text-sm hover:bg-gray-100 py-1.5 px-3 rounded items-center"
            >
              Next
              <span>
                <LuChevronRight />
              </span>
            </button>
          </Link>
        )}
      </div>
      <div className="border-black border-b-4  pb-4">
        <p className="font-light text-base tracking-wide">
          You've viewed {totalcounts} of {totalPosts} products
        </p>
      </div>
      <div className=" text-base px-8 py-2.5 border-[1.5px] font-light tracking-wide border-black rounded-full  ">
        Page {page} of {totalPages}
      </div>
    </section>
  );
}

export default Pagination