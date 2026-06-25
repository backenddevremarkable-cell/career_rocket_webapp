"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";
import NoRecordFound from "../../../components/common/NoRecordFound";
import { subjectFromCourse } from "@/services/authService";
import { getFromStorage, getSlug, saveToStorage } from "@/utils/index";
import { PlayCircle, Clock, CheckCircle2, ChevronRight, BookOpen, TrendingUp, Sparkles } from "lucide-react";

const Subjects = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = {
        courseId: getFromStorage("myCourseId"),
      };
      const res = await subjectFromCourse(payload);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F4F8]">
      <section className="px-4 pb-12 pt-[80px] lg:ml-[255px] lg:px-8">
        {!loading ? (
          <>
            {data?.formattedData?.length > 0 ? (
              <div className="mx-auto max-w-[1200px]">

                {/* PAGE TITLE */}
                <div className="mb-8">
                  <h1 className="text-[32px] md:text-[38px] font-black tracking-tight text-[#1a1a1a]">
                    Continue Learning
                  </h1>
                  <p className="mt-2 text-[15px] font-medium text-[#666]">
                    Track your progress and dive back into your enrolled subjects.
                  </p>
                </div>

                {/* TOP PROGRESS BANNER */}
                <div className="relative overflow-hidden rounded-[12px] bg-[#0A0514] p-8 md:p-10">
                  {/* MESH GLOWS */}
                  <div className="absolute -right-[100px] -top-[100px] h-[300px] w-[300px] rounded-full bg-[#9F23A8]/90 blur-[80px]"></div>
                  <div className="absolute -bottom-[100px] -left-[100px] h-[300px] w-[300px] rounded-full bg-[#9F23A8]/50 blur-[80px]"></div>
                  <div className="absolute right-1/4 bottom-0 h-[200px] w-[200px] rounded-full bg-[#9F23A8]/20 blur-[60px]"></div>

                  <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">

                      {/* COURSE THUMBNAIL */}
                      <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-[20px] border border-white/10 shadow-lg ring-4 ring-[#A126DB]/20">
                        <CustomImage
                          className="h-full w-full object-cover"
                          img={data?.contentThumbnailImage}
                          alt={data?.lastViewContentName_en}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>

                      {/* STATS & INFO */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A126DB]/30 bg-[#A126DB]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#D68CFF] backdrop-blur-md">
                            <Sparkles size={12} />
                            Currently Learning
                          </span>
                        </div>

                        <h2 className="text-[26px] font-black tracking-tight text-white md:text-[32px] leading-tight">
                          {data?.lastViewContentName_en}
                        </h2>

                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 text-white/80">
                            <CheckCircle2 size={16} className="text-[#A126DB]" />
                            <span className="text-[13px] font-semibold">{data?.progressPercentage}% Completed</span>
                          </div>
                          <div className="hidden h-4 w-[1px] bg-white/20 md:block"></div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Clock size={16} className="text-blue-400" />
                            <span className="text-[13px] font-semibold">{data?.leftDays} Days Left</span>
                          </div>
                          <div className="hidden h-4 w-[1px] bg-white/20 md:block"></div>
                          <div className="flex items-center gap-2 text-white/80">
                            <PlayCircle size={16} className="text-emerald-400" />
                            <span className="text-[13px] font-semibold">{data?.completedVideoCount}/{data?.courseContentCount} Videos</span>
                          </div>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="mt-5 flex items-center gap-4">
                          <div className="h-[8px] w-full max-w-[360px] overflow-hidden rounded-full bg-white/10 backdrop-blur-md">
                            <div
                              className="relative h-full rounded-full bg-gradient-to-r from-[#A126DB] to-[#D68CFF] transition-all duration-700 ease-out"
                              style={{ width: `${data?.progressPercentage || 0}%` }}
                            >
                              <div className="absolute right-0 top-0 h-full w-[20px] animate-pulse bg-white/40 blur-[2px]"></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* RIGHT ACTION */}
                    <div className="shrink-0">
                      <Link
                        href="/app/myCourse"
                        className="group relative inline-flex h-[56px] items-center justify-center overflow-hidden rounded-full bg-white px-8 text-[15px] font-bold text-[#0A0514] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Resume Course
                          <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </div>

                  </div>
                </div>

                {/* SECTION HEADER */}
                <div className="mt-12 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen size={20} />
                    </div>
                    Course Modules
                  </h3>
                  <span className="text-[14px] font-semibold text-[#666] bg-white border border-[#eaeaea] px-4 py-2 rounded-full shadow-sm w-fit">
                    {data?.formattedData?.length || 0} Modules Available
                  </span>
                </div>

                {/* SUBJECT LIST */}
                <div className="grid gap-5 md:grid-cols-2">
                  {data?.formattedData?.map((subject, index) => (
                    <Link
                      href={`/course-subject-topics/${getSlug(subject?.subjectName_en)}`}
                      onClick={() => saveToStorage('subjectId', subject?.subjectId)}
                      key={subject?.subjectId || index}
                      className="group relative overflow-hidden flex flex-col justify-between rounded-[12px] border border-[#ececec] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A126DB]/30 hover:shadow-[0_12px_30px_rgba(161,38,219,0.08)]"
                    >
                      <div className="flex items-start gap-5">
                        {/* ICON */}
                        <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#f8f6fb] ring-1 ring-[#ececec] transition-all group-hover:ring-[#A126DB]/20">
                          <CustomImage
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            img={subject?.icon}
                            alt={subject?.subjectName_en}
                          />
                        </div>

                        {/* INFO */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 ring-1 ring-emerald-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </span>
                          </div>

                          <h3 className="mt-3 text-[18px] font-extrabold leading-snug text-[#1f1f1f] transition-colors group-hover:text-[#A126DB]">
                            {subject?.subjectName_en}
                          </h3>

                          <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-[#666]">
                              <BookOpen size={14} className="text-[#A126DB]/70" />
                              <span className="text-[13px] font-semibold">{subject?.topicCount} Topics</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#666]">
                              <TrendingUp size={14} className="text-blue-500/70" />
                              <span className="text-[13px] font-semibold">In Progress</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM BAR */}
                      <div className="mt-6 pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                        <span className="text-[13px] font-bold text-[#888] transition-colors group-hover:text-[#A126DB]">
                          Start Learning
                        </span>
                        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f8f6fb] text-[#A126DB] transition-all duration-300 group-hover:bg-[#A126DB] group-hover:text-white group-hover:scale-110">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            ) : (
              <NoRecordFound />
            )}
          </>
        ) : (
          <LoadingScreen isDashboard={true} />
        )}
      </section>
    </main>
  );
};

export default Subjects;