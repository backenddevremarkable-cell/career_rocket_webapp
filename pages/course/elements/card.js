import Link from "next/link";
import { FaClock, FaHourglassEnd, FaIndianRupeeSign, FaVideo } from "react-icons/fa6";
import { ImPriceTag } from "react-icons/im";
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

  return (data ?
    <div onClick={() => { courseDetails(data.id) }} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer mb-10">
      {/* Image */}
      <div className="relative">
        {data ?
          <img
            src={data.bannerImage}
            alt="course"
            className="w-full h-44 object-cover group-hover:scale-105 transition duration-300 course-img"
          /> : null}

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
          Certificate
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 mt-3">
          {/* Title */}
          <h3 title={data.title_en} className="text-lg font-semibold text-gray-800 leading-snug group-hover:text-purple-600 transition ellipsis-1 min-h-[50px]">
            {data.title_en}
          </h3>
        </div>

        <div className="flex items-center gap-1 course-modules  mb-3 mt-3">
          <FaVideo /> {'12'} Modules
        </div>


        <div className="flex items-center gap-1 course-day  mb-3 mt-3">
          <FaHourglassEnd />
          {data.validity} {data.validityType == "date" ? ' Date access Available' : ' Days Validity'}
        </div>


        {/* Button */}

        <div className="flex items-center gap-1 course-price">
          <FaIndianRupeeSign className="text-xm" />
          {data.isPaid ? data.sellPrice ?
            <>

              {data.mrp > data.sellPrice ?
                <span className="line-through text-gray-400">
                  {data.mrp}
                </span> : null}

              <span className="font-semibold text-black">
                {data.sellPrice}
              </span>
            </>
            : data.mrp : 'Free'}
        </div>

        {/* <button key={data.id} onClick={()=>{ courseDetails(data.id) }} className="w-full border border-purple-500 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition duration-300 view-course-btn cursor-pointer">
          View Course 
        </button>  */}
      </div>
    </div> : null
  );
}