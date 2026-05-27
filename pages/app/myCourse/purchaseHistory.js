"use client";
import { withAuth } from '../../../utils/withAuth';
import { useEffect, useState } from "react";
import { getPurchaseHistory } from "@/services/authService";
import LoadingScreen from "../../../components/common/Loading";
import CustomImage from "../../../components/common/ImageMedia";
import { BASE_URL } from "@/config";
import {
    ShoppingBag,
    CheckCircle2,
    Clock,
    XCircle,
    Receipt,
    TrendingUp,
    IndianRupee,
    Download,
    ExternalLink,
    Calendar,
    Search,
    Filter,
    PackageOpen,
    Award,
    LayoutGrid,
    List,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const STATUS_MAP = {
    completed: {
        label: "Completed",
        icon: CheckCircle2,
        pill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        dot: "bg-emerald-500",
    },
    pending: {
        label: "Pending",
        icon: Clock,
        pill: "bg-amber-50 text-amber-700 border border-amber-200",
        dot: "bg-amber-500",
    },
    failed: {
        label: "Failed",
        icon: XCircle,
        pill: "bg-red-50 text-red-600 border border-red-200",
        dot: "bg-red-500",
    },
};

const getStatus = (status) => {
    const key = (status || "completed").toLowerCase();
    return STATUS_MAP[key] || STATUS_MAP.completed;
};

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "—";
    return `₹${Number(amount).toLocaleString("en-IN")}`;
};

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, gradient, iconBg }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-sm border border-white/60`}>
            {/* decorative blob */}
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} mb-4`}>
                <Icon size={20} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-white/75 mb-1">{label}</p>
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
        </div>
    );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center mb-6 shadow-inner">
                <PackageOpen size={36} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No purchases yet</h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Courses you purchase will appear here with your full order and payment details.
            </p>
        </div>
    );
}

// ─── Receipt Row ─────────────────────────────────────────────────────────────

function ReceiptRow({ item, index }) {
    const status = getStatus(item?.payment_status || item?.status);
    const StatusIcon = status.icon;

    return (
        <tr
            className={`group transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-purple-50/40`}
        >
            {/* Course */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F3E8FF] to-[#FAE8FF] flex items-center justify-center flex-shrink-0 border border-purple-100 overflow-hidden shadow-sm">
                        {item?.thumbnail ? (
                            <CustomImage
                                img={item?.thumbnail}
                                alt={item?.course_title || item?.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Award size={18} className="text-purple-500" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition-colors truncate max-w-[220px]">
                            {item?.course_title || item?.title || "Course"}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                            Order #{item?.order_id || item?.id || "—"}
                        </p>
                    </div>
                </div>
            </td>

            {/* Date */}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="text-sm font-medium">
                        {formatDate(item?.created_at || item?.purchase_date || item?.date)}
                    </span>
                </div>
            </td>

            {/* Amount */}
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-black text-slate-900 tracking-tight">
                    {formatAmount(item?.amount || item?.price)}
                </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${status.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
                    {status.label}
                </span>
            </td>

            {/* Action */}
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[5px] bg-primary text-white text-xs font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                    title="View Receipt"
                >
                    <Receipt size={13} />
                    Receipt
                </button>
            </td>
        </tr>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const MOCK_DATA = [
    {
        id: "ORD-10241",
        order_id: "ORD-10241",
        course_title: "UI/UX Masterclass: Design Thinking",
        thumbnail: null,
        purchase_date: "2026-05-12",
        amount: 4999,
        payment_status: "completed",
    },
    {
        id: "ORD-10198",
        order_id: "ORD-10198",
        course_title: "Advanced React: Component Patterns",
        thumbnail: null,
        purchase_date: "2026-04-08",
        amount: 3499,
        payment_status: "completed",
    },
    {
        id: "ORD-10154",
        order_id: "ORD-10154",
        course_title: "Data Science Fundamentals",
        thumbnail: null,
        purchase_date: "2026-03-15",
        amount: 5999,
        payment_status: "completed",
    },
    {
        id: "ORD-10102",
        order_id: "ORD-10102",
        course_title: "Digital Marketing 101",
        thumbnail: null,
        purchase_date: "2026-02-22",
        amount: 2499,
        payment_status: "completed",
    },
    {
        id: "ORD-10087",
        order_id: "ORD-10087",
        course_title: "Python for Beginners",
        thumbnail: null,
        purchase_date: "2026-01-30",
        amount: 1999,
        payment_status: "pending",
    },
    {
        id: "ORD-10063",
        order_id: "ORD-10063",
        course_title: "Full Stack Web Development",
        thumbnail: null,
        purchase_date: "2026-01-10",
        amount: 7999,
        payment_status: "failed",
    },
];

function PurchaseHistory() {
    const [data, setData] = useState(MOCK_DATA);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getPurchaseHistory();
                if (res?.data && res.data.length > 0) {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Error fetching purchase history:", err);
            } finally {
                setLoading(false);
            }
        };
        // fetchData();
    }, []);

    const list = Array.isArray(data) ? data : [];
    const completed = list.filter(i => (i?.payment_status || i?.status || "").toLowerCase() === "completed" || !(i?.payment_status || i?.status));
    const totalSpent = list.reduce((sum, i) => sum + Number(i?.amount || i?.price || 0), 0);

    const filtered = list.filter((item) => {
        const title = (item?.course_title || item?.title || "").toLowerCase();
        return title.includes(search.toLowerCase());
    });

    if (loading) return <LoadingScreen isDashboard={true} />;

    return (
        <main className="min-h-screen bg-[#F6F4F8]">
            <section className="lg:ml-[255px] pt-[78px] px-4 md:px-8 pb-16">
                <div className="max-w-[1400px] mx-auto">

                    {/* ── Page Header ── */}
                    <div className="mb-5 pt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 border border-purple-200 mb-3">
                                <ShoppingBag size={13} className="text-purple-600" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600">Billing & Orders</span>
                            </div>
                            <h1 className="text-3xl md:text-[36px] font-black tracking-tight text-slate-900 leading-tight">
                                Purchase History
                            </h1>
                            <p className="mt-1.5 text-slate-500 text-sm font-medium">
                                All your orders, payments and receipts — in one place.
                            </p>
                        </div>
                    </div>


                    {/* ── Table Card ── */}
                    <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-sm overflow-hidden">

                        {/* Table */}
                        {filtered.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            {["Course", "Date", "Amount", "Status", "Action"].map((h) => (
                                                <th
                                                    key={h}
                                                    className={`px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50/80 ${h === "Action" ? "text-right" : ""}`}
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filtered.map((item, index) => (
                                            <ReceiptRow key={index} item={item} index={index} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Table Footer */}
                        {filtered.length > 0 && (
                            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <p className="text-xs font-semibold text-slate-400">
                                    Showing {filtered.length} of {list.length} purchases
                                </p>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3].map((n) => (
                                        <button
                                            key={n}
                                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${n === 1
                                                ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-200"
                                                : "bg-white border border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-600"
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}

export default withAuth(PurchaseHistory);