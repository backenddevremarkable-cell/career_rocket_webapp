"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { careerProgram } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState,useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import SkeletonMoment from "./skeleton/SkeletonMoment";


export default function MomentsSlider() {

    const { setMoment, moment } = useDataStore((state) => state);
    const [data, setData] = useState(moment);
    const [loading, setLoading] = useState(false);

      const fetchData = async () => {
        try {
          setLoading(true);
          const payload = {
            page: 1,
            limit: 10,
          };

          const res = await careerProgram(payload);
          const responseData = res?.data || [];
          setData(responseData);
          setMoment(responseData);

        } catch (error) {
          console.error("Error fetching stories:", error);
        } finally {
          setLoading(false);
        }
      }
      
      useEffect(() => {
        if(!data) fetchData()
      }, [])

  return ( data && data?.listing?.length > 0 || loading ? 
    <section className="py-15 bg-[#f6f4f8] px-4 overflow-hidden moments-section">
      <div className="max-w-7xl mx-auto text-center relative">

        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-900 moments-heading">
            Moment from <br/> Our
            <span className="text-purple-600"> Career Guidance Programes</span>
          </h2>
          <p className="text-gray-500 mt-2">
             Snapshots of inteactive counseling session designed to help 
             students make the right academic and career choices.
          </p>
        </div>

           { loading ?
            <div className="flex justify-center items-center gap-6">
              {[...Array(3)].map((_, i) => (
              <SkeletonMoment isActive={i === 1} key={i} />
            ))}
          </div>
           : 
        <>
        <button className="momPrev md:hidden absolute left-2 top-[50%] -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2">
            <HiChevronLeft size={24} />
        </button>
        <button className="momNext md:hidden absolute right-2 top-[50%] -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2">
            <HiChevronRight size={24} />
        </button>
        
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".momPrev",
            nextEl: ".momNext",
          }}
          centeredSlides
          slideToClickedSlide={true}   // 👉 SIDE IMAGE CLICK MOVE ENABLE
          loop
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {data?.listing.map((data, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer ${
                    isActive ? "scale-130 z-10" : "scale-70 opacity-70"
                  }`}
                >
                  <img
                    src={`${data?.url}?auto=format&fit=crop&w=900&q=80`}
                    className="w-full h-[360px] object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        </> }
      </div>
    </section> : null
  );
}