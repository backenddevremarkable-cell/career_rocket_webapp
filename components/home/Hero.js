import { FiSearch, FiGrid, FiTrendingUp } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import Search from "../common/Search";
import Link from "next/link";
import { suffleCategory } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState, useEffect } from "react";
import CustomImage from "../common/ImageMedia";

export default function Hero() {

  const career = ['pink', 'green', 'orange', 'purple', 'blue']
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
  }

  useEffect(() => {
    if (!data) fetchData()
  }, [])

  //suffleCategory

  return (
    <section id="hero" className="hero-bg relative pt-24 pb-5 md:pt-32 md:pb-34 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <Search isPopup={true} placeholder={`Search for careers, skills, or industries...`} heading={`Find the career you were`} Badge={'SCIENCE + HUMAN INTELLIGENCE'} textSlide={true} />

        {data ?
          <div className="relative w-full mt-14">
            {/* Subtle section header */}
            <div className="flex items-center justify-center gap-1.5 text-[10px]  font-bold tracking-wider text-slate-400 uppercase mb-5">
              <FiTrendingUp className="text-purple-600 animate-pulse text-sm" />
              <span>Trending Career Tracks</span>
            </div>

            {/* Subtle fade overlays to indicate scrolling capability on mobile viewports */}
            <div className="absolute left-0 top-10 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent pointer-events-none z-10 md:hidden"></div>
            <div className="absolute right-0 top-10 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent pointer-events-none z-10 md:hidden"></div>

            {/* Categories flex list - horizontally scrolls on mobile, wraps on desktop */}
            <div
              className="flex items-center gap-3 overflow-x-auto pt-3 pb-6 px-4 no-scrollbar max-w-full justify-start md:justify-center md:flex-wrap md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <Link href={`/career-library`} className="shrink-0">
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200/80 bg-white/60 backdrop-blur-xs text-slate-700 hover:border-[#9D2BA8]/50 hover:text-[#9D2BA8] hover:bg-[#9D2BA8]/10 hover:shadow-lg hover:shadow-[#9D2BA8]/10 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 shadow-xs cursor-pointer whitespace-nowrap">
                  <FiGrid className="w-4.5 h-4.5 text-slate-500" />
                  <span>ALL</span>
                </span>
              </Link>
              {data && data.map((item, i) => {
                const categoriesStyle = [
                  {
                    // Fuchsia
                    base: "border-fuchsia-500/25 bg-fuchsia-500/5 text-fuchsia-700 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 hover:shadow-lg  hover:text-fuchsia-800",
                    dot: "bg-fuchsia-500"
                  },
                  {
                    // Green
                    base: "border-emerald-500/25 bg-emerald-500/5 text-emerald-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-lg  hover:text-emerald-800",
                    dot: "bg-emerald-500"
                  },
                  {
                    // Amber
                    base: "border-amber-500/25 bg-amber-500/5 text-amber-700 hover:border-amber-500/50 hover:bg-amber-500/10 hover:shadow-lg hover:shadow-amber-500/15 hover:text-amber-800",
                    dot: "bg-amber-500"
                  },
                  {
                    // Violet
                    base: "border-violet-500/25 bg-violet-500/5 text-violet-700 hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/15 hover:text-violet-800",
                    dot: "bg-violet-500"
                  },
                  {
                    // Blue
                    base: "border-blue-500/25 bg-blue-500/5 text-blue-700 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/15 hover:text-blue-800",
                    dot: "bg-blue-500"
                  },
                ];
                const style = categoriesStyle[i % categoriesStyle.length];

                return (
                  <Link
                    key={i}
                    href={`/career-library?search=${encodeURIComponent(item.name_en)}`}
                    className="shrink-0"
                  >
                    <span className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold border backdrop-blur-xs ${style.base} hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 shadow-xs cursor-pointer whitespace-nowrap`}>
                      <span>{item.name_en}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div> : null}
      </div>
    </section>
  );
}