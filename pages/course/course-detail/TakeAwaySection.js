export default function TakeAwaySection() {
  return (
    <section className="w-full bg-[#fff] py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What You'll{" "}
            <span className="text-purple-700">Take Away</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-md">
            Our graduates leave not just with a certificate, but with a
            fundamental shift in how they perceive and analyze human interaction.
          </p>

          {/* LIST */}
          <div className="mt-8 space-y-4">
            {[
              "Better understanding of human behavioral patterns",
              "Strong foundation in psychometric frameworks",
              "Ability to audit and design assessment tools",
              "Enhanced research and analytical skills",
              "Professional network in behavioral science",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                
                <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
                  ✓
                </div>

                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div>
          <div className="bg-purple-100 backdrop-blur-md rounded-3xl p-8 shadow-md text-center">
            
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Skill Advancement
            </h3>

            {/* Circle */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              
              <div className="absolute inset-0 rounded-full border-[10px] border-purple-200"></div>

              <div className="absolute inset-0 rounded-full border-[10px] border-purple-700"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-purple-700">
                  100%
                </span>
                <span className="text-xs text-gray-500">
                  COMPLETION
                </span>
              </div>
            </div>

            {/* Bottom badges */}
            <div className="flex justify-center gap-4">
              
              <div className="bg-white px-5 py-3 rounded-full shadow-sm">
                <p className="text-purple-700 font-semibold text-sm">
                  240+
                </p>
                <p className="text-xs text-gray-500">
                  HOURS LOGGED
                </p>
              </div>

              <div className="bg-white px-5 py-3 rounded-full shadow-sm">
                <p className="text-purple-700 font-semibold text-sm">
                  Master
                </p>
                <p className="text-xs text-gray-500">
                  PROFICIENCY
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}