import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug, saveToStorage } from "@/utils/index";

import {
  careerBycatId
} from "@/services/authService";
import Link from "next/link";

const Career = () => {

    const [page, setPage] = useState(1);
    const [limit,setLimit] = useState(50);
    const { setCareerDetail, setCareerSubList, careerSubList } = useDataStore();
    const careerId = useDataStore((state) => state?.career);
    const [loading,setLoading] = useState(careerSubList ? false : true);
    const [dataObj, setdataObj] = useState(careerSubList);

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
      <section className="relative w-full h-[300px] md:h-[350px]">
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
                
     <section className="bg-[#f5f7fb] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

       { dataObj?.records && dataObj?.records?.length ? (
          dataObj?.records.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-2">
                  <span className="inline-block mb-4 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 border border-blue-100">
                     {getFromStorage('cname')}
                  </span>

                   <h2 className="text-2xl md:text-2xl font-bold text-gray-900 uppercase leading-tight">
                     {item.name_en}
                  </h2>

                  <p className="mt-5 text-gray-600 text-base leading-relaxed">
                    {item.summary_en || "No summary available."}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Job & Salary Info
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.jobAndSalaryInfo_en ||
                        "Salary details not available."}
                    </p>
                  </div>

               
                </div>

                {/* RIGHT SIDE INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  
                  <div className="rounded-2xl bg-[#f8fafc] border border-gray-100 p-5 shadow-sm height-max-cnt">
                    <p className="text-sm text-gray-500 font-medium">Demand</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      {item.demand === 0
                        ? "Low"
                        : item.demand === 1
                        ? "Medium"
                        : item.demand === 2
                        ? "High"
                        : "N/A"}
                    </h3>
                  </div>

                  { item.avgSalary ? 
                  <div className="rounded-2xl bg-[#f8fafc] border border-gray-100 p-5 shadow-sm height-max-cnt">
                    <p className="text-sm text-gray-500 font-medium">
                      Average Salary
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      {item.avgSalary ? item.avgSalary : "-"}
                    </h3> 
                  </div> : null }
                </div>

                  <Link onClick={()=>{setCareerDetail(item?.id), saveToStorage("cdid",item?.id)}}  href={`career-detail/${getSlug(item.name_en)}`} className="inline-flex items-center justify-center gap-2
                  rounded-xl bg-blue-600 px-6 py-3
                  text-sm md:text-base font-semibold explore-btn">
                  Explore Now
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg font-medium">
              No career data found.
            </p>
          </div>
        )}
      </div>
    </section>
    </>)
   }
  </>)
}

export default Career;