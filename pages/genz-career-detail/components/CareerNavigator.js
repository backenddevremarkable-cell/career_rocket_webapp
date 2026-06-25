"use client";


export default function CareerNavigator(props) {

  const entryLevel = props?.entryLevel
  const midLevel = props?.midLevel
  const seniorLevel = props?.seniorLevel

  const roadmap = [
    {
      step: "1",
      title: entryLevel?.heading,
      desc: entryLevel?.description,
      salary: entryLevel?.salary,
      experience: entryLevel?.experience
    },
    {
      step: "2",
      title: midLevel?.heading,
      desc: midLevel?.description,
      salary: midLevel?.salary,
      experience: midLevel?.experience
    },
    {
      step: "3",
      title: seniorLevel?.heading,
      desc: seniorLevel?.description,
      salary: seniorLevel?.salary,
      experience: seniorLevel?.experience
    },
  ];

  return (roadmap ?
    <section className="relative overflow-hidden py-24 bg-[#faf7fc] px-6 lg:px-20 border-b border-slate-100">
      {/* Decorative Dot Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#9d2ba804_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        <span className="text-xs font-bold tracking-widest text-[#A02BAA] uppercase mb-3 block text-center">
          Progression Roadmap
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 tracking-tight leading-tight">
          Career Navigators
        </h2>

        <div className="relative mt-20">
          {/* Progression Line */}
          <div className="absolute left-[21px] top-0 w-[2px] h-full bg-gradient-to-b from-[#A02BAA]/60 via-purple-300/40 to-transparent"></div>

          <div className="space-y-10">
            {roadmap.map((item, index) => (
              <div key={index} className="group relative flex gap-8 items-start">

                {/* Step node badge */}
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A02BAA] to-violet-700 font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute -inset-1 rounded-xl bg-[#A02BAA]/10 animate-pulse pointer-events-none" />
                  {item.step}
                </div>

                {/* White card details */}
                <div className="relative overflow-hidden flex-1 bg-white border border-slate-200/60 p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300 hover:border-purple-500/25 hover:shadow-[0_20px_40px_-15px_rgba(160,43,170,0.06)]">
                  {/* Glowing left line on hover */}
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#A02BAA] to-purple-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-2xl" />

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 mt-4 text-sm md:text-base leading-relaxed text-justify">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-[#80188E] border border-purple-100/80 transition-all hover:bg-purple-100/50">
                      {item?.experience} Years Experience
                    </span>

                    <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/80 transition-all hover:bg-emerald-100/50">
                      {item.salary} Avg. Salary
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section> : null
  );
}