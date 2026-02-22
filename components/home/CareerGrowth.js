"use client";

import { FaBrain } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import growth from "../../assets/images/growth.svg";
import Image from "next/image";

export default function CareerGroth() {
  return (
    <section
      className="
        relative py-24 px-4 text-center text-white overflow-hidden
        bg-gradient-to-b from-purple-600 to-purple-800
      "
        style={{
          backgroundImage: `linear-gradient(rgba(125, 5, 123, 0.7), rgba(146, 3, 149, 0.7)), 
          url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')`,
          backgroundSize : 'cover', // 👈 map image path
          backgroundPosition: "center",
        }}
    >
      {/* 🌍 MAP BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 opacity-20 bg-center bg-no-repeat bg-contain"
      />

      {/* dotted overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:18px_18px] opacity-30" />

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto">

        {/* badge */}
        <div className="flex justify-center mb-6">
          <Image
            src={growth}   // 👈 medal image
            className="w-30"
          />
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-extrabold leading-tight heading-career-g">
          THE GOLD STANDARD <br />
          OF <span className="text-yellow-400">CAREER GROWTH</span>
        </h2>

        {/* Stats */}
       <div className="mt-14 flex justify-center">
  <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full px-4">

    {/* Card 1 */}
    <div className="bg-white/90 text-purple-700 rounded-2xl p-8 
                    flex items-center gap-6 
                    w-full h-32 shadow-lg">

      <svg width="40" height="40" fill="currentColor">
        {/* icon */}
      </svg>

      <div>
        <h3 className="text-3xl font-bold">15,000+</h3>
        <p className="text-sm text-gray-600">
          PSYCHOMETRIC ASSESSMENTS IN A SINGLE DAY
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white/90 text-purple-700 rounded-2xl p-8 
                    flex items-center gap-6 
                    w-full h-32 shadow-lg">

      <svg width="40" height="40" fill="currentColor">
        {/* icon */}
      </svg>

      <div>
        <h3 className="text-3xl font-bold">8,500+</h3>
        <p className="text-sm text-gray-600">
          STUDENTS COUNSELLED IN A SINGLE DAY
        </p>
      </div>
    </div>

  </div>
</div>

        {/* CTA */}
        <button className="mt-12 bg-yellow-400 text-black px-8 py-3 rounded-md font-medium hover:scale-105 transition">
          Start Your Journey
        </button>

      </div>
    </section>
  );
}