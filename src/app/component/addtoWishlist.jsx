"use client"
import React from 'react'
import { BiSolidHeart } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useAppContext } from '../contextApi/Accoutsmm';
import Link from 'next/link';

function AddtoWishlist({item}) {
  const { addToWishlist, removeFromWishlist, wishlist } = useAppContext();

  const isInWishlist = wishlist.some((wishItem) => wishItem._id === item._id);
  
  const handleClick = () => {
    if (isInWishlist) {
        removeFromWishlist(item._id);
      } else {
        addToWishlist(item);
      }
    };

  return (
    <section>
      <div className="flex text-xs sm:text-sm items-center justify-between relative">
        <div className=" sm:flex hidden gap-1 items-center cursor-pointer">
          {isInWishlist ? (
            <Link href="/wishlist">
              <span className="flex items-center gap-1">
                Wishlisted <BiSolidHeart className="size-4 text-[#cc0808]" />
              </span>
            </Link>
          ) : (
            <button
              onClick={handleClick}
              className=" gap-1 flex items-center"
              type="button"
            >
              Add whislist <IoMdHeartEmpty className="size-4" />
            </button>
          )}
        </div>
        {/* <span className="sm:hidden flex gap-1 items-center cursor-pointer "> */}
        <div>
          {isInWishlist ? (
            <Link href="/wishlist">
              <span className="sm:hidden flex flex-wrap gap-1 pr-1 items-center cursor-pointer ">
                Wishlisted <BiSolidHeart className="size-4 text-[#cc0808]" />
              </span>
            </Link>
          ) : (
            <span  onClick={handleClick} className="sm:hidden flex gap-1 items-center cursor-pointer ">
              <IoMdHeartEmpty className="size-3" />
              Add Whistlist
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default AddtoWishlist