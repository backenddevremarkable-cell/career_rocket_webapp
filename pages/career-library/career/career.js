import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug, saveToStorage } from "@/utils/index";

import {
  careerBycatId
} from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/router";

const Career = () => {

    const [page, setPage] = useState(1);
    const [limit,setLimit] = useState(50);
    const { setCareerDetail, setCareerSubList, careerSubList } = useDataStore();
    const careerId = useDataStore((state) => state?.career);
    const [loading,setLoading] = useState(careerSubList ? false : true);
    const [dataObj, setdataObj] = useState(careerSubList);
    const router = useRouter()

    const fetchData = async () => {
        try {
          const res = await careerBycatId({ careerCatId :careerId || getFromStorage('cid'), page : page, limit : limit });
          console.log("Career Category Response:", res);
          setdataObj(res?.data || {});
          setCareerSubList(res?.data)
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }  
  
       useEffect(() => {
          if(!careerSubList) fetchData();
        }, []);


    const handleClick = (item) => {
        setCareerDetail(item?.id)
        saveToStorage("cdid",item?.id)
        router.push(`/career-detail/${getSlug(item.name_en)}`); 
    }   

  return (<>
    { loading ?    
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg font-medium">
            Loading...
          </p>
        </div>
      :
     (<>    
    { dataObj?.bannerImage ? 
      <section className="relative w-full h-[350px] md:h-[300px]">
          <Image
            src={dataObj?.bannerImage}
            alt="Career Library"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {/* <h1 className="text-white text-2xl md:text-4xl font-semibold">
              Career Library
          </h1> */}
          </div>
      </section> : null }

      <section className="bg-gradient-to-br from-[#f8fbff] via-[#f5f7ff] to-[#eef4ff] py-14 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto space-y-8">

    {dataObj?.records && dataObj?.records?.length ? (
      dataObj?.records.map((item) => {

        const demandText =
          item.demand === 0
            ? "Low"
            : item.demand === 1
            ? "Medium"
            : item.demand === 2
            ? "High"
            : "N/A";

        const demandColor =
          item.demand === 0
            ? "from-red-500 to-orange-400"
            : item.demand === 1
            ? "from-yellow-400 to-orange-400"
            : "from-green-500 to-emerald-400";

        return (
          <div
            key={item.id}
            className="
              group relative overflow-hidden
              rounded-[32px]
              bg-white/90 backdrop-blur-xl
              border border-white/50
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]
              transition-all duration-500
              hover:-translate-y-1
              p-6 md:p-10
            "
          >

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100/30 blur-3xl rounded-full" />

            <div className="relative z-10 grid lg:grid-cols-3 gap-8">

              {/* LEFT CONTENT */}
              <div className="lg:col-span-2">

                {/* Top Tag */}
                <span
                  className="
                    inline-flex items-center gap-2
                    mb-5 px-5 py-2
                    rounded-full
                    bg-gradient-to-r from-blue-50 to-indigo-50
                    border border-blue-100
                    text-blue-700
                    text-sm font-semibold
                    shadow-sm
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  {getFromStorage("cname")}
                </span>

                {/* Title */}
                <h2
                  className="
                    text-3xl md:text-4xl
                    font-extrabold
                    text-gray-900
                    uppercase
                    leading-tight
                    tracking-tight
                  "
                >
                  {item.name_en}
                </h2>

                {/* Summary */}
                <p
                  className="
                    mt-6
                    text-gray-600
                    text-[16px]
                    leading-[32px]
                    max-w-3xl
                  "
                >
                  {item.summary_en || "No summary available."}
                </p>

                {/* Salary Section */}
                <div
                  className="
                    mt-8
                    rounded-2xl
                    border border-gray-100
                    bg-gradient-to-r from-gray-50 to-white
                    p-6
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="
                        w-11 h-11 rounded-xl
                        bg-gradient-to-br from-blue-500 to-indigo-600
                        flex items-center justify-center
                        text-white text-lg shadow-lg
                      "
                    >
                      💼
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                      Job & Salary Info
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-[30px]">
                    {item.jobAndSalaryInfo_en ||
                      "Salary details not available."}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-8">
                  <button
                    title={item.name_en}
                    onClick={() => handleClick(item)}
                    className="
                      group/btn
                      inline-flex items-center gap-3
                      rounded-2xl
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      hover:from-indigo-600 hover:to-blue-600
                      px-8 py-4
                      text-white
                      font-semibold
                      text-base
                      shadow-[0_10px_25px_rgba(37,99,235,0.35)]
                      hover:shadow-[0_15px_35px_rgba(37,99,235,0.45)]
                      transition-all duration-300
                      hover:scale-[1.02]
                    "
                  >
                    Explore Career

                    <span
                      className="
                        text-xl
                        transition-transform duration-300
                        group-hover/btn:translate-x-1
                      "
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-5">

                {/* Demand Card */}
                <div
                  className="
                    relative overflow-hidden
                    rounded-3xl
                    bg-white
                    border border-gray-100
                    p-6
                    shadow-md
                  "
                >
                  <div
                    className={`
                      absolute top-0 left-0 h-1 w-full
                      bg-gradient-to-r ${demandColor}
                    `}
                  />

                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Demand Level
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      {demandText}
                    </h3>

                    <div
                      className={`
                        w-14 h-14 rounded-2xl
                        bg-gradient-to-br ${demandColor}
                        flex items-center justify-center
                        text-white text-xl shadow-lg
                      `}
                    >
                      📈
                    </div>
                  </div>
                </div>

                {/* Salary Card */}
                {item.avgSalary ? (
                  <div
                    className="
                      relative overflow-hidden
                      rounded-3xl
                      bg-white
                      border border-gray-100
                      p-6
                      shadow-md
                    "
                  >
                    <div
                      className="
                        absolute top-0 left-0 h-1 w-full
                        bg-gradient-to-r from-purple-500 to-pink-500
                      "
                    />

                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Average Salary
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-3xl font-extrabold text-gray-900">
                        {item.avgSalary}
                      </h3>

                      <div
                        className="
                          w-14 h-14 rounded-2xl
                          bg-gradient-to-br from-purple-500 to-pink-500
                          flex items-center justify-center
                          text-white text-xl shadow-lg
                        "
                      >
                        ₹
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="text-center py-20">
        <div
          className="
            inline-flex flex-col items-center
            rounded-3xl
            bg-white
            px-10 py-14
            shadow-lg
            border border-gray-100
          "
        >
          <div className="text-6xl mb-5">📂</div>

          <h3 className="text-2xl font-bold text-gray-800">
            No Career Data Found
          </h3>

          <p className="mt-3 text-gray-500">
            Please try another category or search keyword.
          </p>
        </div>
      </div>
    )}
  </div>
</section>           
     
    </>)
   }
  </>)
}

export default Career;