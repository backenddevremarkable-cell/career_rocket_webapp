"use client";

import { motion } from "framer-motion";
import { GraduationCap, FileText, BadgeCheck, Rocket } from "lucide-react";

const audience = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Psychology majors looking for technical depth",
  },
  {
    icon: FileText,
    title: "Psychology Enthusiasts",
    desc: "Exploring the science behind the mind",
  },
  {
    icon: BadgeCheck,
    title: "HR Professionals",
    desc: "Enhancing hiring & development tools",
  },
  {
    icon: Rocket,
    title: "Assessment Beginners",
    desc: "Starting a career in data & behavior",
  },
];

export default function AudienceSection() {
  return (
    <section className="relative w-full bg-white py-24 overflow-hidden border-b border-slate-100">
      {/* Background ambient lights */}
      <div className="absolute right-[-5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        
        {/* Tagline */}
        <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3 block">
          Target Audience
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Who is this{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            course for?
          </span>
        </h2>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16">
          {audience.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group relative bg-slate-50/50 border border-slate-100 rounded-2xl p-6 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(159,35,168,0.1)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center"
              >
                {/* Icon Wrapper with gentle hover animation */}
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-purple-100 text-purple-750 rounded-2xl mb-5 shadow-sm shadow-purple-200/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={24} className="stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 tracking-tight transition-colors duration-200 group-hover:text-purple-800">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}