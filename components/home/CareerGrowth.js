"use client";

import growth from "../../assets/images/map-logo.svg";
import icon1 from "../../assets/images/map-icon-1.svg";
import icon2 from "../../assets/images/map-icon-2.svg";
import background from "../../assets/images/map-bg.svg";
import Image from "next/image";

export default function CareerGroth() {
 
  return (
    <section
      className="relative py-15 px-4 text-center text-white overflow-hidden
        bg-gradient-to-b from-purple-600 to-purple-800"
     style={{
      backgroundImage: `url(${background.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
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
  <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full px-4">

    {/* Card 1 */}
    <div className="bg-white/90 text-purple-700 rounded-2xl p-8 
                    flex items-center gap-6 
                    w-full h-32 shadow-lg">

        <Image
          src={icon1}   // 👈 medal image
          className="w-20"
        />

      <div>
        <h3 className="text-5xl font-bold  text-left text-primary">15,000+</h3>
        <p className="text-sm text-gray-600 jorney-text">
          PSYCHOMETRIC ASSESSMENTS IN A SINGLE DAY
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white/90 text-purple-700 rounded-2xl p-8 
                    flex items-center gap-6 
                    w-full h-32 shadow-lg">

      
        <Image
          src={icon2}   // 👈 medal image
          className="w-20"
        />

      <div> 
        <h3 className="text-5xl font-bold text-left text-primary">8,500+</h3>
        <p className="text-sm text-gray-600 jorney-text">
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