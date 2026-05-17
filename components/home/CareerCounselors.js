"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import pic from "../../assets/images/counselors.svg";
import CounselorCard from "../../pages/career-counselors/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCounselor } from "@/services/authService";
import { useDataStore } from "@/store/useDataStore";
import SkeletonCounselors from "./skeleton/SkeletonCounselors";
import LightButton from "../common/button/Light";


export default function Counselors() {

  const { setcounselorHome, counselorHome } = useDataStore((state) => state);
  const [data, setData] = useState(counselorHome);
   const [loading, setLoading] = useState(false);

    const fetchData = async () => {
      try {
        setLoading(true);
        const payload = {
          serviceId: 0,
          page: 1,
          limit: 10,
          search: "",
        };

        const res = await getCounselor(payload);
        const responseData = res?.data || [];
        setData(res?.data || [])
        setcounselorHome(res?.data || [])

      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    }
  
  
  useEffect(() => {
    if(!counselorHome) fetchData()
  }, [])


  return (data && data?.length || loading ?
    <section id="experts" className="py-10 bg-[#f6f4f8] px-4" style={{ paddingBottom : '70px'}}>
      <div className="max-w-6xl mx-auto relative swiper-section">
        {/* Heading */}

        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Expert Career <span className="text-purple-600">Counselors</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Connect with mentors who are already succeeding in your dream career.
            </p>
          </div>

          <LightButton text={'View All Counselors'} link={'counselors'}/>
        </div>

        { loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCounselors key={i} />
          ))}
        </div> :
        <>
        {/* arrows */}
        <button className="prevBtn absolute left-0 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
          <HiChevronLeft size={24} />
        </button>
        <button className="nextBtn absolute right-0 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
          <HiChevronRight size={24} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".nextBtn",
            prevEl: ".prevBtn",
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {data && data.map((item, i) => (
            <SwiperSlide key={i}>
               <CounselorCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
         </> }
      </div>
    </section> : null
  );
}