"use client";
import { withAuth } from '../../../utils/withAuth';
import { useDataStore } from "@/store/useDataStore";
import { getSlug, saveToStorage } from "@/utils/index";
import { useEffect, useState } from "react";
import {
    myCourse
} from "@/services/authService";
import { PlayCircle, CalendarDays, Clock, ChevronRight, BookOpen } from "lucide-react";
import NoRecordFound from "../../../components/common/NoRecordFound";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";
import { Button } from '@headlessui/react';
import { useRouter } from 'next/router';

function liveClasses() {

    const { users, myTest, setMytest } = useDataStore((state) => state);
    const [data, setData] = useState(myTest);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("paid");
    const router = useRouter();

    const tabs = [
        { id: "paid", label: "Paid Courses" },
        { id: "free", label: "Free Courses" },
        //   { id: "live", label: "Live Classes" },
    ]

    const MyCourse = (e) => {
        return <NoRecordFound />;
        // return (
        //     <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        //         {e?.data.map((course, index) => (
        //             <div
        //                 key={course?.id || index}
        //                 className="group flex flex-col justify-between overflow-hidden rounded-[12px] bg-white border border-[#eaeaea] shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(161,38,219,0.1)] hover:border-primary/30"
        //             >
        //                 {/* IMAGE HEADER */}
        //                 <div className="relative h-[180px] w-full overflow-hidden bg-[#f8f8f8]">
        //                     <CustomImage
        //                         className="h-full w-full object-cover rounded-[12px] transition-transform duration-700 group-hover:scale-110"
        //                         img={course?.icon}
        //                         alt={course?.courseName_en}
        //                     />
        //                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

        //                     {/* CATEGORY TAG */}
        //                     <div className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary shadow-sm">
        //                         {course?.mainCategoryName_en || "Course"}
        //                     </div>

        //                     {/* COURSE BADGE (Optional) */}
        //                     <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
        //                         <BookOpen size={16} />
        //                     </div>
        //                 </div>

        //                 {/* BODY */}
        //                 <div className="flex flex-1 flex-col p-6">
        //                     <h2 className="mb-4 line-clamp-2 text-[20px] font-extrabold leading-tight text-[#1a1a1a] transition-colors group-hover:text-primary">
        //                         {course?.courseName_en}
        //                     </h2>

        //                     <div className="mb-6 grid grid-cols-2 gap-3">
        //                         <div className="flex items-center gap-2 text-[#666]">
        //                             <PlayCircle size={16} className="text-primary/70" />
        //                             <span className="text-[13px] font-semibold">1/{course?.totalContents} Videos</span>
        //                         </div>
        //                         <div className="flex items-center gap-2 text-[#666]">
        //                             <CalendarDays size={16} className="text-primary/70" />
        //                             <span className="text-[13px] font-semibold">{course?.totalDays} Days</span>
        //                         </div>
        //                         <div className="flex items-center gap-2 text-[#666]">
        //                             <Clock size={16} className="text-rose-500/70" />
        //                             <span className="text-[13px] font-semibold text-rose-500">{course?.leftDays} Days Left</span>
        //                         </div>
        //                     </div>

        //                     <div className="mt-auto">
        //                         <div className="mb-2 flex items-center justify-between">
        //                             <span className="text-[13px] font-bold text-[#555]">Progress</span>
        //                             <span className="text-[13px] font-bold text-primary">{course?.progressPercent || 0}%</span>
        //                         </div>
        //                         <div className="h-[8px] w-full overflow-hidden rounded-full bg-[#f0e6f7]">
        //                             <div
        //                                 className="h-full rounded-full bg-gradient-to-r from-primary to-[#d06deb]"
        //                                 style={{ width: `${course?.progressPercent || 0}%` }}
        //                             ></div>
        //                         </div>

        //                         <div className="mt-6">
        //                             <Button
        //                                 onClick={() => { saveToStorage("myCourseId", course?.courseId); router.push(`/course-subject/${getSlug(course?.courseName_en)}`) }}
        //                                 className="group/btn cursor-pointer relative flex h-[48px] w-full items-center justify-center overflow-hidden rounded-full bg-[#f8f5fc] px-6 font-bold text-primary transition-all hover:bg-primary hover:text-white"
        //                             >
        //                                 <span className="relative z-10 flex items-center gap-2">
        //                                     Continue Learning
        //                                     <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
        //                                 </span>
        //                             </Button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // );
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
        //fetchData()
    }, [])

    return (
        <main className="min-h-screen bg-[#F6F4F8]">
            <section className="lg:ml-[255px] pt-[78px] px-4 md:px-8 pb-12">
                {!loading ?
                    <div className="min-h-screen max-w-[1400px] mx-auto">

                        <div className="mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <h1 className="text-[32px] md:text-[38px] font-black tracking-tight text-[#1a1a1a]">
                                    Live Classes
                                </h1>
                                <p className="mt-2 text-[15px] font-medium text-[#666]">
                                    Learn live with expert mentors and never miss a step of your progress.
                                </p>
                            </div>

                            {/* Tabs */}
                            <div className="inline-flex rounded-full bg-white p-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#f1edf4]">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative px-6 py-2.5 cursor-pointer text-[14px] font-bold rounded-full transition-all duration-300
                      ${activeTab === tab.id
                                                ? "text-white shadow-md"
                                                : "text-[#666] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
                                            }`}
                                    >
                                        {activeTab === tab.id && (
                                            <div className="absolute inset-0 rounded-full bg-primary" style={{ zIndex: 0 }}></div>
                                        )}
                                        <span className="relative z-10">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-8">
                            <NoRecordFound />
                        </div>

                    </div>
                    : <LoadingScreen isDashboard={true} />}
            </section>
        </main>
    );
}

export default withAuth(liveClasses);