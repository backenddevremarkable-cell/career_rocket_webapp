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


  return ( analytics ?
    <section className="relative overflow-hidden bg-gradient-to-r from-fuchsia-700 via-purple-700 to-violet-700 py-20 px-6 lg:px-20">
      
      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-pink-500/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[320px] h-[320px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        
        {/* Left */}
        <div>
          <span className="inline-block px-5 py-2 text-xs tracking-[2px] uppercase rounded-full bg-white/10 border border-white/20 text-white mb-6 backdrop-blur-md">
            Career Blueprint
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
             {props?.name_en}
          </h1>

          <p className="text-white/80 text-lg mt-7 leading-8 max-w-xl line-clamp-6 text-justify">
             {props?.description_en}
          </p>

          {props?.description_en && (
          <button
            onClick={() => setOpen(true)}
            className="mt-3 text-white/75 cursor-pointer font-semibold"
          >
            More Info.
          </button>
        )}

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="group px-5 h-14 rounded-2xl bg-white text-purple-700 font-semibold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-xl">
              <FaPlay className="group-hover:rotate-12 transition-all" />
              Unlock Blueprint
            </button>

            <button className="px-5 h-14 rounded-2xl border border-white/30 text-white font-medium flex items-center gap-3 hover:bg-white/10 transition-all duration-300 backdrop-blur-xl">
              <FaChartLine />
              5 Min Read
            </button>

            <button className="px-5 h-14 rounded-2xl border border-white/30 text-white font-medium flex items-center gap-3 hover:bg-white/10 transition-all duration-300 backdrop-blur-xl">
              <FaVolumeUp />
              Free Preview
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[10px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  Market Analysis
                </p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                  Snapshot {analytics?.snapshotYear}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                <FaChartLine className="text-purple-600" />
              </div>
            </div>

            <div className="mt-8">
               <div>
  {/* Top Content */}
  <div className="flex justify-between mb-3">
    <span className="text-gray-500">
      Annual Compensation
    </span>

    <span className="font-bold text-purple-700">
      {min} - {max}
    </span>
  </div>

  {/* Progress Bar */}
  <div className="w-full h-[10px] bg-gray-300 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-700 transition-all duration-500"
      style={{ width: `${rangePercent}%` }}
    />
  </div>
</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-2xl border border-gray-200 p-5 bg-purple-50">
                <p className="text-xs text-gray-400 uppercase">
                  Growth
                </p>
                <h4 className="text-[18px] font-bold text-fuchsia-700 mt-2">
                  +{analytics?.growth?.percentage}% {analytics?.growth?.type}
                </h4>
              </div>

              <div className="rounded-2xl border border-gray-200 p-5 bg-violet-50">
                <p className="text-xs text-gray-400 uppercase">
                  Entry Level
                </p>
                <h4 className="text-[18px] font-bold text-violet-700 mt-2">
                  {analytics?.entryLevel}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {analytics?.tags.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

    { open && (
      <Modal setOpen={setOpen} heading={props?.name_en} description={props?.description_en} />
    )}
    
    </section> : null
  );
}