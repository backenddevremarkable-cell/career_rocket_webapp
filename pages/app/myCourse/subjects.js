import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";
import NoRecordFound from "../../../components/common/NoRecordFound";
import { subjectFromCourse } from "@/services/authService";
import { getFromStorage, getSlug, saveToStorage } from "@/utils/index";

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
    <main className="min-h-screen bg-[#f5f7fb]">
      <section className="pb-10 pt-[80px] lg:ml-[255px] lg:px-4">

        {!loading ? (

          <>

            {data?.formattedData?.length > 0 ? (

              <div className="mx-auto max-w-[1100px]">

                {/* PAGE TITLE */}
                <div className="mb-6 flex flex-col gap-2">
                  <h1 className="text-[28px] font-black text-[#1a1a1a]">
                    Continue Learning
                  </h1>

                  <p className="text-[14px] text-[#7a7a7a]">
                    Track your progress and continue your enrolled course subjects.
                  </p>

                </div>

                {/* TOP PROGRESS CARD */}
                <div className="relative overflow-hidden rounded-[12px] bg-gradient-to-r from-[#7b2ff7] to-[#9F23A8] p-5 shadow-[0_15px_50px_rgba(123,47,247,0.22)]">

                  {/* GLOW */}
                  <div className="absolute right-[-40px] top-[-40px] h-[160px] w-[160px] rounded-full bg-white/10 blur-3xl"></div>
                  <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    {/* LEFT */}
                    <div className="flex gap-4">

                      {/* IMAGE */}
                      <div className="h-[90px] w-[90px] overflow-hidden rounded-[12px] border border-white/20 bg-white/10 backdrop-blur">

                        <CustomImage
                          className="h-full w-full object-cover"
                          img={data?.contentThumbnailImage}
                          alt={data?.lastViewContentName_en}
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-col justify-center">
                        <h2 className="text-[22px] font-black text-white">
                          {data?.lastViewContentName_en}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-white/90">

                          <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold backdrop-blur">
                            {data?.progressPercentage}% Completed
                          </span>

                          <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold backdrop-blur">
                            {data?.leftDays} Days Remaining
                          </span>

                          <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold backdrop-blur">
                            {data?.completedVideoCount}/{data?.courseContentCount} Videos
                          </span>

                        </div>

                        {/* PROGRESS BAR */}
                        <div className="mt-4 h-[10px] w-full max-w-[420px] overflow-hidden rounded-full bg-white/20">

                          <div
                            className="h-full rounded-full bg-white transition-all duration-500"
                            style={{
                              width: `${data?.progressPercentage || 0}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                    </div>

                    {/* BUTTON */}
                    <div className="flex items-center">

                      <Link
                        href="/my-course"
                        className="inline-flex h-[52px] items-center justify-center rounded-full bg-white px-7 text-[14px] font-bold text-primary shadow-lg transition-all duration-300 hover:scale-[1.03]"
                      >
                        Continue Course
                      </Link>

                    </div>

                  </div>

                </div>

                {/* SUBJECT LIST */}
                <div className="mt-8 grid gap-5">

                  {data?.formattedData?.map((subject, index) => (

                    <Link
                      href={`/course-subject-topics/${getSlug(subject?.subjectName_en)}`}
                      onClick={()=>saveToStorage('subjectId', subject?.subjectId)}
                      key={subject?.subjectId || index}
                      className="group flex items-center justify-between rounded-[22px] border border-[#ececec] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
                    >

                      {/* LEFT */}
                      <div className="flex items-center gap-4">

                        {/* ICON */}
                        <div className="flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-[18px] bg-[#f6f3fb]">

                          <CustomImage
                            className="h-full w-full rounded-[12px] object-cover"
                            img={subject?.icon}
                            alt={subject?.subjectName_en}
                          />

                        </div>

                        {/* TITLE */}
                        <div>

                          <h3 className="text-[17px] font-bold text-[#1f1f1f] transition-all duration-300 group-hover:text-primary">
                            {subject?.subjectName_en}
                          </h3>

                          <div className="mt-2 flex items-center gap-3">

                            <span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-[11px] font-semibold text-[#666]">
                              {subject?.topicCount} Topics
                            </span>

                            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                              Active Learning
                            </span>

                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3">
                        <span className="hidden text-[13px] font-semibold text-[#777] md:block">
                          Start Learning
                        </span>

                        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-300 group-hover:scale-110">
                          →
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