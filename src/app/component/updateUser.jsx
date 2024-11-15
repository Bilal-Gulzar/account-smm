"use client";
import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
import { useRouter} from "next/navigation";
import { MdOutlineErrorOutline } from "react-icons/md";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
function UserPage({ editProfile, setEditProfile,id}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [admin, setAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkNum, setCheckNum] = useState(false);
  const [profileMessage, setProfileMessage] = useState(false);
 const scrollableContentRef = useRef(null);

  const fetchingData = () => {
    fetch("/api/profile?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        setEmail(data?.email || '');
        setFName(data?.firstName || '');
        setLName(data?.lastName || '');
        setPhone(data?.number || '');
        setCity(data?.city || '');
        setCountry(data?.country || '');
        setPostal(data?.postalCode || '');
        setAddress(data?.address || '');
        setAdmin(data?.admin || false)
      });
  };

  useEffect(() => {
    fetchingData();
  }, [editProfile]);

  const UpadateUserInfo = async (evt) => {
    evt.preventDefault();
    const length = `${phone}`.length;
    if(length){
    if (length < 11 || length > 11)
      return setCheckNum(true), router.push("###");
  }
    setCheckNum(false);
    setSaving(true);

    const data = { id, fName, lName, phone, country, city, postal, address , admin };
    let res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await res.json();
    setTimeout(() => {
      setSaving(false);
      setEditProfile(false);
      showMessage();
    }, 1500);
  };

  const showMessage = () => {
    setProfileMessage(true);
    setTimeout(() => {
      setProfileMessage(false);
    }, 1500);
  };

   useEffect(() => {
     if (scrollableContentRef.current) {
       if (!editProfile) {
         enableBodyScroll(scrollableContentRef.current);
       } else {
         disableBodyScroll(scrollableContentRef.current);
       }
     }

     return () => {
       enableBodyScroll(scrollableContentRef.current); // Cleanup on unmount
     };
   }, [editProfile]);

  return (
    <div>
      <section>
        <div
          className={`fixed right-0 ${
            editProfile ? "flex" : " translate-y-full "
          } justify-center left-0 top-0 z-50  backdrop-blur-sm bg-[#666666]/80 w-full h-full items-end md:items-center`}
        >
          <div
            className={`${
              editProfile ? "translate-y-0" : "translate-y-full"
            } transition-all  duration-300 md:duration-200 ease-in w-full  md:h-[350px] md:w-[690px] lg:w-[750px] overflow-y-auto hide-scrollbar rounded-t-xl md:rounded-md  px-5 bg-white`}
            ref={scrollableContentRef}
          >
            <div id="##" className="mt-3 ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium">Edit address</h1>
                <div
                  onClick={() => {
                    setEditProfile(false), setCheckNum(false);
                  }}
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
              <div
                className={`${
                  checkNum ? "" : "hidden "
                } flex my-4 items-center gap-3 text-red-950 font-medium text-sm rounded border  border-red-200  p-3 bg-red-50`}
              >
                <span>
                  <MdOutlineErrorOutline className="size-6 text-red-500" />
                </span>{" "}
                Phone number is not valid
              </div>
              <form onSubmit={UpadateUserInfo}>
                <div className="mt-3 grid md:grid-cols-2 gap-3 ">
                  <div className="relative ">
                    <label
                      htmlFor="email"
                      className="left-5 top-1.5   absolute text-sm text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="off"
                      required
                      readOnly
                      value={email}
                      className="py-2.5 px-5 w-full outline-none  text-gray-500 text-sm pt-6 border border-gray-300 rounded"
                    />
                    <legend className="text-gray-500 text-xs mt-1 ml-1">
                      Email used for login can't be changed
                    </legend>
                  </div>
                  <div className="relative ">
                    <input
                      id="country"
                      type="text"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="py-2.5 input-field  px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="country"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                    >
                      country/region
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                      className="py-2.5 input-field  px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="firstName"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                    >
                      First name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                      className="py-2.5 px-5 input-field w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="lastName"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                    >
                      Last name
                    </label>
                  </div>
                  <div className="relative md:col-span-2 ">
                    <input
                      id="address"
                      type="text"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="py-2.5 px-5 input-field w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="address"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                    >
                      Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="city"
                      type="text"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="py-2.5 px-5 input-field w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="city"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200 absolute text-sm text-gray-500"
                    >
                      City
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="postalcode"
                      type="text"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      className="py-2.5 input-field px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="postalcode"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                    >
                      Postal code
                    </label>
                  </div>
                  <div className="relative md:col-span-2 ">
                    <input
                      id="phone"
                      type="number"
                      autoComplete="off"
                      placeholder=""
                      // required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="py-2.5 input-field px-5 w-full tex-sm pt-5 border border-gray-300 rounded"
                    />
                    <label
                      htmlFor="phone"
                      className="left-5 top-7 floating-label transform -translate-y-1/2  transition-all duration-200  absolute text-sm text-gray-500"
                    >
                      Phone
                    </label>
                  </div>
                  <div className="flex items-center ml-1 mt-1 gap-2">
                    <input
                      id="checkbox"
                      type="checkbox"
                      checked={admin}
                      className="accent-black"
                      onChange={() => setAdmin(!admin)}
                    />
                    <label htmlFor="checkbox" className="text-xs">
                      Admin
                    </label>
                  </div>
                </div>
                <div className="py-5 flex justify-end ">
                  <button
                    onClick={() => {
                      setEditProfile(false), setCheckNum(false);
                    }}
                    type="button"
                    className="p-3 text-sm rounded-md "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={UpadateUserInfo}
                    type="submit"
                    className="w-[53px] flex justify-center items-center bg-[#C7C6C6] text-sm hover:bg-[#acabab] rounded-md font-medium"
                  >
                    {saving ? (
                      <svg
                        fill="none"
                        height="24"
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
        <div
          className={`${
            profileMessage ? "" : "translate-y-full"
          } z-40 w-screen fixed bottom-12 flex justify-center items-center`}
        >
          <span
            className={`bg-[#4c4c4c] ${
              profileMessage ? "" : "translate-y-full"
            } p-5 flex justify-between items-center rounded-md  text-white text-sm `}
          >
            Profile updated &nbsp;x
          </span>
        </div>
      </section>
    </div>
  );
}

export default UserPage;
