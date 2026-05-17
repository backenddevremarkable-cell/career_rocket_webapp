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
    <section className="py-24 bg-[#FFF1FF] px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900">
            Who Should Pursue?
          </h2>

          <p className="text-gray-500 mt-6 text-lg leading-8">
            This career path is designed for those who possess a unique blend
            of analytical thinking and creative problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {props.pursue.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-[#FFF5FF] border border-0 rounded-[10px] p-8 hover:-translate-y-2 transition-all duration-500"
              >
                <div
                  className={`w-18 h-18 rounded-2xl bg-gradient-to-r border-[rgba(0,0,0,0.1)] border-[1px]  flex items-center justify-center text-white text-2xl`}
                >
                   <CustomImage className={'rounded-2xl'} alt={item.name_en} img={item.icon} />
                </div>

                <h3 className="text-1xl font-semibold mt-5 text-gray-900">
                  {item.name_en}
                </h3>

                <p className="text-gray-500 leading-8 mt-2">
                  {item.description_en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}