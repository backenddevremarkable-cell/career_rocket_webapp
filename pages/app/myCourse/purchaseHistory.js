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
                                    Purchase History
                                </h1>
                                <p className="mt-2 text-[15px] font-medium text-[#666]">
                                    Order & Payment Historyy
                                </p>
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