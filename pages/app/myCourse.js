import FooterDashboard from "../../components/FooterDashboard";
import NavDashboard from "../../components/NavDashboard";
import { useDataStore } from "@/store/useDataStore";
import axios from "axios";
import { getSlug, saveToStorage } from "@/utils/index";
import { useEffect, useState } from "react";
import {
  myCourse
} from "@/services/authService";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import NoRecordFound from "../../components/common/NoRecordFound";
import CustomImage from "../../components/common/ImageMedia";
import LoadingScreen from "../../components/common/Loading";

export default function myTest() {

  const { users, myTest, setMytest } = useDataStore((state) => state);
  const [data, setData] = useState(myTest);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("paid");

  const tabs = [
    { id: "paid", label: "Paid Courses" },
    { id: "free", label: "Free Courses" },
    //   { id: "live", label: "Live Classes" },
  ]

  const MyCourse = (e) => {

    if (!e || e?.data.length === 0) {
      return <NoRecordFound />;
    }

    return (
      <div className="space-y-5">

        {e?.data.map((course, index) => (

          <div
            key={course?.id || index}
            className="group relative overflow-hidden rounded-[12px] bg-white p-5 mb-[16px] shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            {/* TOP GLOW */}
            <div className="absolute right-[-40px] top-[-40px] h-[120px] w-[120px] rounded-full bg-primary/10 blur-3xl"></div>

            <div className="relative flex flex-col gap-5 md:flex-row">

              {/* COURSE IMAGE */}
              <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[12px] bg-[#faf7fc] shadow-sm">

                <CustomImage
                  className="rounded-[12px] object-cover"
                  img={course?.icon}
                  alt={course?.courseName_en}
                />

                {/* COURSE TAG */}
                <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-[2px] text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                  Course
                </div>

              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-1 flex-col">

                {/* CATEGORY */}
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-1 py-[5px] text-[12px] font-bold uppercase tracking-[1px] text-primary">
                  {course?.mainCategoryName_en}
                </span>

                {/* TITLE */}
                <h2 className="line-clamp-2 text-[24px] font-extrabold leading-[32px] text-[#1b1028] transition-colors duration-300 group-hover:text-primary">
                  {course?.courseName_en}
                </h2>

                {/* SMALL INFO */}
                <div className="mt-4 flex flex-wrap items-center gap-4">

                  <div className="flex items-center gap-2 rounded-full bg-[#f7f4fa] px-3 py-2">
                    <i className="fa-solid fa-circle-play text-primary text-[12px]"></i>

                    <span className="text-[12px] font-semibold text-[#555]">
                      1/{course?.totalContents} Videos
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-[#f7f4fa] px-3 py-2">
                    <i className="fa-solid fa-calendar-days text-primary text-[12px]"></i>

                    <span className="text-[12px] font-semibold text-[#555]">
                      {course?.totalDays} Days
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-[#fff4f4] px-3 py-2">
                    <i className="fa-solid fa-clock text-[#ff4d4f] text-[12px]"></i>

                    <span className="text-[12px] font-semibold text-[#ff4d4f]">
                      {course?.leftDays} Days Left
                    </span>
                  </div>

                </div>

                {/* PROGRESS HEADER */}
                <div className="mt-6 flex items-center justify-between">

                  <span className="text-[13px] font-semibold text-[#555]">
                    Course Progress
                  </span>

                  <span className="text-[13px] font-bold text-primary">
                    {course?.progressPercent || 0}%
                  </span>

                </div>

                {/* PROGRESS BAR */}
                <div className="mt-2 h-[10px] overflow-hidden rounded-full bg-[#ede7f3]">

                  <div
                    className="relative h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 transition-all duration-500"
                    style={{
                      width: `${course?.progressPercent || 0}%`,
                    }}
                  >
                    <div className="absolute right-0 top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-md"></div>
                  </div>

                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/course-subject/${getSlug(course?.courseName_en)}`}
                    onClick={(e) => {
                      saveToStorage("myCourseId", course?.courseId);
                    }}
                    className="inline-flex h-[48px] items-center justify-center rounded-full bg-primary px-7 text-[14px] font-bold text-white transition-all duration-300 hover:scale-[1.03]"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const renderContent = () => {
    if (data) {
      switch (activeTab) {
        case "free":
          return <MyCourse data={data?.filter(course => !course?.isPaid)} />;
        case "paid":
          return <MyCourse data={data?.filter(course => course?.isPaid)} />;
        case "live":
          return <MyCourse data={data?.filter(course => course?.abc)} />;
        default:
          return null;
      }
    }
  }


  const fetchData = async () => {
    setLoading(true);
    const res = await myCourse();
    setLoading(false);
    setData(res?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        {!loading ?
          <div className="min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              My Courses
            </h2>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-sm md:text-base font-medium rounded-xl transition-all duration-300
              ${activeTab === tab.id
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-white"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-6">
              {renderContent()}
            </div>

          </div>
          : <LoadingScreen isDashboard={true} />}
      </section>
    </main>
  );
}
