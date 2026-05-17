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
    <section className="w-full bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Who is this{" "}
          <span className="text-purple-700">course for?</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {audience.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                {/* Icon */}
                <div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-14 h-14 mx-auto flex items-center justify-center bg-purple-100 text-purple-700 rounded-full mb-4"
                >
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-gray-600 text-sm mt-2">
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