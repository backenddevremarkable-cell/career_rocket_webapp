"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiCamera } from "react-icons/hi2";
import { careerProgram } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      const res = await careerProgram({ page: 1, limit: 10 });
      const responseData = res?.data || [];
      setData(responseData);
      setMoment(responseData);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data) fetchData();
  }, []);

  if (!loading && (!data || data.length === 0)) return null;

  return (
    <section className="relative py-16 md:py-24 bg-[#f8f6fb] overflow-hidden moments-section">

      {/* ── Subtle background grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Soft glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-48 w-48 rounded-full bg-pink-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#9F23A8] shadow-sm mb-5">
            <HiCamera className="w-3.5 h-3.5" />
            Live Sessions
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Moments from Our
            <br />
            <span className="bg-gradient-to-r color-primary to-indigo-500 bg-clip-text text-transparent">
              Career Guidance Programs
            </span>
          </h2>

          <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Snapshots of interactive counseling sessions designed to help
            students make the right academic and career choices.
          </p>

          {/* Thin divider */}
          <div className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#9F23A8] to-pink-300" />
        </motion.div>

        {/* ── Slider ── */}
        {loading ? (
          <div className="flex justify-center items-center gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonMoment isActive={i === 1} key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Nav buttons */}
            <button
              className="momPrev absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-purple-100 shadow-md text-[#9F23A8] hover:bg-[#9F23A8] hover:text-white hover:border-[#9F23A8] transition-all duration-200 md:left-4"
              aria-label="Previous"
            >
              <HiChevronLeft size={20} />
            </button>
            <button
              className="momNext absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-purple-100 shadow-md text-[#9F23A8] hover:bg-[#9F23A8] hover:text-white hover:border-[#9F23A8] transition-all duration-200 md:right-4"
              aria-label="Next"
            >
              <HiChevronRight size={20} />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".momPrev",
                nextEl: ".momNext",
              }}
              centeredSlides
              slideToClickedSlide={true}
              loop
              spaceBetween={24}
              slidesPerView={3}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {data?.map((item, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <div
                      className={`relative transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer group
                        ${isActive
                          ? "scale-105 z-10 shadow-2xl shadow-purple-200/60"
                          : "scale-90 opacity-60"
                        }`}
                    >
                      {/* Image */}
                      <img
                        src={`${item?.url}?auto=format&fit=crop&w=900&q=80`}
                        alt="career-rocket moment"
                        className="w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover"
                      />

                      {/* Hover gradient overlay — only shown on active */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white text-xs font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Career Guidance Session
                          </span>
                        </div>
                      )}

                      {/* Active ring */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-[#9F23A8]/30 pointer-events-none" />
                      )}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

      </div>
    </section>
  );
}