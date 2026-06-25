import {
  Brain,
  BarChart3,
  ShieldCheck,
  Users,
  Scale,
  FlaskConical,
} from "lucide-react";

const learnItems = [
  {
    icon: Brain,
    title: "Introduction to Psychometrics",
    desc: "Understanding the historical context and the core pillars of psychological measurement science.",
  },
  {
    icon: BarChart3,
    title: "Behavioral Assessment Basics",
    desc: "Learning to identify key behavioral indicators and developing basic observation frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability & Validity",
    desc: "Mastering the statistical safeguards that ensure your assessments are accurate and consistent.",
  },
  {
    icon: Users,
    title: "Item Response Theory",
    desc: "Diving into modern test theory and how individual responses correlate with underlying traits.",
  },
  {
    icon: Scale,
    title: "Ethics in Testing",
    desc: "Navigating the moral landscape of assessment, privacy, and data bias in behavioral science.",
  },
  {
    icon: FlaskConical,
    title: "Applied Data Analysis",
    desc: "Hands-on experience interpreting psychometric reports and translating data into insights.",
  },
];

export default function LearnSection() {
  return (
    <section className="relative w-full bg-white py-24 overflow-hidden border-b border-slate-100">
      {/* Background ambient light */}
      <div className="absolute right-[-5%] top-[10%] h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        
        {/* Tagline */}
        <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3 block">
          Curriculum Overview
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          What You Will{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Learn
          </span>
        </h2>

        <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          A curriculum designed to take you from foundational concepts to complex behavioral analysis.
        </p>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 text-left">
          {learnItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <div 
                key={i} 
                className="group relative bg-slate-50/50 border border-slate-100 rounded-2xl p-6 hover:bg-white hover:shadow-[0_15px_35px_-10px_rgba(159,35,168,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl mb-5 shadow-md shadow-purple-200/35 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className="stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 tracking-tight transition-colors duration-200 group-hover:text-purple-800">
                  {item.title}
                </h3>

                {/* Description */}
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