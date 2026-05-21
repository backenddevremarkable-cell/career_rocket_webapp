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
  return ( props?.opportunities ?
    <section className="bg-[#f7f6f8] py-16">
      <div className="mx-auto max-w-5xl px-5">
        {/* HEADING */}
        <h2 className="text-[34px] font-bold text-[#1b1b1b]">
          Explore Opportunities
        </h2>

       {/* ACCORDION */}
       { props?.opportunities && props?.opportunities?.length ?
        <div className="mt-8 space-y-5">
          {props?.opportunities.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[24px] border border-[#eceaf2] bg-white shadow-sm"
            >
              {/* TOP */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf5ff] text-lg text-[#c026d3]">
                     <CustomImage alt={item.name_en} img={item?.icon} />
                  </div>

                  <h3 className="text-[18px] font-semibold text-[#222]">
                    {item.name_en}
                  </h3>
                </div>

                <div className="text-gray-400">
                  {openIndex === index ? (
                    <FiChevronUp size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </div>
              </button>

              {/* CONTENT */}
              <div
                className={`grid transition-all duration-500 ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#f1eff5] px-6 pb-6 pt-5 text-[15px] leading-8 text-gray-500">
                    {item.description_en}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> : null }

        {/* NEXT STEP */}
        <div className="mt-24 text-center">
          <h2 className="text-[48px] font-bold tracking-[-1px] text-[#1b1b1b]">
            Take the Next Step
          </h2>
        </div>

        {/* CARDS */}

      { props?.nextStep_en && props?.nextStep_en?.length ?     
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          { props?.nextStep_en.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`${index == 0 ? 'bg-[#EEF2FF]' : index == 1 ? 'bg-[#ECFDF5]' : index == 2 ? 'bg-[#FFF7ED]' : 'bg-[#FDF2F8]'} line-clamp-8 rounded-[26px] p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                {/* ICON */}
                <div
                  className={`flex h-12 w-12 border-[rgba(0,0,0,0.1)] border-[1px] items-center justify-center rounded-[8px] ${item.iconBg} ${item.iconColor}`}
                >
                    <CustomImage className={'rounded-[10px]'} alt={item.name} img={item?.icon}/>
                </div>

                {/* CONTENT */}
                <div className="mt-6">
                  <h3 className="text-[20px] font-bold text-[#1f1f1f]">
                    {item.name}
                  </h3>

                  <p className="mt-4 text-[14px] leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div> : null }
      </div>
    </section> : null
  );
}