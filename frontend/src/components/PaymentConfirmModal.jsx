"use client";

import { X } from "lucide-react";

export default function PaymentConfirmModal({
  user,
  course,
  onPay,
  onClose,
  paying,
}) {
  if (!user || !course) return null;

  const displayName = user.name || "Student";
  const prefixName = `Dear ${displayName}`;

  // Check if required user info is present
  const userMobile = user.mobile || user.mobileNo || user.MOBILE;
  const isMobileValid = userMobile && userMobile.trim().length >= 10;
  const isEmitra = !!user.emitraSSOID;
  const isEmitraValid = isEmitra ? (user.emitraSSOID && user.emitraSSOTOKEN) : true;
  const hasAllFields = isMobileValid && isEmitraValid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[520px] rounded-2xl bg-white p-8 shadow-modal">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#9E9E9E] hover:bg-[#F5F5F5]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

         
          <p className="text-[14px] leading-relaxed text-[#616161]">
           <span className="font-semibold text-[#212121]">{prefixName}</span>, क्या आप{" "}
            <span className="font-semibold text-career-purple">{course.name}</span>{" "}
            खरीदने के लिए{" "}
            <span className="font-bold text-[#212121]">{course.price} रुपये</span> का
            भुगतान करना चाहते हैं?
          </p>
           <div className="flex justify-end">
          <button
            type="button"
            onClick={onPay}
            disabled={paying || !hasAllFields}
            className="mt-4 rounded-lg bg-career-purple px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-career-purple-dark disabled:opacity-60"
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>
          </div>
        
      </div>
    </div>
  );
}
