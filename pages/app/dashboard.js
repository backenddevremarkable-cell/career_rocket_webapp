"use client";
import { withAuth } from '../../utils/withAuth';

import {
  Sparkles,
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

          {/* CARD */}
          <div className="rounded-[12px] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row gap-5">

              {/* IMAGE */}
              <div className="h-[95px] w-[95px] overflow-hidden rounded-[16px] bg-gradient-to-br from-[#53225d] via-[#7e2b8f] to-[#d946ef]">
                <div className="flex h-full items-center justify-center">
                  <Sparkles
                    className="text-white"
                    size={34}
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                  In Progress
                </p>

                <h2 className="mt-1 text-[20px] font-bold font-black text-[#222]">
                  My Purchased Courses
                </h2>

                <p className="text-[13px] text-[#777]">
                  UI/UX Masterclass: From Theory
                  to High-Fidelity Design
                </p>

                {/* PROGRESS */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#777]">
                    40% Completed
                  </span>

                  <span className="text-[12px] font-semibold text-primary">
                    12 / 30 Lessons
                  </span>
                </div>

                <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-[#ece7ef]">
                  <div className="h-full w-[40%] rounded-full bg-primary"></div>
                </div>

                <Link href="/my-course" className="mt-6 inline-flex h-[42px] w-[200px] items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-[12px] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">

            <div className="flex items-start gap-4">

              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#b12dd7]">
                <Sparkles
                  size={22}
                  className="text-white"
                />
              </div>

              <div>
                <h3 className="text-[20px] font-black font-bold leading-none text-[#222]">
                  Get Career Counselling
                </h3>

                <p className="mt-1 text-[14px] text-[#777]">
                  Expert guidance for your dream
                  role
                </p>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {contactItems.map((item, i) => {
                const Icon = item.icon;

                return (
                  <button
                    key={i}
                    className="group flex h-[78px] flex-col items-center justify-center rounded-[16px] border border-[#f0e8f5] transition-all duration-300 hover:-translate-y-1 hover:border-[#d946ef] hover:bg-white hover:shadow-[0_10px_30px_rgba(217,70,239,0.15)]"
                  >
                    {/* ICON */}
                    <div className="mb-2 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#f3d7fa] text-[#c026d3] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c026d3] group-hover:text-white">
                      <Icon size={14} />
                    </div>

                    {/* TEXT */}
                    <span className="text-[10px] font-bold tracking-wide text-[#666]">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link className="mt-6 inline-flex h-[42px] w-full items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white" href={'/counselors'} >
              Connect With Counsellor
            </Link>
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