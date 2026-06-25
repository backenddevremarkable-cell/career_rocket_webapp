"use client";

import { X } from "lucide-react";

export default function Step2Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-[#9E9E9E] shadow-sm transition hover:bg-[#F5F5F5]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="pt-4 pb-6">{children}</div>
      </div>
    </div>
  );
}
