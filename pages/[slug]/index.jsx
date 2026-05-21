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
  const [loading,setLoading] = useState(true);
  const [data, setdata] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

   const fetchData = async (data) => { 
        try {
          const res = await seoPageSlug({ slug : data })
          console.log("Career Category Response:", res);
          setdata(res?.data || {});
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }  
  
       useEffect(() => {
          if(slug) fetchData(slug);
        }, [slug]);


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
   data ? 
    <main className="overflow-hidden bg-white">
      {/* HERO SECTION */}


 <section className="relative overflow-hidden bg-[#050816] text-white">
  {/* LEFT PURPLE GLOW */}
  <div className="absolute left-[-180px] top-[120px] h-[500px] w-[500px] rounded-full bg-[#9D2BA7]/35 blur-[140px]" />
  {/* RIGHT BLUE/PURPLE GLOW */}
  <div className="absolute right-[-120px] top-[-100px] h-[450px] w-[450px] rounded-full bg-[#7e1f87]/30 blur-[130px]" />
  {/* BOTTOM PINK GLOW */}
  <div className="absolute bottom-[-220px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d90eef]/20 blur-[160px]" />
  {/* EXTRA SOFT LIGHT */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)]" />
  {/* CENTER OVERLAY */}
  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(157,43,167,0.12),rgba(126,31,135,0.06),transparent)]" />

  {/* CONTENT */}
  <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-12">
    <div className="grid items-center gap-16 lg:grid-cols-2">
      {/* LEFT */}
      <div>
        {/* Animated Badge */}
        {/* <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
          <div className="relative z-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-7 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,255,255,0.08)]">
            Best Career Counselling in Jaipur
          </div>
        </div> */}

        <h1 className="mt-8 text-5xl leading-tight font-extrabold md:text-5xl">
            {data?.heading}
        </h1>

         <p className="mt-6 text-lg leading-8 text-white/75 line-clamp-6">
          {parse(data?.description)} 
         </p>


        {data?.description && (
          <button
            onClick={() => setOpen(true)}
            className="mt-3 text-white/75 cursor-pointer font-semibold"
          >
            More Info.
          </button>
        )}
        {/* BUTTONS */}
        <div className="mt-10 flex flex-wrap gap-5">
          <button className="group relative overflow-hidden rounded-[12px] bg-white px-7 py-4 font-semibold text-[#80188E] shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
            <Link
              className="relative z-10 flex items-center gap-2"
              href="/counselors"
            >
              Book Free Counselling
            </Link>

            {/* button shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#ffffff80] to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>
          </button>

          <Link
            href="/#our-service"
            className="rounded-[12px] border border-white/20 bg-white/10 px-7 py-4 font-semibold backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
          >
            Explore Services
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-14 grid grid-cols-2 gap-5">
          <div className="rounded-[18px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl shadow-[0_8px_30px_rgba(255,255,255,0.04)]">
            <h3 className="text-4xl font-bold">5000+</h3>

            <p className="mt-2 text-white/70">
              Students Guided
            </p>
          </div>

          <div className="rounded-[18px] border border-white/10 bg-white/10 p-7 backdrop-blur-xl shadow-[0_8px_30px_rgba(255,255,255,0.04)]">
            <h3 className="text-4xl font-bold">100%</h3>

            <p className="mt-2 text-white/70">
              Personalized Guidance
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        {/* glow behind image */}
        <div className="absolute inset-0 scale-110 rounded-[30px] bg-[#d90eef]/20 blur-3xl"></div>

        <div className="relative overflow-hidden rounded-[12px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          
          <CustomImage
             img={data?.image}
             alt={data?.heading}
             className="w-full object-cover"
          />

          {/* <Image
              src={data?.image}
              alt="career"
              width={700}
              height={700}
              className="h-[600px] w-full object-cover"
            /> */}

        </div>

        {/* FLOAT CARD */}
        <div className="absolute -bottom-8 left-6 rounded-[18px] border border-gray-100 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-gray-900">
            Career Experts
          </h3>

          <p className="mt-2 text-gray-600">
            Personalized counselling with experienced mentors.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* SERVICES */}
      <section className="bg-[#fcf7fd] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[5px] text-[#A02BAA]">
              Our Services
            </p>

            <h2 className="mt-5 text-5xl font-bold text-gray-900">
              What You Get from the Best Career Counsellor
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              We help students and professionals make confident career
              decisions with practical guidance and future-focused planning.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[12px] border border-[#f1d7f3] bg-white p-8 shadow-[0_10px_40px_rgba(160,43,170,0.06)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(160,43,170,0.18)]"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#A02BAA]/5 blur-3xl"></div>

                  <div className="relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8e6fa]">
                      <Icon className="h-8 w-8 text-[#80188E]" />
                    </div>

                    <h3 className="mt-7 text-2xl font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
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
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[12px] shadow-2xl">

                <Image
                  src={chooseUs}
                  alt="Why Students Choose Remarkable Education Pvt. Ltd"
                  width={700}
                  height={700}
                  className="w-full object-cover"
                />

            </div>

            <div>
              <p className="font-semibold uppercase tracking-[5px] text-[#A02BAA]">
                Why Choose Us
              </p>

              <h2 className="mt-5 text-5xl font-bold leading-tight text-gray-900">
                Why Students Choose Remarkable Education Pvt. Ltd.
              </h2>

              <div className="mt-12 space-y-7">
                {[
                  "Personalized career counselling and roadmap planning",
                  "Experienced & certified career experts",
                  "Online + Offline counselling support",
                  "Career guidance based on real-world opportunities",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-r from-[#A02BAA] to-[#80188E]">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>

                    <p className="text-lg leading-8 text-gray-700">
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
      <section className="bg-gradient-to-r from-[#A02BAA] to-[#80188E] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center">
            <h2 className="text-5xl font-bold">
              Who Should Take Career Counselling?
            </h2>
          </div>

          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {audience.map((item, i) => (
              <div
                key={i}
                className="rounded-[12px] border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#80188E] shadow-xl">
                  <Target className="h-10 w-10" />
                </div>

                <h3 className="mt-7 text-2xl font-bold leading-snug">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fcf7fd] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-16 space-y-5">
            {faqs.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-[12px] border transition-all duration-300 ${
                    isOpen
                      ? "border-[#A02BAA]/20 bg-white shadow-[0_10px_40px_rgba(160,43,170,0.08)]"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-7 text-left"
                  >
                    <h3 className="pr-5 text-xl font-bold text-gray-900 md:text-2xl">
                      {item.q}
                    </h3>

                    <div
                      className={`flex h-[45px] w-[45px] items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-[#A02BAA] text-white"
                          : "bg-[#f7e4f8] text-[#80188E]"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-7 pb-7">
                        <p className="text-lg leading-8 text-gray-600">
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2d0831] via-[#4a0f52] to-[#80188E] py-24 text-white">
        <div className="absolute top-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Start Your Career Journey with Expert Guidance
          </h2>

          <p className="mt-7 text-xl leading-9 text-white/70">
            Get personalized career counselling and build a successful future
            with confidence.
          </p>

          <div className="mt-10 ">   
            <button onClick={()=>setCounselorPopup(true)} className="rounded-2xl bg-white px-10 py-5 cursor-pointer text-lg font-bold text-[#80188E] shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-105">
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
            
