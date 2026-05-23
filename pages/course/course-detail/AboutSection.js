import aboutImg from "../../../assets/images/about.webp";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative w-full bg-white py-24 overflow-hidden border-b border-slate-100">
      {/* Decorative Blur Background Element */}
      <div className="absolute right-[-10%] top-[20%] h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start text-left">
          {/* Tagline */}
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3">
            In-Depth Curriculum
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            About This{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Course
            </span>
          </h2>

          <p className="text-slate-600 mt-6 leading-relaxed text-justify text-base sm:text-lg">
            The Foundations of Behavioral Psychometrics program is designed
            to provide a comprehensive entry point into the world of
            psychological measurement. We bridge the gap between abstract
            theory and practical application, ensuring you understand not
            just the 'how', but the 'why' behind behavioral data.
          </p>

          <p className="text-slate-600 mt-4 leading-relaxed text-justify text-base sm:text-lg">
            Whether you're aiming to refine your academic research skills or
            enhance your professional toolkit in HR and organizational
            development, this course provides the analytical rigor required
            in today's data-driven landscape.
          </p>

          {/* CHECKLIST */}
          <div className="mt-8 space-y-3.5 w-full">
            {[
              "Behavioral foundations & scientific theory",
              "Core psychometric measurement principles",
              "Applied understanding in real-world scenarios",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 bg-slate-50/50 border border-slate-100 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full font-bold text-xs">
                  ✓
                </div>
                <span className="text-slate-700 font-semibold text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="relative p-2.5 bg-slate-100/60 border border-slate-200/50 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden group">
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <Image
                src={aboutImg}
                alt="about course"
                className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
