"use client"
import Accountsetitngnavbar from '@/app/component/accountsetitngnavbar'
import React, { useEffect } from 'react'
import {useRouter } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';
import { InfinitySpin } from "react-loader-spinner";
import UserPage from '@/app/component/updateUser';
var jwt = require("jsonwebtoken");



  

const User = () => {
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);

  const fetchingData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUsers`);
    setIsLoading(false);
    const response = await res.json();
    if(response && response.length > 0){
    setEmails(response.reverse() || []);
    setIsLoading(false)
    }
  };

  useEffect(() => {
    Next_Auth();
    fetchingData();
  }, []);

const handleUpdate = (id)=>{
setEditProfile(true)
setUserId(id)
}

function Next_Auth() {
  if (typeof window !== "undefined") {
    let jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      let decode = jwt.decode(jwtToken);
      fetch("/api/isAdmin?id=" + decode.id)
        .then((res) => res.json())
        .then((data) => {
          if (!data.success || !data.admin) {
            router.push("/");
          }
        })
        .catch((e) => console.error(e));
    } else {
      router.push("/");
    }
  }
}

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center  items-center h-screen overflow-hidden">
          <div>
            <InfinitySpin
              visible={true}
              width="200"
              color="#000000"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        </div>
      ) : (
        <main className="min-h-screen flex flex-col justify-between bg-[#f5f5f5]">
          <div>
            <Accountsetitngnavbar />
            <div>
              <h1 className="text-3xl font-medium text-center mt-5">Users</h1>
            </div>
            <section className="overflow-x-hidden max-w-[900px] mx-auto mt-12 pb-28">
              <div className="w-full flex items-center flex-col gap-3">
                {emails.map((v, i) => (
                  <div
                    key={i}
                    className="w-[85vw] mx-auto sm:mx-0 sm:w-[30rem] flex justify-between  items-center lg:w-[32rem] rounded-lg border py-2.5 px-4 shadow-sm bg-white sm:text-sm sm:leading-6 outline-none gap-3 sm:gap-0"
                  >
                    <p className="text-gray-800  line-clamp-1 font-medium">
                      {v.email}
                    </p>

                    <button
                      onClick={() => handleUpdate(v._id)}
                      className="bg-gray-100 border-gray-400 border text-gray-900 min-w-[53px] py-1 rounded-md  flex justify-center items-center font-bold  outline-none"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <UserPage
                editProfile={editProfile}
                setEditProfile={setEditProfile}
                id={userId}
              />
            </section>
          </div>
          <div className="border-t lg:container lg:mx-auto px-5  text-xs flex lg:flex-row flex-col items-center  underline gap-7 py-8 w-full  border-gray-300 mt-14">
            <Link href="/exchange&return">
              <div>Return & Exchange</div>
            </Link>
            <Link href="/privacy-policy">
              <div> Privacy Policy</div>
            </Link>
            <Link href="/terms&conditions">
              <div>Terms & Condition</div>
            </Link>
          </div>
        </main>
      )}
    </>
  );
}
export default User;