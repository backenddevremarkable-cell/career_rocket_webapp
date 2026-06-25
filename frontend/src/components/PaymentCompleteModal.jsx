"use client";

import { Check } from "lucide-react";

export default function PaymentCompleteModal({ amount, onExit }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 text-center shadow-modal">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-career-green-light">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-career-green">
            <Check className="h-6 w-6 text-white" strokeWidth={3} />
          </div>
        </div>
        <h3 className="mt-5 text-[20px] font-bold text-[#212121]">
          Payment Successful
        </h3>
        <p className="mt-2 text-[14px] text-[#757575]">
          ₹{amount}/- received successfully. Transaction completed.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-6 w-full rounded-xl bg-career-purple py-3.5 text-[15px] font-semibold text-white transition hover:bg-career-purple-dark"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
