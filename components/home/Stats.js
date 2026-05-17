"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaUsers,
  FaRibbon,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";

export default function Stats() {
  return (
    <section
      className="
      bg-[#F6EEFF]
      relative overflow-hidden
      py-15
    "
    >

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          <StatCard
            icon={<FaUsers />}
            number={50000}
            suffix="+"
            label="Students Guided"
          />

          <StatCard
            icon={<FaRibbon />}
            number={95}
            suffix="%"
            label="Satisfaction Rate"
          />

          <StatCard
            icon={<FaGraduationCap />}
            number={120}
            suffix="+"
            label="Career Paths"
          />

          <StatCard
            icon={<FaBrain />}
            number={200}
            suffix="+"
            label="Proprietary Engine"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  number,
  suffix,
  label,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="
      group relative
      text-center
    "
    >

      {/* ICON */}
      <div
        className="
        relative mx-auto
        w-20 h-20
        rounded-[20px]
        bg-gradient-to-br
        from-[#9F23A8]
        to-[#c53dd0]
        flex items-center justify-center
        text-white text-3xl
        group-hover:scale-110
        group-hover:-translate-y-2
        transition-all duration-500
      ">
        <span className="relative z-10">
          {icon}
        </span>
      </div>

      {/* COUNT */}
      <h3
        className="
        mt-5
        text-4xl md:text-4xl
        font-black
        stat-number
        text-[#9F23A8]
        tracking-tight
      "
      >
        <CountUp
          end={number}
          duration={2.2}
          enableScrollSpy
          scrollSpyOnce
        />
        {suffix}
      </h3>

      {/* LABEL */}
      <p
        className="
        mt-3
        text-[12px]
        font-semibold
        uppercase
        tracking-[2px]
        text-gray-600
      "
      >
        {label}
      </p>

      {/* HOVER LINE */}
      <div
        className="
        mx-auto mt-5
        h-[3px] w-0
        rounded-full
        bg-[#9F23A8]
        group-hover:w-20
        transition-all duration-500
      "
      ></div>
    </motion.div>
  );
}