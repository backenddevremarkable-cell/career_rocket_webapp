"use client";
import { withAuth } from '../../utils/withAuth';

import {
  Sparkles,
  ChevronRight,
  Brain,
  Target
} from "lucide-react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";

function Dashboard() {

  const contactItems = [
    {
      title: "WHATSAPP",
      icon: FaWhatsapp,
    },
    {
      title: "CALL",
      icon: FaPhoneAlt,
    },
    {
      title: "EMAIL",
      icon: FaEnvelope,
    },
  ];

  return (
    <main className=" min-h-screen bg-[#f6f4f8]">

      {/* SCROLLABLE CONTENT */}
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">

        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_.95fr] gap-5">

          {/* ASSESSMENTS CARD */}
          <div className="relative overflow-hidden rounded-[12px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#eaeaea]">
            {/* BACKGROUND ACCENT */}
            <div className="absolute -top-[100px] -right-[100px] h-[250px] w-[250px] rounded-full bg-primary/10 blur-[60px]"></div>

            <div className="relative z-10 flex flex-col gap-6">

              {/* HEADER */}
              <div className="flex items-start gap-4">
                <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#53225d] via-[#7e2b8f] to-[#d946ef]">
                  <Sparkles className="text-white" size={30} />
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h2 className="text-[22px] md:text-[26px] font-black tracking-tight font-bold text-[#1a1a1a] leading-tight">Career Assessments</h2>
                  <p className="mt-1 text-[14px] font-medium text-[#666]">Discover your true potential through our AI-driven tests.</p>
                </div>
              </div>

              {/* TEST LIST */}
              <div className="grid gap-4 sm:grid-cols-2">

                {/* PERSONALITY TEST */}
                <Link
                  href="/personality-test"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[12px] border border-[#ececec] bg-[#fcfbfc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-[0_15px_40px_rgba(161,38,219,0.12)]"
                >
                  <div className="absolute right-0 top-0 h-[100px] w-[100px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/5 blur-[25px] transition-all group-hover:bg-primary/15"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-white border border-[#eaeaea] text-blue-600 shadow-sm transition-all group-hover:border-primary/30 group-hover:text-primary">
                        <Brain size={20} />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 ring-1 ring-emerald-500/20">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Start Now
                      </span>
                    </div>

                    <h3 className="text-[17px] font-black text-[#1a1a1a] transition-colors font-bold group-hover:text-primary">Personality Test</h3>
                    <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-[#777]">Analyze your core traits to find the perfect work environment.</p>

                    <div className="mt-5 flex items-center gap-1.5 text-[13px] font-bold text-primary">
                      Take Assessment
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>

                {/* IDEAL CAREER TEST */}
                <Link
                  href="/ideal-career-test"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[12px] border border-[#ececec] bg-[#fcfbfc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-[0_15px_40px_rgba(161,38,219,0.12)]"
                >
                  <div className="absolute right-0 top-0 h-[100px] w-[100px] -translate-y-1/2 translate-x-1/2 rounded-full bg-fuchsia-500/5 blur-[25px] transition-all group-hover:bg-primary/15"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-white border border-[#eaeaea]  text-fuchsia-600 shadow-sm transition-all group-hover:border-primary/30 group-hover:text-primary">
                        <Target size={20} />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 ring-1 ring-emerald-500/20">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Start Now
                      </span>
                    </div>

                    <h3 className="text-[17px] font-black text-[#1a1a1a] transition-colors group-hover:text-primary font-bold">Ideal Career Test</h3>
                    <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-[#777]">Discover the professions that perfectly match your skills and passion.</p>

                    <div className="mt-5 flex items-center gap-1.5 text-[13px] font-bold text-primary">
                      Take Assessment
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* COUNSELLING CARD */}
          <div className="relative flex h-full flex-col overflow-hidden rounded-[12px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#eaeaea]">
            {/* BACKGROUND GLOW */}
            <div className="absolute -bottom-[50px] -right-[50px] h-[200px] w-[200px] rounded-full bg-primary/10 blur-[50px]"></div>

            <div className="relative z-10 flex flex-1 flex-col">
              {/* HEADER */}
              <div className="flex items-start gap-4">
                <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#d946ef] to-[#8b1ab6]">
                  <Sparkles size={26} className="text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-[20px] md:text-[21px] font-bold font-black tracking-tight text-[#1a1a1a] leading-tight">
                    Get Career Counselling
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[#666]">
                    Expert guidance for your dream role
                  </p>
                </div>
              </div>

              {/* SPACER - Automatically expands to push bottom content down */}
              <div className="flex-1 min-h-[30px]"></div>

              {/* OPTIONS */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {contactItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      className="group flex h-[85px] flex-col items-center justify-center rounded-[18px] border border-[#f0e8f5] bg-[#fcfbfc] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-[0_10px_25px_rgba(217,70,239,0.12)]"
                    >
                      {/* ICON */}
                      <div className="mb-2 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                        <Icon size={16} />
                      </div>
                      {/* TEXT */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#777] transition-colors group-hover:text-primary">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Link
                className="mt-6 inline-flex h-[50px] w-full items-center justify-center rounded-full bg-primary text-[14px] font-bold text-white transition-all hover:bg-[#8b1ab6]  hover:scale-[1.02]"
                href={'/counselors'}
              >
                Connect With Counsellor
              </Link>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="mt-7 rounded-[12px] bg-gradient-to-r from-[#a71ec7] to-[#df57ea] px-6 py-10 md:px-10 md:py-16 text-center shadow-[0_15px_50px_rgba(193,53,226,0.25)]">

          <h1 className="mx-auto max-w-[700px] text-2xl md:text-3xl lg:text-[56px] font-black leading-tight lg:leading-[62px] text-white">
            Discover Your Perfect Career With AI
          </h1>

          <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-7 text-white/90">
            Unlock your true potential with
            our advanced psychometric
            assessments and tailored learning
            paths. Let our AI assistant guide
            you through every step of your
            professional journey.
          </p>

          <button className="mt-8 h-[48px] rounded-[14px] bg-white px-8 text-[14px] font-bold text-[#b12dd7] shadow-lg">
            Start Career Assessment
          </button>
        </div>

        {/* EXTRA SCROLL */}
        {/* <div className="mt-8 grid grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-[220px] rounded-[24px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                />
              )
            )}
          </div> */}
      </section>
    </main>
  );
}
export default withAuth(Dashboard);