"use client";

import { FiGrid, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import Search from "../common/Search";
import Link from "next/link";
import { suffleCategory } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {

  const { setHomeCareer, homeCareer } = useDataStore((state) => state);
  const [data, setData] = useState(homeCareer);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await suffleCategory();
      const responseData = res?.data || [];
      setData(responseData);
      setHomeCareer(responseData);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data) fetchData();
  }, []);

  const categoriesStyle = [
    { base: "border-fuchsia-500/25 bg-fuchsia-50 text-fuchsia-700 hover:border-fuchsia-500/50 hover:bg-fuchsia-100 hover:text-fuchsia-800", dot: "bg-fuchsia-500" },
    { base: "border-emerald-500/25 bg-emerald-50 text-emerald-700 hover:border-emerald-500/50 hover:bg-emerald-100 hover:text-emerald-800", dot: "bg-emerald-500" },
    { base: "border-amber-500/25 bg-amber-50 text-amber-700 hover:border-amber-500/50 hover:bg-amber-100 hover:text-amber-800", dot: "bg-amber-500" },
    { base: "border-violet-500/25 bg-violet-50 text-violet-700 hover:border-violet-500/50 hover:bg-violet-100 hover:text-violet-800", dot: "bg-violet-500" },
    { base: "border-blue-500/25 bg-blue-50 text-blue-700 hover:border-blue-500/50 hover:bg-blue-100 hover:text-blue-800", dot: "bg-blue-500" },
  ];

  return (
    <section
      id="hero"
      className="hero-bg relative overflow-hidden pt-20 pb-8 md:pt-32 md:pb-14 text-center"
    >

      {/* ── Decorative background blobs ── */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-purple-200/25 blur-3xl md:h-[600px] md:w-[700px]" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-pink-200/20 blur-3xl md:h-64 md:w-64" />
        <div className="absolute bottom-10 left-0 h-40 w-40 rounded-full bg-indigo-200/20 blur-3xl md:h-56 md:w-56" />
      </div> */}

      {/* ── Fine dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#7c3aed 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">

        {/* Trust badge — animated moving border */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex mb-5 mt-2"
        >
          {/* Outer wrapper: shiny gradient border */}
          <div
            className="relative inline-flex rounded-full p-[1.5px]"
            style={{
              background: "linear-gradient(135deg, #c084fc, #f9a8d4, #818cf8, #c084fc)",
            }}
          >
            {/* Inner pill content */}
            <div className="relative inline-flex items-center gap-2 rounded-full bg-purple-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#9F23A8]">
              <HiSparkles className="text-[#9F23A8] w-3.5 h-3.5" />
              Science + Human Intelligence
            </div>
          </div>
        </motion.div>

        {/* Search component (heading + typewriter + search bar) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Search
            isPopup={true}
            placeholder="Search for careers, skills, or industries..."
            heading="Find the career you were"
            Badge={null}
            textSlide={true}
          />
        </motion.div>


        {/* Trending Career Tracks */}
        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="relative w-full mt-10"
          >
            {/* Section header */}
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <FiTrendingUp className="text-[#9F23A8] text-sm animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Trending Career Tracks
              </span>
            </div>

            {/* Fade edge overlays on mobile only */}
            <div className="absolute left-0 top-8 bottom-0 w-6 bg-gradient-to-r from-white/90 to-transparent pointer-events-none z-10 md:hidden" />
            <div className="absolute right-0 top-8 bottom-0 w-6 bg-gradient-to-l from-white/90 to-transparent pointer-events-none z-10 md:hidden" />

            {/* Pills row */}
            <div
              className="flex items-center gap-2.5 overflow-x-auto pt-2 pb-4 px-1 no-scrollbar justify-start md:justify-center md:flex-wrap md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* ALL pill */}
              <Link href="/career-library" className="shrink-0">
                <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-200/80 bg-white/70 backdrop-blur-sm text-slate-600 hover:border-[#9D2BA8]/40 hover:text-[#9D2BA8] hover:bg-[#9D2BA8]/8 hover:scale-[1.04] hover:shadow-md transition-all duration-200 shadow-xs cursor-pointer whitespace-nowrap">
                  <FiGrid className="w-3.5 h-3.5 text-slate-400" />
                  ALL
                </span>
              </Link>

              {/* Dynamic category pills */}
              {data.map((item, i) => {
                const style = categoriesStyle[i % categoriesStyle.length];
                return (
                  <Link
                    key={i}
                    href={`/career-library?search=${encodeURIComponent(item.name_en)}`}
                    className="shrink-0"
                  >
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold border ${style.base} hover:scale-[1.04] hover:shadow-md transition-all duration-200 shadow-xs cursor-pointer whitespace-nowrap`}
                    >
                      {/* <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} /> */}
                      {item.name_en}
                    </span>
                  </Link>
                );
              })}


            </div>

          </motion.div>
        ) : null}

      </div>
    </section>
  );
}