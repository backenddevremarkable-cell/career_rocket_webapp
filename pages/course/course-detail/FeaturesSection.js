"use client";

import { motion } from "framer-motion";
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
    <section className="w-full bg-purple-100 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
        
        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full mb-4">
                <Icon size={22} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          );
        })}

      </div>
    </section> : null
  );
}