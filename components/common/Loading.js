"use client";

import Image from "next/image";
import Loader from "../../assets/images/loader.gif";

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-50 bg-white flex items-center justify-center">
      
      {/* Loader Content */}
      <div className="flex flex-col items-center">
        
        <Image
          src={Loader}
          alt="Loading..."
          width={120}
          height={120}
          priority
          className="object-contain"
        />

        <p className="mt-4 text-gray-500 text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}