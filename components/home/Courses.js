"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import pic from "../../assets/images/courses.svg";
import Image from "next/image";

const courses = [
  {
    title: "Foundations of Behavioral Psychometrics",
    img: pic,
    weeks: "10 Weeks",
    modules: "12 Modules",
  },
  {
    title: "Foundations of Behavioral Psychometrics",
    img: pic,
    weeks: "10 Weeks",
    modules: "12 Modules",
  },
  {
    title: "Foundations of Behavioral Psychometrics",
    img: pic,
    weeks: "10 Weeks",
    modules: "12 Modules",
  },
  {
    title: "Foundations of Behavioral Psychometrics",
    img: pic,
    weeks: "10 Weeks",
    modules: "12 Modules",
  },
   {
    title: "Foundations of Behavioral Psychometrics",
    img: pic,
    weeks: "10 Weeks",
    modules: "12 Modules",
  },
];

export default function Courses() {
  return (
    <section className="py-20 bg-[#f6f4f8] px-4">
      <div className="max-w-6xl mx-auto relative">

        {/* Top Heading */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Industry-Ready <span className="text-purple-600">Courses</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Connect with mentors who are already succeeding in your dream career.
            </p>
          </div>

          <button className="border border-purple-600 text-purple-600 px-5 py-2 rounded-md  hover:text-white transition">
            View All Course
          </button>
        </div>

        {/* arrows */}
        <button className="coursePrev absolute -left-3 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
          <HiChevronLeft size={24} />
        </button>

        <button className="courseNext absolute -right-3 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
          <HiChevronRight size={24} />
        </button>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".courseNext",
            prevEl: ".coursePrev",
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {courses.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

                {/* Image */}
                <div className="relative">
                  <Image
                    src={item.img}
                    className="w-full h-[180px] object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                    Certificate
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex gap-5 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <FaRegClock className="text-purple-600" />
                      {item.weeks}
                    </span>

                    <span className="flex items-center gap-1">
                      <MdBarChart className="text-purple-600" />
                      {item.modules}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <button className="w-full mt-4 border border-purple-600 text-purple-600 py-2 rounded-md btn-hover hover:text-white transition">
                    View Course
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}