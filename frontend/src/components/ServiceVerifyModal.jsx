"use client";

import { useState } from "react";
import { X, Check, IndianRupee } from "lucide-react";
import { studentLogin } from "@/lib/api";

const SCHOLARSHIP_FEATURES = [
  ["Scholarship जीतने का मौका", "अपनी तैयारी का सही मूल्यांकन"],
  ["All India Rank Analysis", "Weak & Strong Topics की पहचान"],
  ["Competitive Exam Experience", "बेहतर तैयारी के लिए Performance Report"],
  ["Certificate से Academic Profile मजबूत", "कम फीस में Quality Preparation"],
];

const COUNSELLING_FEATURES = [
  ["सही करियर चुनने में मदद", "Confusion Free Career Planning"],
  ["समय और पैसे की बचत", "बेहतर भविष्य के लिए सही दिशा"],
  ["10वीं/12वीं के बाद क्या करें – पूरी जानकारी", "आपकी रुचि और क्षमता के अनुसार करियर सुझाव"],
];

export default function ServiceVerifyModal({
  service,
  onClose,
  onVerified,
  onNotRegistered,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [mobileNo, setMobileNo] = useState("");

  const isScholarship = service.type === "scholarship";
  const features = isScholarship ? SCHOLARSHIP_FEATURES : COUNSELLING_FEATURES;

  const handleSubmit = async () => {
    if (mobileNo.length < 10) {
      alert("कृपया 10 अंकों का मोबाइल नंबर दर्ज करें");
      return;
    }

    setSubmitting(true);
    try {
      const result = await studentLogin(mobileNo);

      // Supports both our local mock + your real API shape.
      // Local: { registered: boolean, user: {...} }
      // Real:  { message, token, response: {...isVerified, mobileNo, name...} }
      const token = result?.token;
      const responseUser = result?.response;
      const localUser = result?.user;
      const isVerified =
        (typeof result?.registered === "boolean" ? result.registered : null) ??
        responseUser?.isVerified ??
        false;

      if (!isVerified) {
        onNotRegistered(mobileNo);
        return;
      }

      const user = responseUser || localUser || {};
      const cleanMobile = mobileNo;
      onVerified({
        ...user,
        token,
        serviceType: service.type,
        mobile: user.mobile || user.mobileNo || cleanMobile,
        mobileNo: user.mobileNo || user.mobile || cleanMobile,
        MOBILE: user.mobile || user.mobileNo || cleanMobile,
        KIOSKNAM: (user.name || "").trim() || "Student",
      });
    } catch {
      onNotRegistered(mobileNo);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white shadow-modal">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#9E9E9E] hover:bg-[#F5F5F5]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-[#F0F0F0] p-6 pr-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold leading-snug text-[#212121] lg:text-[20px]">
                {service.title}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#757575]">
                खरीदने के लिए विद्यार्थी के Contact Number की पुष्टि करें।
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-career-purple/20 bg-career-lavender px-3 py-2 text-right">
              <p className="text-[11px] font-medium text-career-purple">Price</p>
              <p className="flex items-center justify-end gap-0.5 text-[22px] font-bold text-[#212121]">
                <IndianRupee className="h-4 w-4 text-career-purple" />
                {service.price}
              </p>
              <p className="text-[10px] text-[#9E9E9E]">GST Included</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[14px] font-semibold text-career-purple">
            Included Benefits
          </p>


          <div className="mt-3 rounded-xl border border-career-purple/15 bg-career-lavender/30 p-3">
            <div className="space-y-2">
              {features.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                  {row.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-career-green">
                        <Check
                          className="h-2.5 w-2.5 text-white"
                          strokeWidth={3}
                        />
                      </span>

                      <p className="text-[12px] leading-snug text-[#424242]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-[13px] font-medium text-[#424242]">
              विद्यार्थी का Career Rocket एप पर पंजीकृत मोबाइल नंबर दर्ज करें —
            </label>
            <input
              type="tel"
              value={mobileNo}
              onChange={(e) =>
                setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Student Contact Number"
              maxLength={10}
              className="mt-2 w-full rounded-xl border border-[#E0E0E0] px-4 py-3.5 text-[14px] focus:border-career-purple focus:outline-none focus:ring-2 focus:ring-career-purple/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#F0F0F0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] font-medium text-career-purple hover:underline"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || mobileNo.length < 10}
            className="rounded-xl bg-career-purple px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-career-purple-dark disabled:opacity-50"
          >
            {submitting ? "Checking..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
