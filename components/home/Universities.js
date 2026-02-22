"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import u1 from "../../assets/images/universities/1.svg";
import u2 from "../../assets/images/universities/2.svg";
import u3 from "../../assets/images/universities/3.svg";
import u4 from "../../assets/images/universities/4.svg";
import u5 from "../../assets/images/universities/5.svg";
import u6 from "../../assets/images/universities/1.svg";
import u7 from "../../assets/images/universities/2.svg";

const universities = [
  u1,u2,u3,u4,u5,u6,u7
];

export default function Universityes() {
  return (
    <section className="py-20 bg-[#f6f4f8]">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          Trusted by Leading{" "}
          <span className="text-purple-600">Universities</span>
        </h2>

        <p className="text-gray-500 mt-3 mb-12">
          Helping students explore, choose, and succeed in leading universities across India.
        </p>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {universities.map((logo, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center hover:shadow-md transition">
                <Image
                  src={logo}
                  className="h-12 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}