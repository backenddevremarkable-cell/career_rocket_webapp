"use client";
import { withAuth } from '../../../utils/withAuth';
import { useDataStore } from "@/store/useDataStore";
import { getSlug, saveToStorage } from "@/utils/index";
import { useEffect, useState } from "react";
import { getLiveClass } from "@/services/authService";
import {
    Video,
    Radio,
    CalendarDays,
    Clock,
    Users,
    ChevronRight,
    Play,
    Wifi,
    BookOpen,
    Sparkles,
    Timer,
    MonitorPlay,
    PackageOpen,
} from "lucide-react";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";
import { useRouter } from 'next/router';

// ─── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_CLASSES = [
    {
        id: 1,
        courseName_en: "UI/UX Masterclass: Design Thinking",
        mainCategoryName_en: "Design",
        icon: null,
        instructor: "Priya Sharma",
        scheduledDate: "2026-05-28",
        scheduledTime: "06:00 PM",
        duration: "90 min",
        totalStudents: 148,
        status: "upcoming",
        zoomLink: "#",
        topic: "Session 4: Wireframing & Prototyping",
    },
    {
        id: 2,
        courseName_en: "Advanced React: Component Patterns",
        mainCategoryName_en: "Development",
        icon: null,
        instructor: "Rahul Verma",
        scheduledDate: "2026-05-27",
        scheduledTime: "08:00 PM",
        duration: "60 min",
        totalStudents: 212,
        status: "live",
        zoomLink: "#",
        topic: "Session 7: Custom Hooks Deep Dive",
    },
    {
        id: 3,
        courseName_en: "Data Science Fundamentals",
        mainCategoryName_en: "Data Science",
        icon: null,
        instructor: "Ankit Gupta",
        scheduledDate: "2026-05-25",
        scheduledTime: "05:00 PM",
        duration: "75 min",
        totalStudents: 95,
        status: "completed",
        zoomLink: "#",
        topic: "Session 3: Pandas & Data Cleaning",
    },
    {
        id: 4,
        courseName_en: "Digital Marketing 101",
        mainCategoryName_en: "Marketing",
        icon: null,
        instructor: "Sneha Kapoor",
        scheduledDate: "2026-05-30",
        scheduledTime: "07:00 PM",
        duration: "45 min",
        totalStudents: 76,
        status: "upcoming",
        zoomLink: "#",
        topic: "Session 2: SEO Strategy & Content",
    },
];

// ─── Status Config ───────────────────────────────────────────────────────────

const STATUS = {
    live: {
        label: "● LIVE NOW",
        bar: "bg-red-500",
        badge: "bg-red-50 text-red-600 border border-red-200",
        pulse: true,
        btnLabel: "Join Class",
        btnClass: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md shadow-red-200 hover:shadow-red-300",
        glow: "ring-2 ring-red-400/30 shadow-[0_0_30px_rgba(239,68,68,0.12)]",
    },
    upcoming: {
        label: "Upcoming",
        bar: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
        badge: "bg-violet-50 text-violet-700 border border-violet-200",
        pulse: false,
        btnLabel: "Set Reminder",
        btnClass: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-200 hover:shadow-violet-300",
        glow: "",
    },
    completed: {
        label: "Completed",
        bar: "bg-slate-300",
        badge: "bg-slate-100 text-slate-500 border border-slate-200",
        pulse: false,
        btnLabel: "Watch Recording",
        btnClass: "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200",
        glow: "",
    },
};

const CATEGORY_COLORS = {
    Design: "from-pink-500 to-rose-500",
    Development: "from-violet-500 to-purple-600",
    "Data Science": "from-blue-500 to-indigo-600",
    Marketing: "from-amber-500 to-orange-500",
};

const getCategoryGradient = (cat) =>
    `bg-gradient-to-br ${CATEGORY_COLORS[cat] || "from-violet-500 to-fuchsia-600"}`;

// ─── Stat Strip ──────────────────────────────────────────────────────────────

function StatStrip({ total, live, upcoming, completed }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
                { label: "Total Classes", value: total, icon: MonitorPlay, color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
                { label: "Live Now", value: live, icon: Radio, color: "text-red-500", bg: "bg-red-50 border-red-100" },
                { label: "Upcoming", value: upcoming, icon: CalendarDays, color: "text-fuchsia-600", bg: "bg-fuchsia-50 border-fuchsia-100" },
                { label: "Completed", value: completed, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className={`rounded-2xl border ${bg} p-5 flex items-center gap-4 bg-white shadow-sm`}>
                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 border`}>
                        <Icon size={18} className={color} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-900">{value}</p>
                        <p className="text-xs font-semibold text-slate-500">{label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Live Class Card ─────────────────────────────────────────────────────────

function LiveClassCard({ item }) {
    const s = STATUS[item?.status] || STATUS.upcoming;

    return (
        <div className={`group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-violet-200/60 ${s.glow}`}>

            {/* Top color bar */}
            <div className={`h-1.5 w-full ${s.bar}`} />

            {/* Header */}
            <div className="flex items-start gap-4 p-5 pb-4">
                {/* Thumbnail / Category Avatar */}
                <div className={`relative w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${getCategoryGradient(item?.mainCategoryName_en)} shadow-md overflow-hidden`}>
                    {item?.icon ? (
                        <CustomImage img={item?.icon} alt={item?.courseName_en} className="w-full h-full object-cover" />
                    ) : (
                        <MonitorPlay size={22} className="text-white" />
                    )}
                    {/* Live pulse dot */}
                    {item?.status === "live" && (
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 ${s.badge}`}>
                        {item?.status === "live" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                        )}
                        {s.label}
                    </span>

                    {/* Course Name */}
                    <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-violet-700 transition-colors">
                        {item?.courseName_en}
                    </h3>

                    {/* Topic */}
                    <p className="text-[12px] text-slate-500 mt-0.5 font-medium line-clamp-1">
                        {item?.topic}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-slate-100" />

            {/* Meta Info */}
            <div className="px-5 py-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <CalendarDays size={13} className="text-violet-500" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Date</p>
                        <p className="text-[12px] font-bold text-slate-700">{item?.scheduledDate}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <Clock size={13} className="text-fuchsia-500" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Time</p>
                        <p className="text-[12px] font-bold text-slate-700">{item?.scheduledTime}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <Timer size={13} className="text-amber-500" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Duration</p>
                        <p className="text-[12px] font-bold text-slate-700">{item?.duration}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <Users size={13} className="text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Students</p>
                        <p className="text-[12px] font-bold text-slate-700">{item?.totalStudents}</p>
                    </div>
                </div>
            </div>

            {/* Instructor strip */}
            <div className="mx-5 mb-4 flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-white text-[11px] font-black flex-shrink-0">
                    {(item?.instructor || "?")[0]}
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Instructor</p>
                    <p className="text-[12px] font-bold text-slate-800">{item?.instructor}</p>
                </div>
                <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-full">
                        <Sparkles size={10} />
                        Expert
                    </span>
                </div>
            </div>

            {/* CTA Button */}
            <div className="px-5 pb-5 mt-auto">
                <button
                    className={`w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${s.btnClass}`}
                >
                    {item?.status === "live" ? <Wifi size={15} /> : item?.status === "completed" ? <Play size={15} /> : <Video size={15} />}
                    {s.btnLabel}
                    <ChevronRight size={15} className="opacity-70" />
                </button>
            </div>
        </div>
    );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-2xl border border-slate-200/80">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mb-5 shadow-inner">
                <PackageOpen size={32} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Live Classes Yet</h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Your scheduled live classes will appear here. Enroll in a course with live sessions to get started.
            </p>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

function LiveClasses() {
    const [data, setData] = useState(MOCK_CLASSES);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getLiveClass();
                if (res?.data && res.data.length > 0) {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Error fetching live classes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingScreen isDashboard={true} />;

    const list = Array.isArray(data) ? data : [];
    const liveCount = list.filter(i => i?.status === "live").length;
    const upcomingCount = list.filter(i => i?.status === "upcoming").length;
    const completedCount = list.filter(i => i?.status === "completed").length;

    const FILTERS = [
        { id: "all", label: "All Classes" },
        { id: "live", label: "Live Now" },
        { id: "upcoming", label: "Upcoming" },
        { id: "completed", label: "Completed" },
    ];

    const filtered = filter === "all" ? list : list.filter(i => i?.status === filter);

    return (
        <main className="min-h-screen bg-[#F6F4F8]">
            <section className="lg:ml-[255px] pt-[78px] px-4 md:px-8 pb-16">
                <div className="max-w-[1400px] mx-auto">

                    {/* ── Header ── */}
                    <div className="mb-8 pt-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-3">
                            <Radio size={12} className="text-violet-600" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-violet-600">My Live Sessions</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-[36px] font-black tracking-tight text-slate-900 leading-tight">
                                    Live Classes
                                </h1>
                                <p className="mt-1.5 text-slate-500 text-sm font-medium">
                                    Join live sessions, interact with mentors and learn in real-time.
                                </p>
                            </div>

                            {/* Filter Pills */}
                            {/* <div className="flex flex-wrap gap-2">
                                {FILTERS.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFilter(f.id)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border ${filter === f.id
                                                ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"
                                            }`}
                                    >
                                        {f.id === "live" && filter !== "live" && liveCount > 0 && (
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 mb-0.5 animate-pulse" />
                                        )}
                                        {f.label}
                                        {f.id !== "all" && (
                                            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-black ${filter === f.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                                                }`}>
                                                {f.id === "live" ? liveCount : f.id === "upcoming" ? upcomingCount : completedCount}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* ── Stat Strip ── */}
                    {/* <StatStrip
                        total={list.length}
                        live={liveCount}
                        upcoming={upcomingCount}
                        completed={completedCount}
                    /> */}

                    {/* ── Cards Grid ── */}
                    {filtered.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {filtered.map((item, index) => (
                                <LiveClassCard key={item?.id || index} item={item} />
                            ))}
                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}

export default withAuth(LiveClasses);