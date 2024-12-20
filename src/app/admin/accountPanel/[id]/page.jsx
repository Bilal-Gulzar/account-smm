"use client";
import React, { useEffect, useState } from "react";
// import Tabs from "@/app/component/tabs";
import Image from "next/image";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaChevronUp, FaChevronDown, FaS } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Link from "next/link";
import Accountsetitngnavbar from "@/app/component/accountsetitngnavbar";
import Delete from "@/app/component/delete";
import { InfinitySpin } from "react-loader-spinner";
var jwt = require("jsonwebtoken");

export default function EditAccount({ params }) {
  const { id } = params;
  const router =  useRouter()
  const [accountname, setAcountname] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [accountcategory, setAccountcategory] = useState("");
  const [price, setPrice] = useState("");
  const [typesofAccount, setTypesofAccount] = useState([]);
  const [slideUp, setSlideUp] = useState(false);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteaccount, setDeleteaccount] = useState(false);
  

   const handleSub = async (evt) => {
     evt.preventDefault();

     if (!image) {
       return toast.error("Add Account image");
     }
     const savingAccount = new Promise(async (resolve, reject) => {
       let data = {
        id,
         accountname,
         desc,
         accountcategory,
         price,
         typesofAccount,
         image,
       };

       let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Accounts`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       });

       if (res.ok) {
         resolve();
       } else {
         reject();
       }
     });
     await toast.promise(savingAccount, {
       loading: "Updating account...",
       success: "Updated account",
       error: "Error,Sorry...",
     });
   };
   const addTypesofAccount = () => {
     setTypesofAccount((oldaccounts) => {
       return [...oldaccounts,{ typeOfAccount: "", extraPrice: 0 }];
     });
   };

  const handleImg = async (evt) => {
    const img = evt.target.files?.[0];
    if (!img) return;
    const data = new FormData();
    data.append("file", img);
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
        setImage(response?.url);
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


 const editaccount = (evt, index, prop) => {
   const newvalue = evt.target.value;
   setTypesofAccount((preAcc) => {
     const newaccount = [...preAcc];
     newaccount[index][prop] = newvalue;
     return newaccount;
   });
 };

  const removeAccount = (index) => {
    setTypesofAccount((preaccounts) =>
      preaccounts.filter((v, i) => i !== index)
    );
  };

  useEffect(() =>{
    Next_Auth(); 
   fetchingData()
    fetch("/api/accountcategories").then((res) => {
      res.json()
        .then((data) => {
          setCategories(data?.getAccountcategory || []);
        })
        .catch((error) => {
          console.log("something went wrong.", error);
        });
    });
  }, []);

  const fetchingData = async () => {
    let res = await fetch("/api/Accounts?id="+id)
    let data = await res.json();
    if (data && data.getAccount) {
      setAcountname(data.getAccount.accountName);
      setDesc(data.getAccount.desc);
      setTypesofAccount(data.getAccount.accountTypes);
      setPrice(data.getAccount.basePrice);
      setAccountcategory(data.getAccount.category);
      setImage(data.getAccount.img);
      setIsLoading(false);
    } else {
      console.log("somthing went wrong", data?.error || "Unknown error");
    }
 
  };

  const deleteAccount = async (id) => {
    const deleting = new Promise(async (resolve, reject) => {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Accounts?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok){
        router.push("/admin/accountPanel")
       setDeleteaccount(false);
        resolve();
      } else {
        setDeleteaccount(false);
        reject();
      }
      await toast.promise(deleting, {
        loading: " Deleting this Account...",
        success: "Account deleted!",
        error: "Error,Sorry...",
      });
    });
  };

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
        <div className="w-full flex justify-center items-center h-screen overflow-hidden">
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
        <main className="min-w-screen  flex flex-col justify-between min-h-screen bg-[#f5f5f5]">
          <div>
            <Accountsetitngnavbar />{" "}
            <section className="overflow-x-hidden  max-w-[900px] mx-auto mt- pb-28">
              <Link href={"/admin/accountPanel"}>
                <div className="cursor-pointer sm:w-[36rem] gap-2 mx-5 sm:mx-auto flex mt-12 items-center justify-center lg:w-[47rem] border py-2.5 px-4 shadow-sm border-gray-100  font-semibold rounded-lg  bg-white ">
                  <span>
                    <FaRegArrowAltCircleLeft className="size-6" />
                  </span>
                  <p className="font-bold">Show all Accounts</p>
                </div>
              </Link>
              <div className="sm:w-[36rem] lg:w-[47rem]  mt-10 flex flex-col items-end mx-auto">
                <form onSubmit={handleSub} className="space-y-6">
                  <div className="relative  mx-5 sm:mx-0  sm:w-[27rem]  lg:w-[35rem]">
                    <div className="sm:absolute flex flex-col gap-2 items-center sm:items-start top-1 lg:-left-48 -left-36">
                      <div className="relative bg-gray-100 w-[8rem] lg:w-[11rem] h-24 lg:h-28 rounded-lg">
                        {image && (
                          <Image
                            src={image}
                            height={450}
                            width={450}
                            quality={90}
                            className="w-full h-full rounded-lg "
                            alt="Menu item img"
                            priority
                          />
                        )}
                        {!image && (
                          <div className="absolute w-full h-full flex justify-center items-center">
                            <MdOutlineAddPhotoAlternate className="text-black size-11 sm:size-14" />
                          </div>
                        )}
                      </div>
                      <div className="text-gray-600 font-medium text-sm rounded-lg border border-gray-100 bg-white ">
                        <label className=" flex flex-col justify-center cursor-pointer items-center h-12 w-[8rem] lg:w-[11rem] ">
                          <input
                            type="file"
                            onChange={(evt) => handleImg(evt)}
                            className="hidden"
                          />
                          <p className="lg:text-base">Change image</p>
                        </label>
                      </div>
                    </div>
                    <label
                      htmlFor="name"
                      className="block text-sm sm:mt-0 mt-3 font-medium leading-6 text-gray-600"
                    >
                      Account name
                    </label>
                    <div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={accountname}
                        onChange={(e) => setAcountname(e.target.value)}
                        autoComplete="off"
                        className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
                    <label
                      htmlFor="desc"
                      className="block mt-3  text-sm font-medium leading-6 text-gray-600"
                    >
                      Description
                    </label>
                    <div className="">
                      <input
                        id="desc"
                        name="desc"
                        type="text"
                        required
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        autoComplete="off"
                        className="block w-full  rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
                    <label
                      htmlFor="category"
                      className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                    >
                      Types of Account
                    </label>
                    <div className="">
                      <select
                        id="category"
                        value={accountcategory}
                        onChange={(evt) => setAccountcategory(evt.target.value)}
                        className="block w-full rounded-lg border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                      >
                        {categories.length > 0 &&
                          categories.map((c, i) => (
                            <option
                              key={i}
                              className="outline-none"
                              value={c._id}
                            >
                              {c.menu}
                            </option>
                          ))}
                      </select>
                    </div>
                    <label
                      htmlFor="price"
                      className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                    >
                      Base Price
                    </label>
                    <div className="">
                      <input
                        id="price"
                        name="price"
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        autoComplete="off"
                        className="block w-full rounded-lg border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  bg-white placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
                    <div className="w-full mx-0  px-4 py-3 rounded-lg mt-3 bg-gray-200  sm:w-[27rem]  lg:w-[35rem]">
                      <button
                        onClick={() => setSlideUp(!slideUp)}
                        type="button"
                        className=" flex items-center  gap-2 font-semibold text-lg "
                      >
                        {slideUp && (
                          <span>
                            <FaChevronUp className="size-5" />
                          </span>
                        )}
                        {!slideUp && (
                          <span>
                            <FaChevronDown className="size-5" />
                          </span>
                        )}
                        Account Option ({typesofAccount?.length})
                      </button>
                      {slideUp && (
                        <>
                          {typesofAccount?.length > 0 &&
                            typesofAccount.map((v, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-2 w-[80%] gap-3 mt-5 mb-2"
                              >
                                <div key={v._id} className="flex flex-col">
                                  <label
                                    htmlFor="typesofAccount"
                                    className="text-sm text-gray-600 font-semibold"
                                  >
                                    Name
                                  </label>
                                  <input
                                    id="typesofAccount"
                                    type="text"
                                    required
                                    value={v.typeOfAccount}
                                    onChange={(evt) =>
                                      editaccount(evt, index, "typeOfAccount")
                                    }
                                    placeholder="account name"
                                    className="bg-white border-gray-300  p-2 rounded-lg outline-none focus:ring-1 border  focus:ring-black "
                                    autoComplete="off"
                                  />
                                </div>
                                <div
                                  key={index}
                                  className="flex flex-col relative"
                                >
                                  <label
                                    htmlFor="ExtraPrice"
                                    className="text-sm  text-gray-600 font-semibold"
                                  >
                                    Extra Price
                                  </label>
                                  <input
                                    id="ExtraPrice"
                                    type="number"
                                    required
                                    value={v.extraPrice}
                                    onChange={(evt) =>
                                      editaccount(evt, index, "extraPrice")
                                    }
                                    // placeholder="0"
                                    className="bg-white p-2 rounded-lg outline-none focus:ring-1 border border-gray-300  focus:ring-black "
                                    autoComplete="off"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeAccount(index)}
                                    className="absolute -right-14 bottom-0 bg-white mt-5 p-2 rounded-lg "
                                  >
                                    <HiOutlineTrash className="size-6" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          <button
                            type="button"
                            onClick={addTypesofAccount}
                            className="w-full flex justify-center items-center text-lg font-semibold p-2 mt-3 rounded-lg bg-white gap-2 mb-1 outline-none"
                          >
                            <span>
                              <AiOutlinePlus className="size-5" />
                            </span>
                            Add Account Types
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" mx-5 sm:mx-0 w-[90vw] sm:w-full py-2 rounded-lg  flex justify-center items-center bg-black font-semibold text-white outline-none text-lg"
                  >
                    Save
                  </button>
                  <div
                    onClick={() => setDeleteaccount(true)}
                    className=" gap-2 mx-5 sm:mx-auto flex mt-14 items-center justify-center border py-2.5 px-4 shadow-sm border-gray-300 bg-white  font-medium rounded-lg cursor-pointer "
                  >
                    <p className="font-bold">Delete this Account</p>
                  </div>
                </form>
              </div>
            </section>
          </div>
            <Delete
              deleteAccount={deleteAccount}
              id={id}
              prop={setDeleteaccount}
              deleteMenu={deleteaccount}
            />
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
