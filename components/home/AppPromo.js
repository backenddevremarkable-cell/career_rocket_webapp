"use client";
import { FaCheckCircle } from "react-icons/fa";
import appInfo from "../../assets/images/app.png";
import playStore from "../../assets/images/play-store.webp";
import appStore from "../../assets/images/app-store.webp";
import Image from "next/image";
import Link from "next/link";

export default function AppPromo() {
  return (
    <section  className="py-5">
      <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 items-center gap-10 rounded-xl "
        style={{ backgroundImage: `url(${`./app-bg.png`})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

        {/* LEFT CONTENT */}
        <div className="p-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800  leading-snug">
            Your <span className="text-purple-600 text-primary"> Dream Career </span> Starts Here
          </h2>

          {/* FEATURES */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-gray-600">
                  Explore career opportunities, connect with industry experts, and make smarter decisions for your future.
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
           <Link target="_blank" href={process.env.NEXT_PUBLIC_PLAY_STORE}> 
            <Image
              src={playStore}
              alt="Google Play"
              width={140}
              height={45}
              className="cursor-pointer hover:scale-105 transition"
            />
            </Link>

            <Link target="_blank" href={process.env.NEXT_PUBLIC_APP_STORE}>

             <Image
              src={appStore}
              alt="App Store"
              width={140}
              height={45}
              className="cursor-pointer hover:scale-105 transition"
            />
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
             <Image
              src={appInfo}
              alt="Google Play"
              width={350}
            />
        </div>

      </div>
    </section>

  );
}