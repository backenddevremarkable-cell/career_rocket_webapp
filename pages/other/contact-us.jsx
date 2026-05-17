"use client";

import { useState } from "react";
import { FiPhone, FiMail, FiMapPin  } from "react-icons/fi";
import header from "../../assets/images/header-pic/contact-us.jpeg";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../../components/common/ContactForm";

export default function ContactPage() {

   const [active, setActive] = useState("jodhpur");
  
  return (
   <> 
    <div className="bg-gray-contact min-h-screen">


       <div className="relative w-full
                    h-[180px]
                    sm:h-[220px]
                    md:h-[280px]
                    lg:h-[350px]
                    xl:h-[260px] overflow-hidden">
            
                <Image
                  src={header}
                  alt="Contact Us"
                  fill
                  priority
                  className="object-cover scale-105"
                />
            
                {/* PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
            
                {/* HERO CONTENT */}
                <div className="relative z-10  mx-auto h-full px-4 flex items-center">
            
                  <div className="items-center" style={{ margin : 'auto'}}>
            
                    {/* TITLE */}
                    <h1
                      className="
                      text-3xl md:text-5xl
                      font-black
                      items-center
                      uppercase
                      text-white
                      leading-tight
                      tracking-tight
                    "
                    >
                      Need Help? We are Just a Message Away!
                    </h1>
                  </div>
                </div>
              </div>
            


    <div className="max-w-6xl mx-auto px-4 py-10 grid p-b-0">
        <h2 className="text-3xl font-bold mb-2">Contact us</h2>
        <p className="text-gray-500 mb-2 alignleft">
          Our friendly team would love to hear from you.
        </p>
    </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* LEFT - FORM */}
        <div className="bg-white contact-form">
           <ContactForm/>
        </div>

        {/* RIGHT - MAP */}
        <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14312.242628388853!2d73.0351321!3d26.2596947!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c669622511d%3A0x5c27bd81ccdfaef9!2sRemarkable%20Education%20Private%20Limited!5e0!3m2!1sen!2sin!4v1716628631915!5m2!1sen!2sin"
            className="w-full h-map rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom Cards */}


      <div className="bg-[#faf7fc] py-20">

  {/* Location Switch */}
  <div className="flex justify-center mb-14 px-4">
    <div className="relative flex bg-white shadow-lg border border-[#f1e4ff] rounded-full p-1.5 w-[290px] overflow-hidden">

      {/* Active Background */}
      <div
        className={`absolute top-1.5 bottom-1.5 w-[48%] rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 transition-all duration-500 ${
          active === "jodhpur"
            ? "left-[6px]"
            : "left-[50%]"
        }`}
      />

      <button
        onClick={() => setActive("jodhpur")}
        className={`relative z-10 flex-1 py-3 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
          active === "jodhpur"
            ? "text-white"
            : "text-gray-600 hover:text-black"
        }`}
      >
        Jodhpur
      </button>

      <button
        onClick={() => setActive("jaipur")}
        className={`relative z-10 flex-1 py-3 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
          active === "jaipur"
            ? "text-white"
            : "text-gray-600 hover:text-black"
        }`}
      >
        Jaipur
      </button>
    </div>
  </div>

  {/* Contact Cards */}
  <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 gap-7">

    {/* Email Card */}
    <div className="group bg-white border border-[#f3e8ff] rounded-[12px] p-8 shadow-sm hover:-translate-y-2 transition-all duration-500">
      
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-violet-100 flex items-center justify-center color-primary text-2xl shadow-sm">
        <FiMail />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-7">
        Email us
      </h3>

      <p className="text-gray-500 leading-5 mt-3">
        Our team is always ready to help you with inquiries and support.
      </p>

      <a
        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ID}`}
        className="inline-block mt-6 text-lg font-semibold color-primary transition"
      >
        {process.env.NEXT_PUBLIC_EMAIL_ID}
      </a>
    </div>

    {/* Address Card */}
    <div className="group bg-white border border-[#f3e8ff] rounded-[12px] p-8 shadow-sm  hover:-translate-y-2 transition-all duration-500">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-violet-100 flex items-center justify-center color-primary text-2xl shadow-sm">
        <FiMapPin />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-7">
        Visit us
      </h3>

      <p className="text-gray-500 leading-5 mt-3">
        {active === "jodhpur"
          ? "14b, opp. Kv No 1, Abhaygarh Colony, Scheme"
          : "Plot No 61, Kalyanpura, Sanganer"}
      </p>

      <a
        target="_blank"
        href={
          active === "jodhpur"
            ? "https://g.co/kgs/4bSwUhq"
            : "https://g.co/kgs/kJYLo6i"
        }
        className="inline-block mt-6 text-lg font-semibold color-primary hover:text-violet-700 transition"
      >
        {active === "jodhpur"
          ? "Jodhpur, Rajasthan 342001"
          : "Jaipur, Rajasthan 302020"}
      </a>
    </div>

    {/* Phone Card */}
    <div className="group bg-white border border-[#f3e8ff] rounded-[12px] p-8 shadow-sm  hover:-translate-y-2 transition-all duration-500">
      
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-violet-100 flex items-center justify-center color-primary text-2xl shadow-sm">
        <FiPhone />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-7">
        Call us
      </h3>

      <p className="text-gray-500 leading-5 mt-3">
        Monday to Saturday • 9:00 AM to 6:00 PM
      </p>

      <a
        href={`tel:${process.env.NEXT_PUBLIC_MOBILE_NO_LINK}`}
        className="inline-block mt-6 text-lg font-semibold color-primary hover:text-violet-700 transition"
      >
        {process.env.NEXT_PUBLIC_MOBILE_NO}
      </a>
    </div>

  </div>
</div>

    </div>
    </>
  );
}