import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug } from "@/utils/index";
import {
  careerById
} from "@/services/authService";
import Link from "next/link";

const Career = () => {

  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const careerId = useDataStore((state) => state?.careerDetail);

  const fetchData = async () => {
    try {
      const res = await careerById({ id: careerId || getFromStorage('cdid') })
      console.log("Career Category Response:", res);
      setdata(res?.data || {});
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-slate-50/50 py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative animate-pulse">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Skeleton */}
            <div className="w-full h-[180px] sm:h-[220px] md:h-[240px] rounded-[12px] bg-slate-200" />

            {/* Main Grid Skeletons */}
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              <div className="space-y-6">
                <div className="h-64 bg-white border border-slate-100 rounded-[12px] p-6" />
                <div className="h-80 bg-white border border-slate-100 rounded-[12px] p-6" />
              </div>
              <div className="space-y-6">
                <div className="h-72 bg-slate-200 rounded-[12px]" />
                <div className="h-48 bg-white border border-slate-100 rounded-[12px] p-6" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="relative bg-slate-50/50 overflow-hidden min-h-screen">
            {/* Dot Grid Background Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#9d2ba803_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-20 left-0 w-80 h-80 bg-purple-100/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-80 h-80 bg-fuchsia-100/10 blur-3xl rounded-full pointer-events-none" />

            {/* HERO SECTION - 240px Dark Set Top Banner */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[240px] overflow-hidden bg-slate-900 z-10 border-b border-slate-800">
              <Image
                src={data?.bannerImage}
                alt={data?.name_en}
                fill
                priority
                className="object-cover opacity-100 scale-105 transition-all duration-700 hover:scale-100"
              />

              {/* PREMIUM OVERLAYS - Horizontal Vignette (dark sides, bright center) */}
              {/* Left side vignette */}
              <div className="absolute inset-y-0 left-0 w-[92%] bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none" />
              {/* Right side vignette */}
              <div className="absolute inset-y-0 right-0 w-[92%] bg-gradient-to-l from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none" />
              {/* Bottom subtle shadow to blend with the border */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
              {/* General light screen tone to ensure readability */}
              <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />

              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_2px)] bg-[size:20px_20px] pointer-events-none" />
              <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none" />

              {/* HERO CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
                {/* BADGES */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                  <span className="px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] sm:text-xs font-semibold uppercase tracking-widest shadow-sm">
                    {data?.carCatName_en}
                  </span>

                  <span
                    className={`px-5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md border shadow-sm uppercase tracking-widest ${data?.demand === 2
                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                      : data?.demand === 1
                        ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                        : "bg-rose-500/10 border-rose-500/25 text-rose-300"
                      }`}
                  >
                    {data?.demand === 2
                      ? "High Demand"
                      : data?.demand === 1
                        ? "Growth"
                        : "Stable"}
                  </span>
                </div>

                {/* TITLE */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
                  {data?.name_en}
                </h1>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
              <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                {/* LEFT CONTENT */}
                <div className="space-y-8">
                  {/* OVERVIEW */}
                  <div
                    className="
                      relative overflow-hidden
                      rounded-[12px]
                      bg-white/90 backdrop-blur-xl
                      border border-slate-200/50
                      p-8
                      shadow-sm
                      hover:shadow-md
                      transition duration-300
                    "
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-50 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div
                        className="
                          w-12 h-12 rounded-2xl
                          bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-100/50 flex items-center justify-center
                          text-[#840d8d] text-xl font-bold shadow-inner
                        "
                      >
                        📘
                      </div>

                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Career Overview
                        </p>

                        <h2 className="text-xl font-bold text-slate-800">
                          Overview
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-[15px] md:text-[16px] relative z-10">
                      {data?.description_en}
                    </p>
                  </div>

                  {/* RESPONSIBILITIES */}
                  <div
                    className="
                      relative overflow-hidden
                      rounded-[12px]
                      bg-white/90 backdrop-blur-xl
                      border border-slate-200/50
                      p-8
                      shadow-sm
                      hover:shadow-md
                      transition duration-300
                    "
                  >
                    <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-fuchsia-50/50 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div
                        className="
                          w-12 h-12 rounded-2xl
                          bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-100/50 flex items-center justify-center
                          text-[#840d8d] text-xl font-bold shadow-inner
                        "
                      >
                        💼
                      </div>

                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Daily Activities
                        </p>

                        <h2 className="text-xl font-bold text-slate-800">
                          Roles & Responsibilities
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6 relative pl-6 border-l-2 border-purple-100 z-10">
                      {data?.rolesAndResponsibilities_en
                        ?.split("\n")
                        ?.map((item, i) => (
                          <div key={i} className="relative group/timeline">
                            {/* Bullet Node */}
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#AF26B9] group-hover/timeline:bg-[#AF26B9] transition duration-300 shadow-md flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-100 scale-0 group-hover/timeline:scale-100 transition duration-300" />
                            </div>
                            <div className="transition duration-300">
                              <h3 className="text-[16px] font-bold text-slate-800 group-hover/timeline:text-[#840d8d]">
                                {item}
                              </h3>
                              <p className="mt-1 text-slate-400 text-xs">
                                Key professional responsibility within the industry.
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* ADVANTAGES / DISADVANTAGES */}
                  <div className="grid md:grid-cols-2 gap-7">
                    {/* ADVANTAGES */}
                    <div
                      className="
                        rounded-tr-[12px]
                        bg-white/90 backdrop-blur-xl
                        border border-slate-200/50
                        p-6 md:p-8
                        shadow-sm
                        hover:shadow-md
                        transition duration-300
                        relative overflow-hidden
                      "
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />

                      <h2 className="text-lg font-bold text-emerald-700 mb-6 flex items-center gap-3 pl-2">
                        <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-sm font-bold text-emerald-600">
                          ✓
                        </span>
                        Advantages
                      </h2>

                      <div className="space-y-4 pl-2">
                        {data?.advantage_en?.split("\n")?.map((item, i) => (
                          <div
                            key={i}
                            className="
                              flex items-start gap-4
                              rounded-2xl
                              bg-emerald-50/20 border border-emerald-100/30
                              p-4 hover:bg-emerald-50/40 transition duration-300
                            "
                          >
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">
                              ✓
                            </div>

                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DISADVANTAGES */}
                    <div
                      className="
                        rounded-tr-[12px]
                        bg-white/90 backdrop-blur-xl
                        border border-slate-200/50
                        p-6 md:p-8
                        shadow-sm
                        hover:shadow-md
                        transition duration-300
                        relative overflow-hidden
                      "
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />

                      <h2 className="text-lg font-bold text-rose-700 mb-6 flex items-center gap-3 pl-2">
                        <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100/50 flex items-center justify-center text-sm font-bold text-rose-600">
                          ✕
                        </span>
                        Challenges
                      </h2>

                      <div className="space-y-4 pl-2">
                        {data?.disadvantage_en?.split("\n")?.map((item, i) => (
                          <div
                            key={i}
                            className="
                              flex items-start gap-4
                              rounded-2xl
                              bg-rose-50/20 border border-rose-100/30
                              p-4 hover:bg-rose-50/40 transition duration-300
                            "
                          >
                            <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">
                              ✕
                            </div>

                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:sticky top-24 h-fit space-y-6">
                  {/* INSIGHTS CARD */}
                  <div
                    className="
                      relative overflow-hidden
                      rounded-[12px]
                      bg-slate-900
                      border border-slate-800
                      p-6 md:p-8
                      text-white
                      shadow-xl
                    "
                  >
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-fuchsia-500/20 blur-3xl rounded-full pointer-events-none" />

                    <h2 className="text-lg font-extrabold uppercase tracking-tight mb-6 flex items-center gap-2">
                      Career Insights
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition duration-300">
                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                          Average Salary
                        </p>

                        <div className="flex items-baseline gap-1 mt-1.5">
                          <span className="text-3xl font-extrabold text-white">{data?.avgSalary || "N/A"}</span>
                          <span className="text-xs text-white/50">/ year</span>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition duration-300">
                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                          Eligibility Criteria
                        </p>

                        <h3 className="text-sm font-medium mt-1.5 leading-relaxed text-white/95">
                          {data?.eligibility_en}
                        </h3>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition duration-300">
                        <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                          Category Group
                        </p>

                        <h3 className="text-base font-bold mt-1.5 text-purple-200">
                          {data?.carCatName_en}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* STREAMS */}
                  <div
                    className="
                      rounded-[12px]
                      bg-white/90 backdrop-blur-xl
                      border border-slate-200/50
                      p-6 md:p-8
                      shadow-sm
                      hover:shadow-md
                      transition duration-300
                    "
                  >
                    <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
                      <span className="text-[#840d8d]">🎓</span> Related Academic Streams
                    </h2>

                    <div className="flex flex-wrap gap-2.5">
                      {data?.streams?.map((stream, i) => (
                        <div
                          key={i}
                          className="
                            px-4.5 py-2.5 rounded-2xl
                            bg-purple-50/50 hover:bg-purple-50
                            border border-purple-100/50 hover:border-purple-200
                            text-purple-700 font-semibold text-xs
                            transition duration-300 shadow-sm hover:shadow
                          "
                        >
                          {stream.name_en}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Career;