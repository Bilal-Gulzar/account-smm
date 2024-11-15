import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsArrowReturnLeft } from "react-icons/bs";
export default function ShowToAdmin({ setShowdiv }) {
  const path = usePathname();
  return (
    <section>
      <nav className="flex list-none flex-col text-sm text gap-2 py-5  ">
        <Link href="/admin/accountPanel">
          <li
            onClick={() => setShowdiv(false)}
            className={`hover:bg-[#f5f5f5] p-2.5 ${
              path.includes("/accountPanel") ? "underline" : "no-underline"
            }`}
          >
            AccountPanel
          </li>
        </Link>
        <Link href="/admin/user">
          <li
            onClick={() => setShowdiv(false)}
            className={`hover:bg-[#f5f5f5]  p-2.5  ${
              path.includes("/user") ? "underline" : "no-underline"
            }`}
          >
            users
          </li>
        </Link>
        <Link href="/admin/homepage">
          <li
            onClick={() => setShowdiv(false)}
            className={`hover:bg-[#f5f5f5]  p-2.5  ${
              path.includes("/homepage") ? "underline" : "no-underline"
            }`}
          >
            HomePage
          </li>
        </Link>
        <Link href="/orders">
          <li
            onClick={() => setShowdiv(false)}
            className="hover:bg-[#f5f5f5] flex items-center gap-1 p-2.5"
          >
            Dashboard
            <span>
              <BsArrowReturnLeft />
            </span>{" "}
          </li>
        </Link>
      </nav>
    </section>
  );
}
