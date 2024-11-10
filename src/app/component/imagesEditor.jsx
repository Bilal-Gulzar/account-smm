"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import Image from 'next/image';
import toast from "react-hot-toast";

export default function ImagesEditor({editProfile,setEditProfile,data,setProfileMessage,fetchData}) {
     const [saving, setSaving] = useState(false);
     const [name, setName] = useState('');
     const [img, setImg] = useState('');
     const [id, setId] = useState('');
     const [condition, setCondition] = useState(false);

     useEffect(()=>{
     setImg(data?.image)
     if(data.name){
     setName(data?.name)
    setCondition(false);

     }else{
      setName(data.image)
      setCondition(true)

     }
     setId(data?._id)

     },[data])
     async function updateImage(evt) {
     evt.preventDefault();
     setSaving(true);
     const data = { id,name, img};
     const  URL = condition ? "/api/homeMainImges" : "/api/homeImages" ; 
     const res = await fetch( URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
    //   setIsChange(!isChange);
      setTimeout(() => {
        setSaving(false);
        setEditProfile(false);
        showMessage();
      }, 1500);
    }

    const showMessage = () => {
      setProfileMessage(true);
      setTimeout(() => {
        setProfileMessage(false);
        fetchData()
      }, 1500);
    };
    const handleImg = async (evt) => {
      const pic = evt.target.files?.[0];
      if (!pic) return;
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "elly42bv");
      data.append("cloud_name", "dmbnrj1tu");

      const changingImg = new Promise(async (resolve, reject) => {
        let res = await fetch(
          "https://api.cloudinary.com/v1_1/dmbnrj1tu/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        if (res.ok) {
          let response = await res.json();
          setImg(response?.url);
          resolve();
        } else {
          reject();
        }
      });

      //  setImg(response.img)
      await toast.promise(changingImg, {
        loading: "changing image...",
        success: "changed image",
        error: "Error,Sorry...",
      });
    };
  return (
    <div>
      <div
        className={`fixed right-0 ${
          editProfile ? "" : "translate-y-full"
        } justify-center  flex left-0 top-0 backdrop-blur-sm bg-[#666666]/80 w-full h-full items-end sm:items-center`}
      >
        <div
          className={`${
            editProfile ? "translate-y-0" : "translate-y-full"
          }   duration-300 md:duration-200 transition-all ease-in  w-full sm:w-[550px] overflow-y-auto hide-scrollbar  sm:rounded-md rounded-t-xl  px-5 bg-white`}
        >
          <div className="flex justify-between items-center mt-3">
            <h1 className="text-2xl font-medium">Edit Image</h1>
            <div
              onClick={() => {setEditProfile(false),fetchData()}}
              className="hover:bg-[#f5f5f5] rounded-md p-1 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.07797 6.07797C6.22442 5.93153 6.46186 5.93153 6.6083 6.07797L12 11.4697L17.3917 6.07797C17.5381 5.93153 17.7756 5.93153 17.922 6.07797C18.0685 6.22442 18.0685 6.46186 17.922 6.6083L12.5303 12L17.922 17.3917C18.0685 17.5381 18.0685 17.7756 17.922 17.922C17.7756 18.0685 17.5381 18.0685 17.3917 17.922L12 12.5303L6.6083 17.922C6.46186 18.0685 6.22442 18.0685 6.07797 17.922C5.93153 17.7756 5.93153 17.5381 6.07797 17.3917L11.4697 12L6.07797 6.6083C5.93153 6.46186 5.93153 6.22442 6.07797 6.07797Z"
                  stroke="gray"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </div>
          <form onSubmit={updateImage}>
            <div className="mt-5 gap-3 flex items-center ">
              <div className="">
                {img && (
                  <div className="w-32 h-32 relative">
                    <Image src={img} fill alt={name} sizes="100vw" />
                  </div>
                )}
                <label className="bg-black text-white px-6 rounded relative top-3 cursor-pointer py-1.5 left-0.5 ">
                  Edit&nbsp;Image
                  <input
                    type="file"
                    onChange={(evt) => handleImg(evt)}
                    autoComplete="off"
                    className="hidden"
                  />
                </label>
              </div>
              <div className="relative  flex-grow">
                <input
                  readOnly={condition}
                  id="lastName"
                  type="text"
                  autoComplete="off"
                  placeholder=""
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2.5 px-5 input-field w-full text-sm pt-5 border border-gray-300 rounded"
                />
                <label
                  htmlFor="lastName"
                  className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                >
                  {condition ? "Image Url" : "Iamge name"}
                </label>
              </div>
            </div>
            <div className="pb-5  flex justify-end">
              <button
                onClick={() => {
                  setEditProfile(!editProfile), fetchData();
                }}
                type="button"
                className="underline outline-none p-3 text-sm rounded-md "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[55px] flex justify-center items-center bg-[#C7C6C6] outline-none text-sm hover:bg-[#acabab] rounded-md font-medium"
              >
                {saving ? (
                  <svg
                    fill="none"
                    height="23"
                    viewBox="0 0 24 23"
                    width="24"
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      opacity="0.2"
                    />
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
