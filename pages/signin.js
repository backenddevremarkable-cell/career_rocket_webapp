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
             <Image src={logo} />
           </h2>
          </Link> 

          <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
          <p className="text-gray-500 mt-2 mb-8">
            View review status or discover more about college opportunities
          </p>

          {/* MOBILE INPUT */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border border-purple-400 rounded-lg px-4 pt-5 pb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label
              className="
                absolute left-3 px-1 bg-white
                text-gray-400 text-sm
                transition-all duration-200

                top-1/2 -translate-y-1/2
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-600

                peer-not-placeholder-shown:top-0
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-purple-600
              "
            >
              Mobile Number
            </label>
          </div>

          {/* PASSWORD INPUT */}
          <div className="relative mb-6">
            <input
              type={showPass ? "text" : "password"}
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

             <label
              className="
                absolute left-3 px-1 bg-white
                text-gray-400 text-sm
                transition-all duration-200

                top-1/2 -translate-y-1/2
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-600

                peer-not-placeholder-shown:top-0
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-purple-600
              "
            >
              Password
            </label>

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-4 cursor-pointer text-gray-400"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* SIGNIN BUTTON */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-medium">
            Sign in
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
            Need an account?{" "}
            <span className="text-purple-600 font-medium cursor-pointer">
               <Link href={'signup'}>Create one</Link> 
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