import { useEffect, useState } from "react";
import Link from "next/link";

import NoRecordFound from "../../../components/common/NoRecordFound";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";

import { courseTopicsBySubject } from "@/services/authService";
import { getFromStorage, saveToStorage, getSlug } from "@/utils/index";

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
    <main className="min-h-screen bg-[#f5f7fb]">

      <section className="px-4 pb-10 pt-[85px] lg:ml-[255px] lg:px-8">

        {!loading ? (

          <>

            {data?.length > 0 ? (

              <div className="mx-auto">
                {/* HEADER */}
                <div className="mb-8 flex flex-col gap-2">

                  <h1 className="text-[28px] font-black text-[#1d1d1d]">
                    Communication Skills
                  </h1>

                  <p className="text-[14px] text-[#7a7a7a]">
                    Learn communication fundamentals with structured lessons and practical topics.
                  </p>

                </div>

                {/* TOPICS LIST */}
                <div className="grid gap-5">

                  {data?.map((topic, index) => (

                    <Link
                      href={`/course-topic-contents/${getSlug(topic?.name_en)}`}
                      key={topic?.id || index}
                      onClick={() => saveToStorage("topicId", topic?.id)}
                      className="group relative overflow-hidden rounded-[12px] border border-[#ececec] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20]"
                    >

                      {/* GLOW */}
                      <div className="absolute right-[-30px] top-[-30px] h-[120px] w-[120px] rounded-full bg-primary/5 blur-3xl"></div>

                      <div className="relative flex items-center justify-between gap-4">

                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">

                          {/* NUMBER BOX */}
                          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[15px] border border-[#ede7f5] bg-[#faf8fd] text-[18px] font-black text-primary shadow-sm">
                            {index + 1}
                          </div>

                          {/* ICON */}
                          {topic?.icon && (
                            <div className="h-[60px] w-[60px] overflow-hidden rounded-[18px] border border-[#f1edf5] bg-[#faf8fd]">
                              <CustomImage
                                className="h-full w-full object-cover rounded-[18px]"
                                img={topic?.icon}
                                alt={topic?.name_en}
                              />

                            </div>

                          )}

                          {/* CONTENT */}
                          <div className="min-w-0">

                            <h3 className="line-clamp-2 text-[16px] font-bold leading-[24px] text-[#1e1e1e] transition-all duration-300 group-hover:text-primary md:text-[18px]">

                              {topic?.name_en}

                            </h3>

                            <div className="mt-2 flex flex-wrap items-center gap-2">

                              <span className="rounded-full bg-[#f4f4f4] px-3 py-1 text-[11px] font-semibold text-[#666]">
                                {topic?.contentCount} Resources
                              </span>

                              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                                Active Topic
                              </span>

                            </div>

                          </div>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-3">

                          <span className="hidden text-[13px] font-semibold text-[#777] md:block">
                            Start Topic
                          </span>

                          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover:scale-110">
                            →
                          </div>

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