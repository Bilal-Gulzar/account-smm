import React from 'react'
import { FaWhatsapp } from "react-icons/fa6";
function WhatsappIcon() {
  return (
  <a href="https://wa.me/15159150081" target="_blank" rel="noopener noreferrer">
      <section className="w-12 h-12 rounded-full bg-[#3dbb18] -z-10 flex justify-between items-center fixed   lg:bottom-3 right-3 bottom-16 cursor-pointer">
        <FaWhatsapp className="w-full size-6 text-white transition-all duration-300  hover:text-black" />
      </section>
    </a>
  );
}

export default WhatsappIcon