import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug, saveToStorage } from "@/utils/index";

import {
  careerBycatId
} from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowDownRight, FiArrowRight } from "react-icons/fi";
import SkeletonCareerSub from "../../components/home/skeleton/SkeletonCareerSub";
import NoRecordFound from "../../components/common/NoRecordFound";

const Career = () => {

    const [page, setPage] = useState(1);
    const [limit,setLimit] = useState(50);
    const { setCareerDetail, setCareerSubList, careerSubList } = useDataStore();
    const careerId = useDataStore((state) => state?.career);
    const [loading,setLoading] = useState(careerSubList ? false : true);
    const [dataObj, setdataObj] = useState(); //careerSubList
    const router = useRouter()

    const fetchData = async () => {
        try {
          const res = await careerBycatId({ careerCatId :careerId || getFromStorage('cid'), page : page, limit : limit });
          console.log("Career Category Response:", res);
          setdataObj(res?.data || {});
         // setCareerSubList(res?.data)
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }  
  
       useEffect(() => {
          if(!dataObj) fetchData();
        }, []);


    const handleClick = (item) => {
        setCareerDetail(item?.id)
        saveToStorage("cdid",item?.id)
        router.push(`/career-detail/${getSlug(item.name_en)}`); 
    }   

  return (<>
   { loading ?
     <SkeletonCareerSub/>
     :
  (<>    

        {/* HERO SECTION */}
        <div className="relative w-full
              h-[180px]
              sm:h-[220px]
              md:h-[280px]
              lg:h-[350px]
              xl:h-[260px] overflow-hidden">
      
          <Image
            src={dataObj?.bannerImage}
            alt={getFromStorage("cname")}
            fill
            priority
            className="object-cover scale-105"
          />
      
          {/* PREMIUM OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
      
          {/* HERO CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-center">
      
            <div className="max-w-3xl">
      
              {/* TITLE */}
              <h1
                className="
                text-4xl md:text-6xl
                font-black
                uppercase
                text-white
                leading-tight
                tracking-tight
              "
              >
                {getFromStorage("cname")}
              </h1>
            </div>
          </div>
        </div>
      
                
   <section className="relative bg-gradient-to-b from-[#F6F4F8] to-[#f7f7f7] py-3
      sm:py-5
      md:py-8
      lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">

  {/* Background Blur Effects */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 blur-3xl rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 blur-3xl rounded-full"></div>

  { dataObj?.records && dataObj?.records?.length ?          
  <div className="relative max-w-6xl mx-auto space-y-8">

   { dataObj?.records.map((item) => (
      <div
          key={item.id}
          className="
          group relative overflow-hidden
          rounded-tr-[10px]
          bg-white/80 backdrop-blur-xl
          border-0
          transition-all duration-500
          hover:-translate-y-1
        "
        >

          {/* Left Gradient Border */}
          <div className="absolute -left-[0px] top-0 h-full w-2 bg-gradient-to-b from-[#9F23A8] to-purple-300"></div>

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-50/40 via-transparent to-purple-50/40"></div>

          <div className="relative grid lg:grid-cols-3 gap-10 p-7 md:p-10">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-primary px-5 py-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>

                <span className="text-sm font-semibold color-primary">
                  {getFromStorage("cname")}
                </span>
              </div>

              {/* Title */}
              <h2
                className="
                text-3xl md:text-4xl
                font-extrabold
                text-gray-900
                leading-tight
                tracking-tight
              "
              >
                {item.name_en}
              </h2>

              {/* Summary */}
              <p
                className="
                mt-1
                text-gray-600
                text-[17px]
                leading-8
                max-w-3xl
              "
              >
                {item.summary_en || "No summary available."}
              </p>

              {/* Salary Section */}
              <div
                className="
                mt-5
                rounded-2xl
                bg-gradient-to-r from-gray-50 to-purple-50
                border border-gray-100
                p-6
              "
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Job & Salary Info
                </h3>

                <p className="text-gray-600 leading-8 text-[16px]">
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
                  group/btn relative overflow-hidden
                  inline-flex items-center gap-3
                  rounded-[10px]
                  bg-primary
                  px-8 py-4
                  text-white
                  font-semibold
                  shadow-lg shadow-blue-500/20
                  transition-all duration-300
                  hover:scale-[1.01]
                  cursor-pointer
                "
                >
                  <span className="relative z-10">
                    Explore Career
                  </span>

                  <span className="relative z-10 text-xl transition-transform duration-300 group-hover/btn:translate-x-1">
                    <FiArrowRight/>
                  </span>
                 
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-5">

              {/* Demand Card */}
              <div
                className="
                rounded-3xl
                bg-gradient-to-br from-white to-purple-100
                border border-gray-100
                p-6
                shadow-sm
                transition
              "
              >
                <p className="text-sm font-medium text-gray-500">
                  Market Demand
                </p>

                <h3 className="mt-3 text-3xl font-extrabold text-gray-900">

                  {item.demand === 0
                    ? "Low"
                    : item.demand === 1
                    ? "Medium"
                    : item.demand === 2
                    ? "High"
                    : "N/A"}

                </h3>

                <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.demand === 0
                        ? "w-[35%] bg-red-400"
                        : item.demand === 1
                        ? "w-[65%] bg-yellow-400"
                        : "w-full bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Salary Card */}
              {item.avgSalary ? (
                <div
                  className="
                  rounded-3xl
                  bg-gradient-to-br from-white to-purple-50
                  border border-gray-100
                  p-6
                  shadow-sm
                  hover:shadow-lg
                  transition
                "
                >
                  <p className="text-sm font-medium text-gray-500">
                    Average Salary
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold text-gray-900">
                    {item.avgSalary}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Based on industry standards
                  </p>
                </div>
              ) : null}

            </div>
          </div>
        </div>
      ))}
  </div> :
   <NoRecordFound/> 
  }

</section>
      
      

    </>)
   }
  </>)
}

export default Career;