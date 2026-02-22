"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import logo from "../assets/images/logo.svg";
import Image from "next/image";

export default function SignIn() {
  const [showPass, setShowPass] = useState(false);

  return (
    <section className="min-h-screen bg-black flex items-center justify-center p-0">
      <div className="w-full max-w-12xl bg-white  overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="p-10 md:p-16 flex flex-col justify-center">

          {/* LOGO */}
         <Link href={'/'}> 
          <h2 className="font-bold text-xl mb-12">
             <Image src={logo}/>
          </h2>
         </Link> 

            {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900">Sign up</h1>
      <p className="text-gray-500 mt-2 mb-8">
        Embark on your journey to success! Get your profile evaluated and take
        the first step towards achieving your dreams today!
      </p>

      {/* MOBILE */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder=" "
          defaultValue=""
          className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-3 focus:outline-none focus:border-purple-600"
        />
        <label className="absolute left-3 px-1 bg-white text-gray-400 text-sm
        transition-all duration-200
        top-1/2 -translate-y-1/2
        peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-600
        peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs">
          Mobile Number
        </label>
      </div>

      {/* NAME */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder=" "
          className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-3 focus:outline-none focus:border-purple-600"
        />
        <label className="absolute left-3 px-1 bg-white text-gray-400 text-sm
        transition-all duration-200
        top-1/2 -translate-y-1/2
        peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-600
        peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs">
          Your Name
        </label>
      </div>

      {/* EMAIL */}
      <div className="relative mb-6">
        <input
          type="email"
          placeholder=" "
          className="peer w-full border border-purple-500 rounded-xl px-4 pt-5 pb-3 focus:outline-none focus:border-purple-600"
        />
        <label className="absolute left-3 px-1 bg-white text-purple-600 text-sm
        transition-all duration-200
        top-1/2 -translate-y-1/2
        peer-focus:top-0 peer-focus:text-xs
        peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs">
          Email
        </label>
      </div>

      {/* I'M STUDENT */}
      <div className="relative mb-6">
        <select className="w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-500 focus:outline-none focus:border-purple-600">
          <option>I'm Student</option>
          <option>Working Professional</option>
        </select>
      </div>

      {/* EDUCATION LEVEL */}
      <div className="relative mb-8">
        <select className="w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-500 focus:outline-none focus:border-purple-600">
          <option>--Education Level--</option>
          <option>School</option>
          <option>Graduate</option>
          <option>Post Graduate</option>
        </select>
      </div>

      {/* BUTTON */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition">
        Submit
      </button>

          {/* OR */}
          <div className="flex items-center gap-4 my-6 text-gray-400 text-sm">
            <div className="flex-1 h-[1px] bg-gray-200" />
            or
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          {/* GOOGLE */}
          <button className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50">
            Sign in with Google <FaGoogle />
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account ??{" "}
            <span className="text-purple-600 font-medium cursor-pointer">
              <Link href={'signin'}>Sign In</Link>
            </span>
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden md:block md:fixed right-0 top-0 w-1/2 h-screen">
  <img
    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop"
    className="w-full h-full object-cover"
  />
</div>

      </div>
    </section>
  );
}