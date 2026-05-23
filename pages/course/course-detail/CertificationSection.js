import { BadgeCheck, Share2, Building2 } from "lucide-react";
import Image from "next/image";
import certificateImg from "../../../assets/images/certificate.jpeg";

export default function CertificationSection() {
  return (
    <section className="relative w-full bg-slate-50/70 py-24 overflow-hidden border-b border-slate-100">
      {/* Decorative ambient light */}
      <div className="absolute left-[-5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE - Certificate Mockup */}
        <div className="relative order-2 md:order-1">
          {/* Subtle backdrop glow */}
          <div className="absolute inset-0 bg-purple-500/10 rounded-[2rem] blur-2xl opacity-60 scale-95" />
          
          <div className="relative bg-white p-3 border border-slate-200/50 rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_25px_60px_-15px_rgba(159,35,168,0.15)] group">
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <Image 
                src={certificateImg} 
                alt="professional certificate" 
                className="w-full h-auto object-cover transform duration-700 ease-out group-hover:scale-[1.01]" 
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col items-start text-left order-1 md:order-2">
          {/* Tagline */}
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3">
            Career Credentials
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Earn Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Professional Certification
            </span>
          </h2>

          <p className="text-slate-600 mt-4 leading-relaxed text-base sm:text-lg">
            Validate your expertise with a credential recognized by leading
            academic boards and industry professionals.
          </p>

          {/* POINTS */}
          <div className="mt-8 space-y-6 w-full">

            <div className="flex gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <BadgeCheck size={20} className="stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                  Completion Certificate
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed mt-0.5">
                  A verified digital credential unique to your achievement.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <Share2 size={20} className="stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                  Add to Portfolio
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed mt-0.5">
                  Easy one-click integration with LinkedIn and professional CVs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <Building2 size={20} className="stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                  Industry Backed
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed mt-0.5">
                  Curriculum reviewed by the International Board of Psychometrics.
                </p>
              </div>
            </div>

          </div>

          {/* BUTTON */}
          <button className="group mt-10 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            <span>View Sample Certificate</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 font-bold">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}