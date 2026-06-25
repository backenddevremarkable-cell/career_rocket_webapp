"use client";

import { X, Smartphone } from "lucide-react";
import Link from "next/link";

export default function NotRegisteredModal({ mobile, onClose }) {
  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-modal">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#9E9E9E] transition hover:bg-[#F5F5F5] hover:text-[#424242]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-career-lavender">
          <Smartphone className="h-7 w-7 text-career-purple" />
        </div>
        <h3 className="text-center text-[18px] font-bold text-[#212121]">
          Number Not Registered
        </h3>
        {mobile && (
          <p className="mt-2 text-center text-[14px] text-[#757575]">
            {mobile}
          </p>
        )}
        <p className="mt-4 text-center text-[14px] leading-relaxed text-[#616161]">
          यह मोबाइल नंबर Career Rocket एप पर अभी रजिस्टर्ड नहीं है। कृपया Career
          Rocket एप को एंड्रॉयड प्ले स्टोर या IOS एप स्टोर से इंस्टॉल कर के
          अपना अकाउंट बनाएं, और फिर यह नंबर e मित्र सर्विस प्रवाइडर के साथ
          साझा करें।
        </p>
        <Link
          href={`/verify?mobile=${encodeURIComponent(mobile || "")}`}
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center rounded-xl border-2 border-career-purple bg-career-lavender py-3.5 text-[14px] font-semibold text-career-purple transition hover:bg-career-purple hover:text-white"
        >
          Verify Number First — Create Account
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl py-3 text-[14px] font-medium text-[#757575] transition hover:text-[#424242]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
