"use client";

import { Clock, Laptop, BookOpen, Monitor } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Course Duration",
    desc: "10 weeks of structured deep-dive learning",
  },
  {
    icon: Laptop,
    title: "Learning Format",
    desc: "Hybrid self-paced with live expert sessions",
  },
  {
    icon: BookOpen,
    title: "Modules Covered",
    desc: "12 core modules from basics to advanced analysis",
  },
  {
    icon: Monitor,
    title: "Certification",
    desc: "Recognized industry-standard completion certificate",
  },
];

export default function FeaturesSection() {
  return (
    features ?  
      <section className="relative w-full bg-gradient-to-b from-[#f8f6fb] to-white py-20 border-b border-slate-100">
        {/* Subtle decorative dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#9d2ba808_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="group relative bg-white border border-slate-100/90 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_-12px_rgba(159,35,168,0.1)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Glowing background accent on card hover */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon with elegant linear gradient */}
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl mb-5 shadow-md shadow-purple-200/50 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} className="stroke-[2.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section> : null
  );
}
