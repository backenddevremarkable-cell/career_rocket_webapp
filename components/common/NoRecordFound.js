"use client";

import { FiInbox } from "react-icons/fi";

export default function NoRecordFound() {
  return (
    <div className="w-full flex items-center justify-center py-24 px-4">
      <div className="text-center max-w-sm">
        
        {/* Icon */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center shadow-md">
          <div className="absolute inset-0 rounded-full animate-pulse bg-purple-100 opacity-40"></div>

          <FiInbox className="relative text-5xl text-purple-500" />
        </div>

        {/* Title */}
        <h2 className="mt-7 text-3xl font-bold text-gray-800">
          No Records Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
          There are currently no records available to display.
        </p>
      </div>
    </div>
  );
}