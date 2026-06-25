"use client";
import playStore from "../assets/images/play-store.webp";
import appStore from "../assets/images/app-store.webp";
import logo from "../assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { seoPage } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import ContactForm from "./common/ContactForm";

export default function Footer() {
  const leftSpecializations = [
    "Admission Guidance",
    "Exam Preparation",
    "Personal Counselling",
    "Profile Building",
    "Stream Selection",
    "Mental Health Counselling",
    "Academic Counselling",
  ];

  const rightSpecializations = [
    "Student Counselling",
    "Parental Counselling",
    "Psychological Counselling",
    "Stress Management Counselling",
    "Relationship Counselling",
    "Skill Development Counselling",
  ];

  const quickAccess = [
    { menu: "Talk to A Counselor", link: "/counselors" },
    { menu: "Self-Rating Test", link: "/personality-test" },
    { menu: "Idea Career Test", link: "/ideal-career-test" },
    { menu: "Expert Counselor", link: "/counselors" }
  ];

  const { setSeodata, seoData, setCounselorPopup, counselorPopup } = useDataStore((state) => state);
  const [data, setData] = useState(seoData);

  const fetchData = async () => {
    try {
      const payload = {
        page: 1,
        limit: 50,
      };

      const res = await seoPage(payload);
      const responseData = res?.data || [];
      setData(responseData);
      setSeodata(responseData);

    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  }

  useEffect(() => {
    if (!seoData) fetchData()
  }, [])


  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full flex justify-center z-10">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent blur-[0.3px]"></div>
        </div>
      </div>

      <footer className="bg-white border-t border-[#ececec]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10 relative">
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_.7fr_2fr] gap-x-16 gap-y-12">
            {/* LEFT */}
            <div className="max-w-[390px]">
              <Link href={'/'} className="inline-block">
                <Image
                  src={logo}
                  alt="Career Rocket"
                  width={240}
                  height={60}
                  className="h-auto w-auto"
                />
              </Link>

              <p className="mt-6 text-[16px] leading-[34px] text-[#666666] font-normal">
                Find your path with expert guidance. We bridge the gap between your potential and your professional reality through science-backed coaching.
              </p>

              {/* APP BUTTONS */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link target="_blank" href={process.env.NEXT_PUBLIC_PLAY_STORE || '#'}>
                  <Image
                    src={playStore}
                    alt="Google Play"
                    width={140}
                    height={45}
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                  />
                </Link>

                <Link target="_blank" href={process.env.NEXT_PUBLIC_APP_STORE || '#'}>
                  <Image
                    src={appStore}
                    alt="App Store"
                    width={140}
                    height={45}
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                  />
                </Link>
              </div>

              {/* SOCIAL */}
              <div className="flex items-center gap-4 mt-9">
                {[
                  { icon: FaInstagram, title: "Instagram", link: process.env.NEXT_PUBLIC_INSTA_URL },
                  { icon: FaFacebookF, title: "Facebook", link: process.env.NEXT_PUBLIC_FB_URL },
                  { icon: FaYoutube, title: "Youtube", link: process.env.NEXT_PUBLIC_YOUTUBE_URL },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link href={item?.link || '#'} target="_blank"
                      key={index}
                      title={item.title}
                      className={`group w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index === 2
                        ? "bg-[#b12acb] text-white"
                        : "bg-[#d8d8d8] text-white hover:bg-[#b12acb]"
                        }`}
                    >
                      <Icon className="text-[17px]" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-[22px] leading-none font-bold text-[#111] mb-8">
                Company
              </h3>

              <ul className="space-y-5">
                {[
                  { menu: "About Us", link: "/about-us" },
                  { menu: "Contact Us", link: "/contact-us" },
                  { menu: "Career Library", link: "/career-library-gen-z" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item?.link}
                      title={item?.menu}
                      className="text-[16px] text-[#666] hover:text-[#b12acb] transition-all duration-300"
                    >
                      {item?.menu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="text-[22px] leading-none font-bold text-[#111] mb-8">
                Services
              </h3>

              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4 w-full">
                {data && data?.records.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[16px] text-[#555] group"
                  >
                    <span className="w-[7px] h-[7px] rounded-full bg-[#dca4e5] mt-[11px] shrink-0 transition-colors duration-300 group-hover:bg-[#b12acb]"></span>
                    <Link title={item?.title} href={`/${item?.slug}`} className="hover:text-[#b12acb] transition-colors duration-300">
                      <span>{item?.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LOCATION SECTION (Restored to exactly match the design, but with slight shadow improvements) */}
          <div className="mt-20 rounded-2xl border border-[#edd9f1] bg-[#f7eef8] px-8 py-10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(177,42,203,0.06)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                <FaMapMarkerAlt className="text-[#b12acb] text-[16px]" />
              </div>

              <h3 className="text-[20px] font-bold text-[#111]">
                Find Best Career Counsellor Near You
              </h3>
            </div>

            <div className="flex flex-wrap gap-4">
              {data?.records?.map((item, index) => {
                const city = item?.title?.split(" ").pop();

                return (
                  <Link
                    key={index}
                    title={city}
                    href={`/${item?.slug}`}
                    className="px-8 leading-[38px] rounded-full border border-[#e5c5eb] bg-[#f9f3fa] text-[#a02ac0] text-[15px] font-medium transition-all duration-300 hover:bg-[#b12acb] hover:text-white hover:border-[#b12acb] hover:shadow-md hover:-translate-y-0.5"
                  >
                    {city}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* QUICK ACCESS */}
          <div className="pt-20 pb-12">
            <div className="flex flex-col items-center mb-10">
              <h3 className="text-[24px] font-bold text-[#111] mb-3">
                Quick Access
              </h3>
              <div className="w-16 h-[3px] bg-gradient-to-r from-transparent via-[#b12acb] to-transparent rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {quickAccess.map((item, index) => {
                const isPrimary = index === 0;
                const commonClasses =
                  "min-w-[190px] h-[52px] px-8 rounded-xl text-[15px] font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center hover:-translate-y-1 shadow-sm hover:shadow-md";
                return isPrimary ? (
                  <button
                    key={index}
                    onClick={() => setCounselorPopup(true)}
                    className={`${commonClasses} bg-gradient-to-r from-[#b12acb] to-[#8e22a3] text-white hover:shadow-[0_10px_20px_rgba(177,42,203,0.3)] border border-[#b12acb]/20`}
                  >
                    {item?.menu}
                  </button>
                ) : (
                  <Link
                    key={index}
                    title={item?.menu}
                    href={item?.link}
                    className={`${commonClasses} bg-[#f4f4f4] text-[#333] hover:bg-[#e0e0e0] border border-transparent`}
                  >
                    {item?.menu}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-10 pt-8 border-t border-[#eaeaea] flex flex-col md:flex-row items-center justify-between gap-6 relative">
            <div className="flex flex-wrap justify-center items-center gap-6 text-[14px] text-[#666]">
              <Link
                href="/terms-and-conditions"
                className="hover:text-[#b12acb] hover:underline decoration-[#b12acb] underline-offset-4 transition-all duration-300 font-medium"
              >
                Terms and Conditions
              </Link>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#d4d4d4]"></span>
              <Link
                href="/privacy-policy"
                className="hover:text-[#b12acb] hover:underline decoration-[#b12acb] underline-offset-4 transition-all duration-300 font-medium"
              >
                Privacy Policy
              </Link>
            </div>

            <p className="text-[14px] text-[#777] text-center font-normal">
              © {new Date().getFullYear()} <span className="font-semibold text-[#444]">Career Rocket</span>. All rights reserved.
            </p>
          </div>

          {/* Modal */}
          {counselorPopup && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-4">
              {/* Popup Box */}
              <div className="relative w-full max-w-2xl rounded-[12px] bg-white border border-slate-200/80 shadow-2xl overflow-hidden animate-popup flex flex-col">
                {/* Close Button */}
                <button
                  onClick={() => setCounselorPopup(false)}
                  className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-base" />
                </button>

                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-purple-50/10">
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 pr-10">
                    Talk to a Counselor
                  </h2>

                  <p className="mt-1.5 text-sm text-slate-500">
                    Fill out the form and our team will contact you shortly.
                  </p>
                </div>
                <ContactForm isPopup={1} />
              </div>
            </div >)}
        </div>
      </footer>
    </>
  );
} 
