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
  return (
    <section className="w-full bg-[#faf7fb] py-20 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP 2 CARDS */}
        <div className="grid lg:grid-cols-2 gap-7">
          
          {/* LEFT CARD */}
          <div className="bg-white rounded-[12px] border border-[#f1e9f5] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
            
            {/* Heading */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                <FaCode className="text-purple-600 text-sm" />
              </div>

              <h2 className="text-[20px] font-bold text-[#24212a]">
                Work Nature & Reality
              </h2>
            </div>

            {/* ITEMS */}
            <div className="space-y-7">
              
              {/* ITEM */}

            { props?.workNature && props?.workNature.length ?
              props?.workNature.map((item,key)=> ( <div className="flex gap-5">
                <div className="min-w-[45px] h-[45px] rounded-[10px] bg-[#f6ebff] flex items-center justify-center">
                  <CustomImage className={'rounded-[10px]'} alt={item.name_en} img={item.icon} />
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#27222f]">
                      {item.name_en}
                  </h3>

                  <p className="text-[15px] text-[#8a8494] leading-6 mt-1 text-justify">
                    {item.description_en}
                  </p>
                </div>
              </div>
             )) : null }

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-[12px] border border-[#f1e9f5] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
            
            {/* TOP */}
            <div className="flex items-center justify-between mb-8">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FaChartLine className="text-purple-600 text-sm" />
                </div>

                <h2 className="text-[20px] font-bold text-[#24212a]">
                  Market Outlook
                </h2>
              </div>

              <span className="px-4 py-2 uppercase rounded-full bg-[#dcffe8] text-[#23a455] text-[10px] font-bold tracking-wide">
                 {props?.market_outlook?.growthTag}
              </span>
            </div>

            {/* DEMAND */}
            <div className="flex items-center justify-between">
              {/* <span className="text-[#726c7a] text-[15px] font-medium">
                {props?.market_outlook?.growthTag}
              </span> */}

              <span className="color-primary text-[20px] font-bold">
                { props?.market_outlook?.demandIntensity}
              </span>
            </div>

            {/* BAR */}
            <div className="w-full h-[12px] rounded-full bg-[#eee5f3] overflow-hidden mt-2">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: current.width || "0%",
                  backgroundColor: current.color || "#ccc",
                }}
              />
            </div>

            {/* QUOTE */}
            <p className="text-[15px]  text-[#8a8494] leading-7 mt-4 text-justify">
              {props?.market_outlook?.description}
            </p>

            {/* BOTTOM ICONS */}
          <div className="flex flex-wrap gap-3">
            <div className="grid grid-cols-3 gap-6 mt-6">

                {props?.market_outlook?.domains.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-700"
                >
                  {item}
                </span>
              ))}
 
            </div>
            </div>
          </div>
        </div>


         <div className="text-center mt-15">
          <h2 className="text-5xl font-bold text-gray-900">
            Recommended Learning
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            Selected educational foundations for industry readiness.
          </p>
        </div>

         <div className="relative mt-16 overflow-hidden rounded-[12px] group">
         <div style={{ width:'100%', height : 500, margin: 'auto'}}>  
           <CustomImage alt="software engineer" className={`w-full h-[500px] object-cover group-hover:scale-105 transition-all duration-700`} img={`${props?.videoThumbnail}?q=80&w=2070`}/> 
        </div>   

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setPlayVideo(true)}
            className="w-24 h-24 rounded-full bg-fuchsia-600 text-white text-3xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            <FaPlay />
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-10 left-10">
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm">
            MASTERCLASS
          </span>

          <h3 className="text-white text-4xl font-bold mt-5">
             {props?.videoTitle}
          </h3>

          <p className="text-white/80 mt-3 text-lg">
            15 Hours • Career Growth • Industry Experts
          </p>
        </div>
      </div>

      {/* Video Modal */}
      {playVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            
            {/* Close Button */}
            <button
              onClick={() => setPlayVideo(false)}
              className="absolute -top-7 right-0 text-white text-2xl cursor-pointer"
            >
              <FaTimes />
            </button>

            {/* Video */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-3xl">
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
        <div className="mt-10 bg-white rounded-[12px] border border-[#f1e9f5] p-10 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
          
          {/* TITLE */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-xl bg-[#f6ebff] flex items-center justify-center">
              <FaGraduationCap className="text-[#b012df]" />
            </div>

            <h2 className="text-[20px] font-bold text-[#24212a]">
              Eligibility & Requirements
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            
            {/* LEFT */}
            <div>
              <h3 className="text-[14px] uppercase tracking-wide text-[#8a8494] font-semibold mb-6">
                Education Pathways
              </h3>

          <div className="space-y-8">
            { props?.educationPath_en && props?.educationPath_en.length ? 
                
               props?.educationPath_en.map((item,key)=>(
                
                <div className="flex gap-5">
                  <div className="min-w-[45px] h-[45px] rounded-[10px] border-[1px] border-[rgba(0,0,0,0.1)] bg-[#fff] flex items-center justify-center">
                  <CustomImage className={'rounded-[10px]'} alt={item?.name} img={item.icon} />
                </div>
                
                  <div>
                    <h4 className="text-[18px] font-semibold text-[#24212a]">
                       {item?.name}
                    </h4>

                    <p className="text-[15px] text-[#8a8494] leading-6 mt-2">
                       {item?.description}
                    </p>
                  </div>
                </div> )) : null }

              </div>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-[15px] uppercase tracking-wide text-[#8a8494] font-semibold mb-6">
                Core Technical Skills
              </h3>

             { props?.skills && props?.skills.length ?     
              <div className="flex flex-wrap gap-4">
                {props?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full bg-[#f9ecff] text-[#b012df] text-[11px] font-semibold border border-[#f4d6ff] hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </div>
                ))}
              </div> : null }
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}