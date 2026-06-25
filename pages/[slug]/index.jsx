// app/seoData/page.jsx

"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import {
  seoPageSlug
} from "@/services/publicService";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import parse from "html-react-parser";

import {
  GraduationCap,
  Globe,
  Briefcase,
  Rocket,
  CheckCircle2,
  Target,
  Users,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import about from "../../assets/images/about.svg";
import chooseUs from "../../assets/images/seo-choose-us.png";
import { FaTimes } from "react-icons/fa";
import Modal from "../../components/common/Modal";
import CustomImage from "../../components/common/ImageMedia";


const services = [
  {
    icon: GraduationCap,
    title: "Psychometric Tests",
    desc: "Advanced assessment analysis for career planning and growth.",
  },
  {
    icon: BookOpen,
    title: "Stream Selection",
    desc: "Choose the right stream after 10th and 12th with confidence.",
  },
  {
    icon: Globe,
    title: "Study Abroad",
    desc: "International admission guidance and counselling support.",
  },
  {
    icon: Rocket,
    title: "Career Roadmap",
    desc: "Step-by-step career planning with expert mentorship.",
  },
  {
    icon: Briefcase,
    title: "Government Jobs",
    desc: "Guidance for UPSC, SSC, Banking and Railway careers.",
  },
  {
    icon: Users,
    title: "College Guidance",
    desc: "Find the best colleges and courses for your future.",
  },
];

const audience = [
  "Students after Class 10th",
  "Students after Class 12th",
  "College Students",
  "Working Professionals",
];

const faqs = [
  {
    q: "What is career counselling?",
    a: "Career counselling helps students choose the right career path based on interests, skills and future goals.",
  },
  {
    q: "Why is career counselling important?",
    a: "It helps students make informed decisions, reduces confusion and improves confidence.",
  },
  {
    q: "When should students take career counselling?",
    a: "Students can take counselling after 10th, 12th or even during graduation.",
  },
];

export default function SeoDataPage() {

  const { setCounselorPopup } = useDataStore((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const fetchData = async (data) => {
    try {
      const res = await seoPageSlug({ slug: data })
      console.log("Career Category Response:", res);
      setdata(res?.data || {});
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (slug) fetchData(slug);
  }, [slug]);


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    data ?
      <main className="overflow-hidden bg-white">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#0a0516] text-white py-12 sm:py-12 border-b border-slate-900/10">
          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Ambient Glows */}
          <div className="absolute left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
          <div className="absolute right-[-10%] top-[-10%] h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[150px] pointer-events-none" />

          {/* CONTENT */}
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">

              {/* LEFT COLUMN - CONTENT */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Tagline Badge */}
                <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-6">
                  <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,#9D2BA8_0%,#4c0f51_50%,#9D2BA8_100%)]" />
                  <div className="inline-flex items-center justify-center rounded-full bg-slate-950/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-purple-200 backdrop-blur-3xl gap-2 border border-purple-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    Premier Guidance Category
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-purple-300">
                  {data?.heading}
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-300/85 leading-relaxed text-justify line-clamp-6">
                  {parse(data?.description)}
                </p>

                {data?.description && (
                  <button
                    onClick={() => setOpen(true)}
                    className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors duration-200 flex items-center gap-1 group"
                  >
                    Read Full Details
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                )}

                {/* ACTION BUTTONS */}
                <div className="mt-10 flex flex-wrap gap-4 w-full sm:w-auto">
                  <button className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-white px-7 py-4 font-bold text-[#80188E] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer">
                    <Link
                      className="relative z-10 flex items-center justify-center gap-2"
                      href="/counselors"
                    >
                      Book Free Counselling
                    </Link>
                    {/* button shine */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#ffffff80] to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>
                  </button>

                  <Link
                    href="/#our-service"
                    className="w-full sm:w-auto text-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-purple-500/20"
                  >
                    Explore Services
                  </Link>
                </div>

                {/* STATS */}
                <div className="mt-12 grid grid-cols-2 gap-5 w-full">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg shadow-purple-950/20">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">5000+</h3>
                    <p className="mt-1 text-slate-400 text-sm font-medium">
                      Students Guided
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg shadow-purple-950/20">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">100%</h3>
                    <p className="mt-1 text-slate-400 text-sm font-medium">
                      Personalized Guidance
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - MEDIA */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                <div className="relative group/image max-w-md mx-auto lg:max-w-none">
                  {/* glow behind image */}
                  <div className="absolute inset-0 scale-105 rounded-3xl bg-gradient-to-tr from-purple-600/25 to-indigo-600/25 blur-3xl opacity-70 transition-opacity duration-500 group-hover/image:opacity-95 pointer-events-none" />

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                    <div className="overflow-hidden rounded-xl bg-white/5">
                      <CustomImage
                        img={data?.image}
                        alt={data?.heading}
                        className="w-full object-cover transform duration-700 hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* FLOAT CARD */}
                  <div className="absolute -bottom-6 left-6 right-6 md:right-auto md:w-80 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-md text-left transition-all duration-350 hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      Career Experts
                    </h3>
                    <p className="mt-1 text-slate-500 text-sm leading-relaxed">
                      Personalized counselling with experienced mentors.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="relative bg-gradient-to-b from-[#fbf9fc] to-white py-24 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(#9d2ba804_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold tracking-widest text-[#A02BAA] uppercase mb-3 block">
                Our Services
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mt-3">
                What You Get from the Best Career Counsellor
              </h2>

              <p className="mt-5 text-slate-650 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                We help students and professionals make confident career
                decisions with practical guidance and future-focused planning.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.01)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(160,43,170,0.1)]"
                  >
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#A02BAA]/5 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col items-start">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-700 shadow-sm shadow-purple-100 transition-transform duration-350 group-hover:scale-110">
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mt-6 text-xl font-bold text-gray-900 tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="relative py-24 overflow-hidden border-b border-slate-100">
          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">

              {/* Left Column Image */}
              <div className="relative p-2.5 bg-slate-100/60 border border-slate-200/50 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden group">
                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  <Image
                    src={chooseUs}
                    alt="Why Students Choose Remarkable Education"
                    width={700}
                    height={700}
                    className="w-full h-auto object-cover transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Right Column Content */}
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold tracking-widest text-[#A02BAA] uppercase mb-3">
                  Why Choose Us
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Why Students Choose Remarkable Education Pvt. Ltd.
                </h2>

                <div className="mt-10 space-y-5 w-full">
                  {[
                    "Personalized career counselling and roadmap planning",
                    "Experienced & certified career experts",
                    "Online + Offline counselling support",
                    "Career guidance based on real-world opportunities",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl hover:bg-slate-50 transition-colors duration-250"
                    >
                      <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#A02BAA] to-[#80188E] shadow-md shadow-purple-100">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      </div>

                      <p className="text-slate-700 font-semibold text-sm sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WHO SHOULD TAKE */}
        <section className="relative bg-gradient-to-b from-[#160625] to-[#0a0212] py-24 text-white overflow-hidden border-b border-slate-900">
          {/* Decorative grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-3 block">
                Target Groups
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Who Should Take Career Counselling?
              </h2>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {audience.map((item, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-purple-500/20 shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#80188E] shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Target className="h-8 w-8" />
                  </div>

                  <h3 className="mt-6 text-lg sm:text-xl font-bold leading-snug text-white">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-slate-50/50 py-24 overflow-hidden border-b border-slate-100">
          <div className="absolute left-[-5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="text-center">
              <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3 block">
                Questions & Answers
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-16 space-y-4">
              {faqs.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                  <div
                    key={index}
                    className={`border rounded-2xl p-6 transition-all duration-300 bg-white cursor-pointer ${isOpen
                      ? "border-purple-500/25 shadow-[0_15px_35px_-10px_rgba(159,35,168,0.06)]"
                      : "border-slate-200/60 hover:border-purple-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
                      }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between text-left cursor-pointer group"
                    >
                      <h3 className="pr-5 text-lg font-bold text-gray-900 md:text-xl transition-colors duration-200 group-hover:text-purple-800">
                        {item.q}
                      </h3>

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${isOpen
                          ? "rotate-180 bg-[#A02BAA] text-white"
                          : "bg-[#fcf0fd] text-[#80188E] group-hover:bg-[#fae6fa]"
                          }`}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4 border-t border-slate-100 pt-4"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div>
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0c051a] to-[#250d3a] py-24 text-white border-t border-purple-500/20">
          <div className="absolute top-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

          <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Start Your Career Journey with Expert Guidance
            </h2>

            <p className="mt-6 text-base sm:text-xl leading-relaxed text-purple-200/80 max-w-2xl mx-auto">
              Get personalized career counselling and build a successful future
              with confidence.
            </p>

            <div className="mt-10">
              <button
                onClick={() => setCounselorPopup(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-purple-950 font-bold px-8 py-4.5 rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                Book Career Counselling Now
              </button>
            </div>
          </div>
        </section>

        {open && (
          <Modal setOpen={setOpen} heading={data?.heading} description={data?.description} />
        )}
      </main> : null
  );
}

