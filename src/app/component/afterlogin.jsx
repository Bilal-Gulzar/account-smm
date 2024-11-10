import React from 'react'
import Link from 'next/link';


function Afterlogin({ istoken, setIstoken, Logout}) {
  return (
    <section
      onMouseLeave={() => setIstoken(false)}
      className={`${
        istoken ? "" : " hidden"
      } animate-slide-up shadow-top-md shadow-xl top-[23px] shadow-inner-top-sm  rounded z-50 absolute bg-white w-36 py-3 -right-4 `}
    >
      <div className="ml-5">
        <nav className=" list-none text-sm  text-gray-500">
          <ul className="flex flex-col gap-2">
            <Link href="/orders">
              <li onClick={()=>setIstoken(false)}>Dashboard</li>
            </Link>
            <Link href="/profile">
              <li onClick={()=>setIstoken(false)}>Addresses</li>
            </Link>
            <li onClick={()=>{Logout(),setIstoken(false)}} className="cursor-pointer">
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Afterlogin