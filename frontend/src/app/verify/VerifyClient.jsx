"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Smartphone, ArrowRight } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import Link from "next/link";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const initialMobile = searchParams.get("mobile") || "";
  const [mobile, setMobile] = useState(
    initialMobile.replace(/\D/g, "").slice(0, 10)
  );

  return (
    <AppLayout>
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md flex-col items-center justify-center px-6 py-16">
        <div className="w-full rounded-2xl border border-[#F0F0F0] bg-white p-8 shadow-card">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-career-lavender">
            <Smartphone className="h-7 w-7 text-career-purple" />
          </div>
          <h1 className="text-center text-[22px] font-bold text-[#212121]">
            Verify Your Number
          </h1>
          <p className="mt-2 text-center text-[14px] text-[#757575]">
            Install Career Rocket app and register, then verify here
          </p>
          <div className="mt-6">
            <label className="text-[13px] font-medium text-[#757575]">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="10-digit mobile number"
              className="mt-1.5 w-full rounded-xl border border-[#E0E0E0] px-4 py-3 text-[14px] focus:border-career-purple focus:outline-none"
            />
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-career-purple py-3.5 text-[14px] font-semibold text-white"
            >
              Android Play Store
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-career-purple py-3.5 text-[14px] font-semibold text-career-purple"
            >
              iOS App Store
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <Link
            href="#"
            className="mt-6 block text-center text-[14px] font-medium text-career-purple hover:underline"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
