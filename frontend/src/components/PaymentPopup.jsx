"use client";

import { X, Phone, IndianRupee, BookOpen, Clock, Tag } from "lucide-react";

export default function PaymentPopup({ course, mobile, onMobileChange, onPay, onClose, paying }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[440px] rounded-2xl bg-white p-8 shadow-modal">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#9E9E9E] transition hover:bg-[#F5F5F5]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-[20px] font-bold text-[#212121]">Student Details</h3>
        <p className="mt-1 text-[13px] text-[#9E9E9E]">
          Review details and enter mobile to proceed with payment
        </p>

        <div className="mt-5 space-y-3 rounded-xl bg-career-lavender p-4">
          <DetailRow icon={BookOpen} label="Course Name" value={course.name} />
          <DetailRow icon={Tag} label="Course ID" value={course.id} />
          <DetailRow icon={Tag} label="Category" value={course.category} />
          <DetailRow icon={Clock} label="Duration" value={course.duration} />
          <div className="flex items-center justify-between border-t border-career-purple/20 pt-3">
            <span className="text-[13px] font-medium text-[#757575]">Amount</span>
            <span className="flex items-center gap-0.5 text-[22px] font-bold text-career-purple">
              <IndianRupee className="h-5 w-5" />
              {course.price}/-
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-[13px] font-medium text-[#757575]">
            Mobile Number
          </label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E9E9E]" />
            <input
              type="tel"
              value={mobile}
              onChange={(e) =>
                onMobileChange(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className="w-full rounded-xl border border-[#E0E0E0] py-3.5 pl-10 pr-4 text-[14px] focus:border-career-purple focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onPay}
          disabled={paying || mobile.length < 10}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-career-purple py-3.5 text-[15px] font-semibold text-white transition hover:bg-career-purple-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {paying ? "Processing..." : "Pay"}
        </button>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-career-purple" />
      <div>
        <p className="text-[11px] text-[#9E9E9E]">{label}</p>
        <p className="text-[14px] font-medium text-[#212121]">{value}</p>
      </div>
    </div>
  );
}
