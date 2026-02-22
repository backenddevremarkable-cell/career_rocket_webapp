"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import user from "../../assets/images/success-stories.svg";
import Image from "next/image";

const stories = [
  {
    name: "Rajeev Malhotra",
    role: "Data Scientist",
    img: user,
  },
  {
    name: "Rajeev Malhotra",
    role: "Data Scientist",
    img: user,
  },
  {
    name: "Rajeev Malhotra",
    role: "Data Scientist",
    img: user,
  },
  {
    name: "Rajeev Malhotra",
    role: "Data Scientist",
    img: user,
  },
  {
    name: "Rajeev Malhotra",
    role: "Data Scientist",
    img: user,
  },
];

export default function SuccessStories() {
  return (
    <section className="py-20 bg-[#f6f4f8] w-full">
      <div className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          Stories of <span className="text-purple-600">Success</span>
        </h2>
        <p className="text-gray-500 mt-2 mb-10">
          Connect with mentors who are already succeeding in your dream career.
        </p>

          {/* arrows */}
        <button className="prevBtn absolute left-0 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
          <HiChevronLeft size={24} />
        </button>
        <button className="nextBtn absolute right-0 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
          <HiChevronRight size={24} />
        </button>

        {/* Slider FULL WIDTH */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".nextBtn",
            prevEl: ".prevBtn",
          }}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {stories.map((item, i) => (
            <SwiperSlide key={i}>
              
              {/* CARD */}
              <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gradient-to-b hover:from-purple-700 hover:to-purple-900">

                {/* TEXT */}
                <div className="p-6 min-h-[200px]">
                  <p className="text-gray-700 text-sm leading-relaxed group-hover:text-white">
                    "The uncanny understanding of universities around the world
                    and the belief in my potentials led me through this journey
                    of fetching the right kind of course for myself."
                  </p>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between p-5 border-t border-purple-200 bg-white/60 group-hover:bg-transparent">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.img}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-purple-700 group-hover:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-200">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* quote icon */}
                  <span className="text-5xl font-bold text-purple-200 group-hover:text-white/20">
                    ”
                  </span>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}