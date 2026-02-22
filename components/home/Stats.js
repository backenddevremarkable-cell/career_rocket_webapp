"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaRibbon, FaGraduationCap, FaBrain } from "react-icons/fa";
import group from "../../assets/images/group.png";

export default function Stats() {
  return (
    <section className="bg-purple-100 text-primary py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <StatCard
          icon={<FaUsers />}
          number={50000}
          suffix="+"
          label="STUDENTS GUIDED"
        />

        <StatCard
          icon={<FaRibbon />}
          number={95}
          suffix="%"
          label="SATISFACTION RATE"
        />

        <StatCard
          icon={<FaGraduationCap />}
          number={120}
          suffix="+"
          label="CAREER PATH"
        />

        <StatCard
          icon={<FaBrain />}
          number={200}
          suffix="+"
          label="PROPRIETARY ENGINE"
        />

      </div>
    </section>
  );
}

function StatCard({ icon, number, suffix, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      {/* Icon Box */}
      <div className="icon-box">
        {icon}
      </div>

      {/* Number */}
      <h3 className="stat-number mt-6">
        <CountUp
          end={number}
          duration={2}
          enableScrollSpy
          scrollSpyOnce
        />
        {suffix}
      </h3>

      {/* Label */}
      <p className="stat-label mt-2">
        {label}
      </p>
    </motion.div>
  );
}