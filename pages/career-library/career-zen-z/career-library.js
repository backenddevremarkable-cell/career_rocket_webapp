"use client";

import {
  FiSearch,
  FiDatabase,
  FiCode,
  FiTrendingUp,
  FiShield,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import Search from "../../../components/common/Search";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { saveToStorage, getSlug } from "@/utils/index";
import {
  careerCategoryGenZ
} from "@/services/publicService";
import Image from "next/image";
import { BASE_URL } from "@/config";
import ImageMedia from "../../../components/common/ImageMedia";
import SkeletonCareerGenZ from "../../../components/home/skeleton/SkeletonCareerGenZ";
import NoRecordFound from "../../../components/common/NoRecordFound";
import Link from "next/link";

export default function DreamCareerPage() {

      const [page, setPage] = useState(1);
      const [limit,setLimit] = useState(50);
      const { careerGenz, setCareerGenz, setZcourseId } = useDataStore();
      const [data, SetData] = useState(careerGenz);
      const [actviePopularity, SetactviePopularity] = useState(0);
      const [loading, setLoading] = useState(false);
      const [searh, setSearch] = useState(null);
  
      const fetchData = async ({page, limit=50, search="", popularity=0}) => {
          try {
            const payload = {
              page,
              limit,
              genzCareerCategoryId: 0,
              search,
              popularity
            }
            setLoading(true);
            const res = await careerCategoryGenZ(payload);
            console.log("Career Category Response:", res);
            SetData(res?.data || {});
            setCareerGenz(res?.data)
          } catch (err) {
            console.error("Error fetching profile:", err);
          } finally {
            setLoading(false);
          }
        };  
    
         useEffect(() => {
             if(!data) fetchData({page, limit, search:"", popularity:0});
          }, []);

         const filterData=(e)=> fetchData({page, limit, search:e, popularity:actviePopularity})
      
  const popularity = [
    { id : 0, title : "All", badgeColor : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-500"},
    { id : 1, title : "High Pay", badgeColor : "bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-500"},
    { id : 3, title : "New Age", badgeColor : "bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-500"},
    { id : 4, title : "In Demand", badgeColor : "bg-gradient-to-r from-orange-100 to-red-100 text-orange-500"}
  ]
 

  return ( data ?
    <div className="min-h-screen bg-[#f6f5f8] pb-16">
     
      <div className="mx-auto">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden border border-white/40 bg-gradient-to-br from-[#fcfbff] via-[#fdf7ff] to-[#fffaf5] px-6 py-16  md:px-14 ">
          {/* background blur */}
          <div className="absolute left-[-80px] top-[-80px] h-[240px] w-[240px] rounded-full bg-[#f6f5f8] blur-3xl"></div>
          <div className="absolute bottom-[-100px] right-[-100px] h-[260px] w-[260px] rounded-full bg-violet-200/30 blur-3xl"></div>
          <div className="relative z-10 text-center">
            <Search 
              loading={loading}
              filterData={(e)=>filterData(e)}
              placeholder={`Search from 200+ careers to match your passion...`} 
              Badge={'Choose your career goal'}
              heading={
                    <div className="mb-14">
                     What’s your{" "}
                     <span className="text-purple-700">
                        dream career?
                     </span>
                    </div>
                } />

          </div>
        </div>

        {/* TRENDING */}
        <div className="max-w-6xl mx-auto px-4 mt-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[34px] font-bold text-[#171717]">
                Trending Now
              </h2>

              <p className="mt-2 text-[15px] text-gray-500">
                Curated career paths for the modern visionary
              </p>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap items-center gap-3">
              {popularity?.map(
                (item, index) => (
                  <button
                    onClick={()=>{ SetactviePopularity(item.id); fetchData({popularity:item.id})}}
                    key={index}
                    className={`rounded-full px-5 py-[10px] text-sm font-medium transition-all duration-300 cursor-pointer ${
                      actviePopularity == item.id
                        ? "bg-primary text-white shadow-lg"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-800"
                    }`}
                  >
                    {item?.title}
                  </button>
                )
              )}
            </div>
          </div>

          {/* CARDS */}

          { loading || data && data?.records.length ?
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
           { loading ?    
               <SkeletonCareerGenZ/>
            :
            data?.records.map((item, index) => {
               const popularityData = popularity.find(
                (pop) => pop.id == item.popularity
              );
           
              return (<Link
                    title={item.name_en}
                    href={`/genz-career-detail/${getSlug(item.name_en)}`}
                    onClick={(e) => {
                      setZcourseId(item?.id);
                      saveToStorage("zcsid", item?.id);
                    }}
                  >
              <div
                key={index}
                className="group relative overflow-hidden rounded-[20px] border border-[#f0eef6] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(168,85,247,0.12)]"
              >
                {/* top gradient */}
                <div className="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-pink-400 via-violet-400 to-yellow-300 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

                {/* BADGE */}
                <div className="flex justify-end">
                  <span
                    className={`rounded-full px-3 py-[6px] text-[10px] font-bold tracking-[0.15em] ${popularityData.badgeColor}`}
                  >
                     {popularityData.title}
                  </span>
                </div>

                {/* ICON */}
                <div className="mt-6 flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#faf5ff] to-[#fdf2f8] text-[28px] text-violet-500 shadow-inner transition-all duration-500 group-hover:scale-110">
                   <ImageMedia 
                      img={item.icon}
                      alt={item.name_en}
                      className={'object-contain'}
                    />
                </div>

                {/* CONTENT */}
                <div className="mt-7">
                  <h3 className="text-[22px] font-bold text-[#171717]">
                    {item.name_en}
                  </h3>

                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-500">
                    PERFORMANCE MARKETING
                  </p>

                  <p className="mt-5 text-[14px] leading-7 text-gray-500 text-justify line-clamp-6">
                     {item.description_en}
                  </p>
                </div>

                {/* glow */}
                <div className="absolute right-[-40px] top-[-40px] h-[120px] w-[120px] rounded-full bg-violet-100 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-60"></div>
              </div></Link>)
            })} 
          </div> : <NoRecordFound/> }
        </div>
      </div>
    </div> : null
  );
}