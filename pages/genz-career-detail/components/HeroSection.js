"use client";

import { useState } from "react";
import {
  FaPlay,
  FaVolumeUp,
  FaChartLine,
} from "react-icons/fa";
import Modal from "../../../components/common/Modal";
import NoRecordFound from "../../../components/common/NoRecordFound";

export default function HeroSection(props) {

  const [open, setOpen] = useState(false);
  const analytics = props?.market_analytics
  const min = analytics?.annualCompensation?.min || 0;
  const max = analytics?.annualCompensation?.max || 0;

  // Example total scale
  const TOTAL_MAX = 3000000;
  // calculate percentage
  const rangePercent = (max / TOTAL_MAX) * 100;


  return (analytics ?
    <section className="relative overflow-hidden bg-gradient-to-r from-fuchsia-700 via-purple-700 to-violet-700 py-12 sm:py-20 px-4 sm:px-6 lg:px-12">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute left-[-10%] top-[10%] h-[250px] sm:h-[350px] w-[250px] sm:w-[350px] rounded-full bg-white/10 blur-[80px] sm:blur-[110px] pointer-events-none" />
      <div className="absolute right-[-10%] top-[-10%] h-[300px] sm:h-[400px] w-[300px] sm:w-[400px] rounded-full bg-white/10 blur-[90px] sm:blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* Left */}
        <div className="text-left">
          {/* Tagline Badge with spinning gradient border */}
          <div className="relative inline-flex overflow-hidden rounded-full p-[1.5px] mb-6 shadow-[0_4px_12px_rgba(236,72,153,0.2)]">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg,#ffffff_0%,#ec4899_50%,#ffffff_100%)]" />
            <div className="inline-flex items-center justify-center rounded-full bg-[#8a1892]/80 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-3xl gap-2 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400"></span>
              </span>
              Career Blueprint
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-purple-300">
            {props?.name_en}
          </h1>

          <p className="text-white/80 text-sm sm:text-base lg:text-lg mt-5 leading-relaxed max-w-xl text-justify line-clamp-6">
            {props?.description_en}
          </p>

          {props?.description_en && (
            <button
              onClick={() => setOpen(true)}
              className="mt-3 text-xs sm:text-sm text-white/75 hover:text-white font-semibold cursor-pointer transition-colors duration-200 flex items-center gap-1 group"
            >
              Read Full Details
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          )}

          <div style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className="flex flex-nowrap items-center gap-2.5 sm:gap-4 mt-8 w-full overflow-x-auto pb-2 scrollbar-none">
            <button className="shrink-0 group relative overflow-hidden px-4 sm:px-6 h-11 sm:h-13 rounded-xl bg-white text-purple-700 font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-white/10 cursor-pointer">
              <FaPlay className="group-hover:rotate-12 transition-transform duration-300 text-purple-700 text-xs sm:text-sm" />
              <span className="text-xs sm:text-sm">Unlock Blueprint</span>
              {/* shine */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>

            <button className="shrink-0 px-3 sm:px-5 h-11 sm:h-13 rounded-xl border border-white/20 bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/20 hover:border-white/45 transition-all duration-300 backdrop-blur-md cursor-pointer text-xs sm:text-sm">
              <FaChartLine className="text-pink-300 text-xs sm:text-sm" />
              <span>5 Min Read</span>
            </button>

            <button className="shrink-0 px-3 sm:px-5 h-11 sm:h-13 rounded-xl border border-white/20 bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/20 hover:border-white/45 transition-all duration-300 backdrop-blur-md cursor-pointer text-xs sm:text-sm">
              <FaVolumeUp className="text-pink-300 text-xs sm:text-sm" />
              <span>Free Preview</span>
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_50px_rgba(168,85,247,0.1)]">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  Market Analysis
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                  Snapshot {analytics?.snapshotYear}
                </h3>
              </div>

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100 shadow-sm transition-transform duration-300 hover:rotate-6">
                <FaChartLine className="text-purple-650 text-sm sm:text-base" />
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <div>
                {/* Top Content */}
                <div className="flex justify-between mb-2.5 sm:mb-3 items-center">
                  <span className="text-gray-555 text-xs sm:text-sm font-medium">
                    Annual Compensation
                  </span>

                  <span className="font-bold text-purple-750 text-sm sm:text-lg">
                    {min} - {max}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 p-[2px]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                    style={{ width: `${rangePercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="rounded-xl border border-purple-100 p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-white hover:border-purple-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Growth
                </p>
                <h4 className="text-sm sm:text-[16px] font-extrabold text-fuchsia-700 mt-1.5 sm:mt-2">
                  +{analytics?.growth?.percentage}% {analytics?.growth?.type}
                </h4>
              </div>

              <div className="rounded-xl border border-violet-100 p-4 sm:p-5 bg-gradient-to-br from-violet-50 to-white hover:border-violet-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Entry Level
                </p>
                <h4 className="text-sm sm:text-[16px] font-extrabold text-violet-750 mt-1.5 sm:mt-2">
                  {analytics?.entryLevel}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
              {analytics?.tags.map((item, index) => (
                <span
                  key={index}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-500/5 text-[#80188E] border border-purple-200/40 hover:bg-purple-500/10 hover:border-purple-300 transition-all duration-300 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {open && (
        <Modal setOpen={setOpen} heading={props?.name_en} description={props?.description_en} />
      )}

    </section> : null
  );
}