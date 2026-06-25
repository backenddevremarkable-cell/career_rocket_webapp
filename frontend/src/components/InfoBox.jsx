import { Info } from "lucide-react";

export default function InfoBox() {
  return (
    <div className="mt-8 flex items-start gap-3 rounded-xl bg-[#F5F5F5] px-4 py-3.5">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-career-orange">
        <Info className="h-3 w-3 text-white" strokeWidth={3} />
      </div>
      <p className="text-[13px] leading-relaxed text-[#757575]">
        Ensure you have your 10-digit{" "}
        <span className="font-semibold text-[#424242]">Number</span> ready.
        Verification takes less than 3 seconds.
      </p>
    </div>
  );
}
