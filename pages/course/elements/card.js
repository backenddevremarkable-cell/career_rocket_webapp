import { FaHourglassEnd, FaIndianRupeeSign, FaVideo } from "react-icons/fa6";
import { saveToStorage } from "@/utils/index";
import { useDataStore } from "@/store/useDataStore";
import { useRouter } from "next/router";

export default function CourseCard({ data, view }) {

  const { setCourseId } = useDataStore((state) => state);
  const router = useRouter();

  const courseDetails = (id) => {
    setCourseId(id);
    saveToStorage("csid", id);
    router.push("/course-detail");
  }

  // Calculate discount percentage
  const discount = data && data.mrp && data.sellPrice && data.mrp > data.sellPrice
    ? Math.round(((data.mrp - data.sellPrice) / data.mrp) * 100)
    : 0;

  return (data ?
    <div
      onClick={() => { courseDetails(data.id) }}
      className="flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group border border-slate-100/80 cursor-pointer mb-6 h-full"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video w-full bg-slate-100">
        {data.bannerImage ? (
          <img
            src={data.bannerImage}
            alt={data.title_en || "course"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 course-img"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-400 font-bold text-sm">
            No Preview Available
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-white/95 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur border border-purple-100/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
            Certificate
          </span>
          {discount > 0 ? (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              {discount}% OFF
            </span>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3
          title={data.title_en}
          className="text-[15px] font-bold text-slate-800 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[42px] mb-2"
        >
          {data.title_en}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-col gap-2.5 my-3 flex-grow">
          <div className="flex items-center text-xs font-semibold text-slate-500">
            <span className="w-5 h-5 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center mr-2">
              <FaVideo size={11} />
            </span>
            <span>{data.CourseModule || '-'} Modules</span>
          </div>

          <div className="flex items-center text-xs font-semibold text-slate-500">
            <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center mr-2">
              <FaHourglassEnd size={11} />
            </span>
            <span>
              {data.validity} {data.validityType === "date" ? 'Date access Available' : 'Days Validity'}
            </span>
          </div>
        </div>

        {/* Footer: Price & Arrow */}
        <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">Price</span>
            <div className="flex items-baseline gap-1.5 font-extrabold">
              {data.isPaid ? (
                data.sellPrice ? (
                  <>
                    <span className="flex items-center text-purple-600 text-lg">
                      <FaIndianRupeeSign className="text-xs mr-0.5 mt-0.5" />
                      {data.sellPrice}
                    </span>
                    {data.mrp > data.sellPrice ? (
                      <span className="line-through text-slate-400 text-xs font-medium flex items-center">
                        <FaIndianRupeeSign className="text-[10px]" />
                        {data.mrp}
                      </span>
                    ) : null}
                  </>
                ) : (
                  <span className="flex items-center text-purple-600 text-lg">
                    <FaIndianRupeeSign className="text-xs mr-0.5 mt-0.5" />
                    {data.mrp}
                  </span>
                )
              ) : (
                <span className="text-emerald-600 text-[13px] px-2.5 py-0.5 bg-emerald-50 rounded-md border border-emerald-100/50">
                  Free
                </span>
              )}
            </div>
          </div>

          <span className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100/80 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div> : null
  );
}