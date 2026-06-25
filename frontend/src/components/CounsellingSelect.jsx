// import { ChevronDown } from "lucide-react";

export default function CounsellingSelect({
  label,
  value,
  onChange,
  placeholder,
  options,
  getValue,
  getLabel,
}) {
  return (
    <div>
      <label className="text-[13px] font-medium text-[#757575]">{label}</label>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#E0E0E0] bg-white px-4 py-3 text-[14px] text-[#212121] focus:border-career-purple focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((item, idx) => {
            const optValue = getValue(item);
            const optLabel = getLabel(item);
            return (
              <option key={`${optValue}-${idx}`} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
        {/* <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E9E9E]" /> */}
      </div>
    </div>
  );
}
