"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import pic from "../../assets/images/counselors.svg";
import Image from "next/image";

const counselors = [
  {
    name: "Amita Verma",
    role: "Career Counselor",
    rating: "4.9",
    img: pic,
    phone: "919999999999",
    whatsapp: "919999999999",
  },
  {
    name: "Amita Verma",
    role: "Career Counselor",
    rating: "4.9",
    img: pic,
    phone: "919999999999",
    whatsapp: "919999999999",
  },
  {
    name: "Amita Verma",
    role: "Career Counselor",
    rating: "4.9",
    img: pic,
    phone: "919999999999",
    whatsapp: "919999999999",
  },
  {
    name: "Amita Verma",
    role: "Career Counselor",
    rating: "4.9",
    img: pic,
    phone: "919999999999",
    whatsapp: "919999999999",
  },
  {
    name: "Amita Verma",
    role: "Career Counselor",
    rating: "4.9",
    img: pic,
    phone: "919999999999",
    whatsapp: "919999999999",
  },
  {
    name: "Amita Verma",
    role: "Career Counselor",
    rating: "4.9",
    img: pic,
    phone: "919999999999",
    whatsapp: "919999999999",
  },
];

export default function Counselors() {
  return (
    <section className="py-20 bg-[#f6f4f8] px-4">
      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Expert Career{" "}
            <span className="text-purple-600">Counselors</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Connect with mentors who are already succeeding in your dream career.
          </p>
        </div>

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
          {counselors.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
                
                {/* avatar */}
                <div className="relative w-fit mx-auto">
                  <Image
                    src={item.img}
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 counselor-rating">
                    <FaStar size={10} /> {item.rating}
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.role}</p>

                <p className="text-xs text-gray-400 mt-2">
                  120+ Reviews • 12+ Years Exp
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    Career Planning
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    Career Transitions
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    Higher Studies Guidance
                  </span>
                </div>

                {/* buttons */}
                <div className="flex gap-3 mt-5">
                  {/* CALL BUTTON */}
                  <a
                    href={`tel:${item.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <FaPhoneAlt size={14} />
                    Call
                  </a>

                  {/* WHATSAPP */}
                  <a
                    href={`https://wa.me/${item.whatsapp}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
                  >
                    <BsChatDotsFill size={16} />
                    Chat
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}