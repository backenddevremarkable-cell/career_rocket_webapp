"use client";

import Image from "next/image";
import {
  FaChartLine,
  FaCloud,
  FaShieldAlt,
  FaMicrochip,
  FaCode,
  FaBookOpen,
  FaLaptopCode,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import CustomImage from "../../../components/common/ImageMedia";
import { useState } from "react";

export default function CareerInsights(props) {

  const [playVideo, setPlayVideo] = useState(false);
  const demandIntensity =
    props?.market_outlook?.demandIntensity?.toLowerCase();

  const intensityConfig = {
    low: {
      width: "35%",
      color: "#ef4444",
    },
    mid: {
      width: "65%",
      color: "#f59e0b",
    },
    medium: {
      width: "65%",
      color: "#f59e0b",
    },
    high: {
      width: "88%",
      color: "#9F23A8",
    },
  };

  const current =
    intensityConfig[demandIntensity] || {};
  return (props?.workNature ?
    <section className="relative overflow-hidden w-full bg-slate-50/50 py-24 px-4 md:px-10 border-b border-slate-100">
      {/* Grid Dot Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#9d2ba803_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* TOP 2 CARDS */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_40px_-15px_rgba(160,43,170,0.05)] transition-all duration-300">

            {/* Heading */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                <FaCode className="text-[#80188E] text-sm" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Work Nature & Reality
              </h2>
            </div>

            {/* ITEMS */}
            <div className="space-y-6">

              {props?.workNature && props?.workNature.length ?
                props?.workNature.map((item, key) => (
                  <div key={key} className="flex gap-5 items-start p-4 rounded-xl hover:bg-slate-50/80 transition-colors duration-200 border border-transparent hover:border-slate-100">
                    <div className="min-w-[48px] h-[48px] rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100/50 shadow-sm overflow-hidden">
                      <CustomImage className="rounded-xl object-contain" alt={item.name_en} img={item.icon} />
                    </div>

                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
                        {item.name_en}
                      </h3>

                      <p className="text-sm text-slate-500 leading-relaxed mt-1.5 text-justify">
                        {item.description_en}
                      </p>
                    </div>
                  </div>
                )) : null}

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_40px_-15px_rgba(160,43,170,0.05)] transition-all duration-300">

            {/* TOP */}
            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                  <FaChartLine className="text-[#80188E] text-sm" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Market Outlook
                </h2>
              </div>

              <span className="px-3.5 py-1.5 uppercase rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold tracking-wider border border-emerald-500/20 shadow-sm">
                {props?.market_outlook?.growthTag}
              </span>
            </div>

            {/* DEMAND */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-slate-400 text-sm">
                Demand Intensity
              </span>
              <span className="text-xl font-extrabold bg-gradient-to-r from-[#A02BAA] to-[#80188E] bg-clip-text text-transparent">
                {props?.market_outlook?.demandIntensity}
              </span>
            </div>

            {/* BAR */}
            <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200/50 overflow-hidden mt-3 shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(160,43,170,0.4)]"
                style={{
                  width: current.width || "0%",
                  backgroundColor: current.color || "#ccc",
                }}
              />
            </div>

            {/* QUOTE */}
            <p className="text-sm text-slate-500 leading-relaxed mt-6 text-justify">
              {props?.market_outlook?.description}
            </p>

            {/* BOTTOM TAGS */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
                Target Sectors
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {props?.market_outlook?.domains.map((item, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100/50 text-slate-650 border border-slate-200/50 hover:bg-slate-100 transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="text-center mt-24">
          <span className="text-xs font-bold tracking-widest text-[#A02BAA] uppercase mb-3 block">
            Curated Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Recommended Learning
          </h2>

          <p className="text-slate-500 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Selected educational foundations for industry readiness.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[6px] group border border-slate-200/50 shadow-lg bg-black">
          <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden">
            <CustomImage alt="career video masterclass" className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-[1.03] rounded-[12px]" img={`${props?.videoThumbnail}?q=80&w=2070`} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setPlayVideo(true)}
              className="relative z-10 w-20 h-20 rounded-full bg-[#A02BAA] text-white text-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(160,43,170,0.6)] cursor-pointer hover:bg-purple-700"
            >
              <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-25" />
              <FaPlay className="ml-1 relative z-10" />
            </button>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/10 shadow-sm">
              MASTERCLASS
            </span>

            <h3 className="text-white text-2xl md:text-4xl font-extrabold mt-5 tracking-tight leading-tight">
              {props?.videoTitle}
            </h3>

            <p className="text-slate-300 mt-3 text-sm md:text-base font-medium">
              15 Hours • Career Growth • Industry Experts
            </p>
          </div>
        </div>

        {/* Video Modal */}
        {playVideo && (
          <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl">

              {/* Close Button */}
              <button
                onClick={() => setPlayVideo(false)}
                className="absolute -top-10 right-2 text-white/80 hover:text-white text-2xl cursor-pointer p-2 transition-colors flex items-center gap-2 font-semibold"
              >
                <FaTimes />
                <span className="text-sm">Close</span>
              </button>

              {/* Video */}
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`${props?.videoUrl}?autoplay=1`}
                  title="Career Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM CARD */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200/50 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_40px_-15px_rgba(160,43,170,0.05)] transition-all duration-300">

          {/* TITLE */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
              <FaGraduationCap className="text-[#80188E] text-lg" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Eligibility & Requirements
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 mt-8 border-t border-slate-100 pt-10">

            {/* LEFT */}
            <div className="lg:col-span-7">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-6">
                Education Pathways
              </h3>

              <div className="space-y-6">
                {props?.educationPath_en && props?.educationPath_en.length ?

                  props?.educationPath_en.map((item, key) => (

                    <div key={key} className="flex gap-5 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 border border-transparent hover:border-slate-100">
                      <div className="min-w-[48px] h-[48px] rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/60 shadow-sm overflow-hidden">
                        <CustomImage className="rounded-xl object-contain" alt={item?.name} img={item.icon} />
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                          {item?.name}
                        </h4>

                        <p className="text-sm text-slate-500 leading-relaxed mt-2">
                          {item?.description}
                        </p>
                      </div>
                    </div>)) : null}

              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-6">
                Core Technical Skills
              </h3>

              {props?.skills && props?.skills.length ?
                <div className="flex flex-wrap gap-2.5">
                  {props?.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-500/5 text-[#b012df] text-xs font-semibold border border-purple-500/10 hover:bg-purple-500/10 hover:border-purple-500/30 hover:scale-103 transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div> : null}
            </div>

          </div>
        </div>

      </div>
    </section> : null
  );
}