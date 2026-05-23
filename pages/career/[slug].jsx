import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug, saveToStorage } from "@/utils/index";

import {
  careerBycatId
} from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowDownRight, FiArrowRight } from "react-icons/fi";
import SkeletonCareerSub from "../../components/home/skeleton/SkeletonCareerSub";
import NoRecordFound from "../../components/common/NoRecordFound";

const Career = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const { setCareerDetail, setCareerSubList, careerSubList } = useDataStore();
  const careerId = useDataStore((state) => state?.career);
  const [loading, setLoading] = useState(careerSubList ? false : true);
  const [dataObj, setdataObj] = useState(); //careerSubList
  const router = useRouter()

  const fetchData = async () => {
    try {
      const res = await careerBycatId({ careerCatId: careerId || getFromStorage('cid'), page: page, limit: limit });
      console.log("Career Category Response:", res);
      setdataObj(res?.data || {});
      // setCareerSubList(res?.data)
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!dataObj) fetchData();
  }, []);


  const handleClick = (item) => {
    setCareerDetail(item?.id)
    saveToStorage("cdid", item?.id)
    router.push(`/career-detail/${getSlug(item.name_en)}`);
  }

  return (
    <>
      {loading ? (
        <SkeletonCareerSub />
      ) : (
        <>
          {/* HERO SECTION */}
          <div className="relative w-full h-[150px] md:h-[250px] overflow-hidden bg-slate-900">
            <Image
              src={dataObj?.bannerImage}
              alt={getFromStorage("cname")}
              fill
              priority
              className="object-cover opacity-80 scale-105 transition-all duration-700 hover:scale-100"
            />
            {/* Ambient Glows & Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] h-[300px] w-[300px] rounded-full bg-fuchsia-500/20 blur-[120px]"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              <span className="px-4 py-1.5 mb-4 text-xs font-semibold rounded-full bg-white/15 backdrop-blur-md text-purple-100 border border-white/20 tracking-widest uppercase">
                Career Pathways
              </span>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
                {getFromStorage("cname") || "Explore Careers"}
              </h1>
            </div>
          </div>

          <section className="relative bg-slate-50/50 py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Dot Grid Background Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#9d2ba803_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Background Blur Effects */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-100/10 blur-3xl rounded-full pointer-events-none"></div>

            {dataObj?.records && dataObj?.records?.length ? (
              <div className="relative max-w-6xl mx-auto space-y-8 z-10">
                {dataObj?.records.map((item) => (
                  <div
                    key={item.id}
                    className="
                      group relative overflow-hidden
                      rounded-tr-[12px]
                      bg-white/90 backdrop-blur-xl
                      border border-slate-200/50
                      hover:border-purple-500/20
                      shadow-sm
                      hover:shadow-[0_20px_50px_-12px_rgba(132,13,141,0.12)]
                      transition-all duration-500
                      hover:-translate-y-1
                    "
                  >
                    {/* Left Gradient Border Accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#AF26B9] to-purple-300"></div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-50/40 via-transparent to-fuchsia-50/40 pointer-events-none"></div>

                    <div className="relative grid lg:grid-cols-3 gap-8 p-6 md:p-10">
                      {/* LEFT CONTENT */}
                      <div className="lg:col-span-2 flex flex-col justify-between">
                        <div>
                          {/* Badge */}
                          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-100/50 px-4 py-1.5 mb-5 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#AF26B9] animate-pulse"></div>
                            <span className="text-xs font-semibold text-[#840d8d]">
                              {getFromStorage("cname")}
                            </span>
                          </div>

                          {/* Title with dynamic sparkles icon */}
                          <div className="flex items-start gap-4">
                            <div>
                              <h2
                                className="
                                  text-2xl md:text-3xl
                                  font-extrabold
                                  text-slate-900
                                  leading-snug
                                  tracking-tight
                                  group-hover:text-[#840d8d]
                                  transition-colors duration-300
                                "
                              >
                                {item.name_en}
                              </h2>
                            </div>
                          </div>

                          {/* Summary */}
                          <p
                            className="
                              mt-4
                              text-slate-600
                              text-sm md:text-base
                              leading-relaxed
                              max-w-3xl
                            "
                          >
                            {item.summary_en || "No summary available."}
                          </p>

                          {/* Salary Section */}
                          <div
                            className="
                              mt-6
                              rounded-2xl
                              border border-slate-100
                              bg-gradient-to-r from-slate-50/50 to-white
                              p-6
                              relative overflow-hidden
                            "
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#AF26B9] to-purple-600" />
                            <div className="flex items-center gap-3 mb-3 pl-2">
                              <div
                                className="
                                  w-9 h-9 rounded-lg
                                  bg-purple-50
                                  flex items-center justify-center
                                  text-purple-600 text-sm border border-purple-100/50
                                "
                              >
                                💼
                              </div>

                              <h3 className="text-base font-bold text-slate-800">
                                Job & Salary Info
                              </h3>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed pl-2">
                              {item.jobAndSalaryInfo_en ||
                                "Salary details not available."}
                            </p>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="mt-8">
                          <button
                            title={item.name_en}
                            onClick={() => handleClick(item)}
                            className="
                              group/btn
                              inline-flex items-center gap-3
                              rounded-2xl
                              bg-gradient-to-r from-[#AF26B9] to-[#840d8d]
                              hover:from-[#840d8d] hover:to-[#AF26B9]
                              px-7 py-3.5
                              text-white
                              font-semibold
                              cursor-pointer
                              text-sm
                              transition-all duration-300
                              hover:scale-[1.02]
                            "
                          >
                            Explore Career
                            <span className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1.5">
                              <FiArrowRight />
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="flex flex-col gap-5 justify-start">
                        {/* Demand Card */}
                        <div
                          className="
                            relative overflow-hidden
                            rounded-2xl
                            bg-white
                            border border-slate-100
                            p-6
                            shadow-sm
                          "
                        >
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Market Demand
                          </p>

                          <h3 className="mt-3 text-2xl font-extrabold text-slate-800">
                            {item.demand === 0
                              ? "Low"
                              : item.demand === 1
                                ? "Medium"
                                : item.demand === 2
                                  ? "High"
                                  : "N/A"}
                          </h3>

                          {/* Dynamic Market Traction Progress Bar */}
                          <div className="mt-5 space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-slate-500">
                              <span>Market Traction</span>
                              <span>
                                {item.demand === 0 ? "35%" : item.demand === 1 ? "70%" : "100%"}
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden relative">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${item.demand === 0
                                  ? "w-[35%] bg-gradient-to-r from-rose-500 to-red-400"
                                  : item.demand === 1
                                    ? "w-[70%] bg-gradient-to-r from-amber-500 to-orange-400"
                                    : "w-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                  }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Salary Card */}
                        {item.avgSalary ? (
                          <div
                            className="
                              relative overflow-hidden
                              rounded-2xl
                              bg-white
                              border border-slate-100
                              p-6
                              shadow-sm
                            "
                          >
                            <div
                              className="
                                absolute top-0 left-0 h-1 w-full
                                bg-gradient-to-r from-[#AF26B9] to-fuchsia-500
                              "
                            />

                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Average Salary
                            </p>

                            <h3 className="mt-3 text-2xl font-extrabold text-slate-800">
                              {item.avgSalary}
                            </h3>

                            <p className="mt-2 text-xs text-slate-400">
                              Based on industry standards
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoRecordFound />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Career;