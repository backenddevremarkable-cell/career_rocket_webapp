"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import "swiper/css";
import "swiper/css/navigation";

const moments = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
];

export default function MomentsSlider() {
  return (
    <section className="py-20 bg-[#f6f4f8] px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">

         {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Moment from <br/> Our
            <span className="text-purple-600"> Career Guidance Programes</span>
          </h2>
          <p className="text-gray-500 mt-2">
             Snapshots of inteactive counseling session designed to help 
             students make the right academic and career choices.
          </p>
        </div>
        
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
          {moments.map((img, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer ${
                    isActive ? "scale-130 z-10" : "scale-70 opacity-70"
                  }`}
                >
                  <img
                    src={`${img}?auto=format&fit=crop&w=900&q=80`}
                    className="w-full h-[360px] object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}