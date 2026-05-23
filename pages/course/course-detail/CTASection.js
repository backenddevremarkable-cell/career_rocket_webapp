import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#9d2ba804_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0c051a] to-[#250d3a] rounded-[1rem] py-20 px-8 text-center border border-purple-500/20 max-w-5xl mx-auto">
          {/* Internal Glow Lights */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative z-10">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Start Your Learning Journey Today
            </h2>

            {/* Subtext */}
            <p className="text-purple-200/80 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Join over 1,200 professionals and students who have already begun
              mastering behavioral psychometrics with us.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">

              <Link href={"/career-library"} className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-purple-950 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer">
                Start Career Assessment →
              </Link>

              <Link href={"/career-library"} className="w-full sm:w-auto inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white font-bold px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer">
                Explore Careers
              </Link>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}