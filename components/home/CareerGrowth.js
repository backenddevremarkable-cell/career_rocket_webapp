"use client";

import growth from "../../assets/images/map-logo.svg";
import icon1 from "../../assets/images/map-icon-1.svg";
import icon2 from "../../assets/images/map-icon-2.svg";
import background from "../../assets/images/map-bg.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

export default function CareerGroth() {

  const { setCounselorPopup } = useDataStore((state) => state);

  return (
    <section
      className="relative py-12 px-4 md:py-20 text-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #5b1367 0%, #7b1fa2 40%, #4a0e52 100%)",
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* ── MAP BACKGROUND OVERLAY (for tint) ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6a0f78]/70 via-[#7b1fa2]/60 to-[#4a0e52]/80" />

      {/* ── FINE GRID OVERLAY (SaaS style) ── */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── DOT ACCENT OVERLAY ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:22px_22px] opacity-20" />

      {/* ── RADIAL GLOW (center) ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-purple-400/20 blur-[120px]" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative max-w-6xl mx-auto">

        {/* Badge / Medal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <Image
            src={growth}
            className="w-20 md:w-30"
            alt="career growth medal"
          />
        </motion.div>

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">
            Trusted by 50,000+ Students
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight heading-career-g"
        >
          THE GOLD STANDARD <br />
          OF <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">CAREER GROWTH</span>
        </motion.h2>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-yellow-400 to-purple-300 origin-left"
        />

        {/* Stats Cards */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full px-2 md:px-4">

            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/90 p-5 md:p-8 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.18)] flex items-center gap-4 md:gap-6 min-h-[100px] md:h-36 transition-all duration-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)] hover:-translate-y-1"
            >
              {/* Top-left corner accent */}
              <div className="pointer-events-none absolute top-0 left-0 w-16 h-16 rounded-br-[40px] bg-gradient-to-br from-purple-100 to-transparent opacity-60" />

              <div className="flex-shrink-0">
                <Image src={icon1} className="w-14 md:w-20" alt="assessments icon" />
              </div>

              <div className="text-left">
                <h3 className="text-3xl md:text-5xl font-extrabold text-primary leading-none">15,000+</h3>
                <p className="mt-1.5 md:mt-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500 leading-snug">
                  Psychometric Assessments<br />In a Single Day
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/90 p-5 md:p-8 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.18)] flex items-center gap-4 md:gap-6 min-h-[100px] md:h-36 transition-all duration-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)] hover:-translate-y-1"
            >
              {/* Top-left corner accent */}
              <div className="pointer-events-none absolute top-0 left-0 w-16 h-16 rounded-br-[40px] bg-gradient-to-br from-purple-100 to-transparent opacity-60" />

              <div className="flex-shrink-0">
                <Image src={icon2} className="w-14 md:w-20" alt="students icon" />
              </div>

              <div className="text-left">
                <h3 className="text-3xl md:text-5xl font-extrabold text-primary leading-none">8,500+</h3>
                <p className="mt-1.5 md:mt-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500 leading-snug">
                  Students Counselled<br />In a Single Day
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button
            onClick={() => setCounselorPopup(true)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-yellow-400 px-7 py-3 md:px-9 md:py-3.5 font-bold text-sm md:text-base text-black transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Start Your Journey</span>
            <span className="relative text-lg leading-none">→</span>
          </button>

        </motion.div>

      </div>
    </section>
  );
}