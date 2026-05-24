import { useEffect, useState } from "react";
import Link from "next/link";
import NoRecordFound from "../../../components/common/NoRecordFound";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";

import { courseTopicsBySubject } from "@/services/authService";
import { getFromStorage, saveToStorage, getSlug } from "@/utils/index";
import { ChevronRight, Layers, FileText, CheckCircle2, PlayCircle } from "lucide-react";

const CourseTopics = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = {
        subjectId: getFromStorage("subjectId"),
      };
      const res = await courseTopicsBySubject(payload);
      setData(res?.data || []);
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
            {data?.length > 0 ? (
              <div className="mx-auto max-w-[1000px]">

                {/* HEADER */}
                <div className="mb-10 rounded-[12px] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#eaeaea]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-primary">
                          <Layers size={14} />
                          Course Topic
                        </span>
                      </div>
                      <h1 className="text-[32px] md:text-[38px] font-black tracking-tight text-[#1a1a1a] leading-tight">
                        {data?.[0]?.subjectName_en || "Subject Topics"}
                      </h1>
                      <p className="mt-2 text-[15px] font-medium text-[#666]">
                        Master the fundamentals with structured lessons and practical resources.
                      </p>
                    </div>

                    <div className="shrink-0">
                      <div className="flex flex-col items-center justify-center rounded-[20px] bg-[#f8f6fb] p-5 border border-[#ececec]">
                        <span className="text-[32px] font-black text-primary">{data?.length}</span>
                        <span className="text-[13px] font-bold text-[#666] uppercase tracking-wide">Total Topics</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TOPICS LIST */}
                <div className="flex flex-col gap-4">
                  {data?.map((topic, index) => (
                    <Link
                      href={`/course-topic-contents/${getSlug(topic?.name_en)}`}
                      key={topic?.id || index}
                      onClick={() => saveToStorage("topicId", topic?.id)}
                      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-[12px] border border-[#ececec] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A126DB]/30 hover:shadow-[0_12px_30px_rgba(161,38,219,0.08)]"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex flex-1 items-start md:items-center gap-5">

                        {/* NUMBER BOX */}
                        <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-primary/5 text-[20px] font-black text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                          {index + 1}
                        </div>

                        {/* ICON (Optional) */}
                        {topic?.icon && (
                          <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[16px] border border-[#f0f0f0] bg-[#f9f9f9]">
                            <CustomImage
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              img={topic?.icon}
                              alt={topic?.name_en}
                            />
                          </div>
                        )}

                        {/* CONTENT */}
                        <div className="flex flex-col">
                          <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#A126DB] line-clamp-2">
                            {topic?.name_en}
                          </h3>

                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1.5 rounded-full bg-[#f4f4f4] px-3 py-1 text-[12px] font-semibold text-[#555]">
                              <FileText size={14} className="text-[#888]" />
                              {topic?.contentCount} Resources
                            </span>

                            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-600">
                              <CheckCircle2 size={14} className="text-emerald-500" />
                              Active Topic
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE / ACTION BUTTON */}
                      <div className="flex shrink-0 items-center gap-4 border-t border-[#f0f0f0] pt-4 md:border-0 md:pt-0">
                        <span className="text-[14px] font-bold text-[#888] transition-colors group-hover:text-[#A126DB]">
                          View Contents
                        </span>
                        <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#f8f6fb] text-[#A126DB] transition-all duration-300 group-hover:bg-[#A126DB] group-hover:text-white group-hover:scale-110">
                          <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
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

export default CourseTopics;