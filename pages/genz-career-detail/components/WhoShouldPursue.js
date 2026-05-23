"use client";

import {
  FaBrain,
  FaCode,
  FaLightbulb,
  FaUsers,
  FaDatabase,
  FaShieldAlt,
} from "react-icons/fa";
import CustomImage from "../../../components/common/ImageMedia";

const data = [
  {
    icon: FaBrain,
    title: "Logic Crafters",
    desc: "Individuals who enjoy breaking down complex problems into manageable logical sequences.",
    color: "from-fuchsia-500 to-purple-500",
  },
  {
    icon: FaCode,
    title: "Solution Architects",
    desc: "Those who find satisfaction in building scalable systems from scratch using code.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FaLightbulb,
    title: "Infinite Learners",
    desc: "People who thrive in an environment where technology and tools evolve every day.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: FaUsers,
    title: "Collaborators",
    desc: "Engineers who love working in cross-functional teams to bring big ideas to life.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: FaDatabase,
    title: "Data Enthusiasts",
    desc: "Curious minds that enjoy digging into data to find patterns and drive decisions.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: FaShieldAlt,
    title: "System Guardians",
    desc: "Protectors of stability and security who ensure software runs smoothly at scale.",
    color: "from-slate-500 to-gray-700",
  },
];

export default function WhoShouldPursue(props) {
  return (
    props.pursue ?
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-50 to-white px-6 lg:px-20 border-b border-slate-100">
        {/* Dot Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#9d2ba804_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Who Should Pursue?
            </h2>

            <p className="text-slate-500 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              This career path is designed for those who possess a unique blend
              of analytical thinking and creative problem-solving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
            {props.pursue.map((item, index) => {
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-slate-200/50 rounded-2xl p-7 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_-15px_rgba(160,43,170,0.08)] hover:border-purple-500/30 overflow-hidden"
                >
                  {/* Glowing top line overlay on hover */}
                  {/* Glowing blob */}
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-colors" />

                  <div
                    className="relative z-10 w-15 h-15 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50/50 border border-purple-100/80 flex items-center justify-center shadow-sm transition-transform duration-350 group-hover:scale-108 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  >
                    <CustomImage className="rounded-xl object-contain" alt={item.name_en} img={item.icon} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mt-6 tracking-tight group-hover:text-[#80188E] transition-colors duration-200">
                    {item.name_en}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mt-3">
                    {item.description_en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section> : null
  );
}