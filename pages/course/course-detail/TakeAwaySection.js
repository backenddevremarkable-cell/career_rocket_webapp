export default function TakeAwaySection() {
  return (
    <section className="relative w-full bg-white py-24 overflow-hidden border-b border-slate-100">
      {/* Background ambient light */}
      <div className="absolute right-[-5%] top-[10%] h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start text-left">
          {/* Tagline */}
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3">
            Outcomes & Skills
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            What You'll{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Take Away
            </span>
          </h2>

          <p className="text-slate-600 mt-4 leading-relaxed text-base sm:text-lg">
            Our graduates leave not just with a certificate, but with a
            fundamental shift in how they perceive and analyze human interaction.
          </p>

          {/* LIST */}
          <div className="mt-8 space-y-3.5 w-full">
            {[
              "Better understanding of human behavioral patterns",
              "Strong foundation in psychometric frameworks",
              "Ability to audit and design assessment tools",
              "Enhanced research and analytical skills",
              "Professional network in behavioral science",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 bg-slate-50/50 border border-slate-100 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full font-bold text-xs">
                  ✓
                </div>
                <p className="text-slate-700 font-semibold text-sm sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD - Skill Advancement */}
        <div>
          <div className="relative bg-slate-50/60 border border-slate-200/50 rounded-[2.5rem] p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] text-center overflow-hidden">

            <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-8">
              Skill Advancement
            </h3>

            {/* SVG Circle Progress */}
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                <circle cx="50" cy="50" r="40" stroke="#9D2BA8" strokeWidth="8" fill="transparent"
                  strokeDasharray="251.2" strokeDashoffset="37.6" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3.5xl font-black text-slate-900 leading-none">85%</span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">PROFICIENCY</span>
              </div>
            </div>

            {/* Bottom badges */}
            <div className="flex gap-4">

              <div className="bg-white border border-slate-100/80 px-5 py-3 rounded-2xl shadow-sm w-full">
                <p className="text-purple-700 font-extrabold text-base tracking-tight">
                  240+
                </p>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                  HOURS LOGGED
                </p>
              </div>

              <div className="bg-white border border-slate-100/80 px-5 py-3 rounded-2xl shadow-sm w-full">
                <p className="text-purple-700 font-extrabold text-base tracking-tight">
                  Master
                </p>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                  LEVEL Achieved
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}