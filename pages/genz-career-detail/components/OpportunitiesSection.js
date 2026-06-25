"use client";

import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiGrid,
  FiShield,
  FiCpu,
  FiBook,
  FiTrendingUp,
  FiZap,
  FiHeart,
  FiBookOpen,
} from "react-icons/fi";
import CustomImage from "../../../components/common/ImageMedia";

export default function OpportunitySection(props) {
  const [openIndex, setOpenIndex] = useState(0);
  return (props?.opportunities ?
    <section className="relative overflow-hidden bg-slate-50/50 py-24 border-t border-slate-100">
      {/* Dot Grid background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#9d2ba803_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-5">
        {/* HEADING */}
        <span className="text-xs font-bold tracking-widest text-[#A02BAA] uppercase mb-3 block">
          Market Outlook
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Explore Opportunities
        </h2>

        {/* ACCORDION */}
        {props?.opportunities && props?.opportunities?.length ?
          <div className="mt-8 space-y-4">
            {props?.opportunities.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300 hover:border-purple-500/20"
              >
                {/* TOP */}
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 border border-purple-100/50 shadow-sm transition-transform duration-300 group-hover:scale-108 overflow-hidden">
                      <CustomImage className="rounded-xl" alt={item.name_en} img={item?.icon} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-800 transition-colors duration-200">
                      {item.name_en}
                    </h3>
                  </div>

                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${openIndex === index
                    ? "rotate-180 bg-[#A02BAA] text-white shadow-md shadow-purple-100"
                    : "bg-purple-50/80 text-[#80188E] group-hover:bg-purple-100/50"
                    }`}>
                    <FiChevronDown size={18} />
                  </div>
                </button>

                {/* CONTENT */}
                <div
                  className={`grid transition-all duration-300 ${openIndex === index
                    ? "grid-rows-[1fr] opacity-100 border-t border-slate-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-5 text-sm leading-relaxed text-slate-500 text-justify">
                      {item.description_en}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> : null}

        {/* NEXT STEP */}
        <div className="mt-24 text-center">
          <span className="text-xs font-bold tracking-widest text-[#A02BAA] uppercase mb-3 block">
            Next Phase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Take the Next Step
          </h2>
        </div>

        {/* CARDS */}
        {props?.nextStep_en && props?.nextStep_en?.length ?
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {props?.nextStep_en.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${index === 0 ? 'bg-indigo-50/50 border border-indigo-100/85 hover:border-indigo-300 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.12)]' :
                    index === 1 ? 'bg-emerald-50/50 border border-emerald-100/85 hover:border-emerald-300 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.12)]' :
                      index === 2 ? 'bg-orange-50/50 border border-orange-100/85 hover:border-orange-300 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.12)]' :
                        'bg-rose-50/50 border border-rose-100/85 hover:border-rose-300 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.12)]'
                    } rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
                >
                  <div>
                    {/* ICON */}
                    <div className="flex h-12 w-12 border border-slate-200/50 bg-white items-center justify-center rounded-xl shadow-sm overflow-hidden">
                      <CustomImage className="rounded-xl object-contain" alt={item.name} img={item?.icon} />
                    </div>

                    {/* CONTENT */}
                    <h3 className="text-lg font-bold text-gray-900 mt-5 tracking-tight">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500 text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div> : null}
      </div>
    </section> : null
  );
}