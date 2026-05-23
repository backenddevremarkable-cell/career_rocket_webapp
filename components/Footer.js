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


  return (<>

    <div className="relative">

      {/* Gradient Border */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent blur-[0.3px]"></div>
      </div>
    </div>
    <footer className="bg-[#fff] border-t border-[#ececec]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-16">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_.7fr_2fr] gap-x-16 gap-y-12">
          {/* LEFT */}
          <div className="max-w-[390px]">
            <Link href={'/'}>
              <Image
                src={logo}
                alt="Career Rocket"
                width={240}
                height={60}
                className="h-auto w-auto"
              />
            </Link>

            <p className="mt-6 text-[16px] leading-[34px] text-[#666666] font-normal">
              Find your path with expert guidance. We bridge the
              gap between your potential and your professional
              reality through science-backed coaching.
            </p>

            {/* APP BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {/* BUTTONS */}

              <Link target="_blank" href={process.env.NEXT_PUBLIC_PLAY_STORE}>
                <Image
                  src={playStore}
                  alt="Google Play"
                  width={140}
                  height={45}
                  className="cursor-pointer hover:scale-105 transition"
                />
              </Link>

              <Link target="_blank" href={process.env.NEXT_PUBLIC_APP_STORE}>
                <Image
                  src={appStore}
                  alt="App Store"
                  width={140}
                  height={45}
                  className="cursor-pointer hover:scale-105 transition" />
              </Link>
            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-9">
              {[
                { icon: FaInstagram, title: "Instagram", link: process.env.NEXT_PUBLIC_FB_URL },
                { icon: FaFacebookF, title: "Facebook", link: process.env.NEXT_PUBLIC_INSTA_URL },
                { icon: FaYoutube, title: "Youtube", link: process.env.NEXT_PUBLIC_YOUTUBE_URL },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link href={item?.link} target="_blank"
                    key={index}
                    title={item.title}
                    className={`group w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index === 4
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
              {[{ menu: "About Us", link: "/about-us" },
              { menu: "Contact Us", link: "/contact-us" },
              { menu: "career Library", link: "/career-library-gen-z" }
                // {menu:"News", link:"/news"}
              ].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href={item?.link}
                      title={item?.menu}
                      className="text-[16px] text-[#666] hover:text-[#b12acb] transition-all duration-300"
                    >
                      {item?.menu}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SPECIALIZATION LEFT */}
          <div>
            <h3 className="text-[22px] leading-none font-bold text-[#111] mb-8">
              Services
            </h3>

            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4 w-full">
              {data && data?.records.map((item, index) => (
                <>
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[16px] text-[#555]"
                  >
                    <span className="w-[7px] h-[7px] rounded-full bg-[#b12acb] mt-[11px] shrink-0"></span>
                    <Link title={item?.title} href={`/${item?.slug}`}>
                      <span>{item?.title}</span>
                    </Link>
                  </li>

                </>
              ))}
            </ul>
          </div>
        </div>

        {/* LOCATION SECTION */}
        <div className="mt-16 rounded-[15px] border border-[#edd9f1] bg-[#f7eef8] px-8 py-9">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center shadow-sm">
              <FaMapMarkerAlt className="text-[#b12acb] text-[14px]" />
            </div>

            <h3 className="text-[18px] font-semibold text-[#111]">
              Find Best Career Counsellor Near You
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">

            {data?.records?.map((item, index) => {
              const city = item?.title?.split(" ").pop();

              return (
                <Link
                  key={index}
                  title={city}
                  href={`/${item?.slug}`}
                  className="px-10 leading-8 rounded-full border border-[#e5c5eb] bg-[#f9f3fa] text-[#a02ac0] text-[14px] font-medium transition-all duration-300 hover:bg-[#b12acb] hover:text-white hover:border-[#b12acb] hover:shadow-md"
                >
                  {city}
                </Link>
              );
            })}

          </div>
        </div>

        {/* QUICK ACCESS */}
        <div className="pt-14 pb-12">
          <h3 className="text-center text-[20px] font-bold text-[#111] mb-8">
            Quick Access
          </h3>

          <div className="flex flex-wrap justify-center gap-5">
            {quickAccess.map((item, index) => {
              const commonClasses =
                "min-w-[170px] h-[42px] px-8 rounded-[14px] text-[15px] font-medium transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-[#ececec] text-[#222] hover:bg-[#dfdfdf]";
              return index === 0 ? (
                <button
                  key={index}
                  onClick={() => setCounselorPopup(true)}
                  className={commonClasses}
                >
                  {item?.menu}
                </button>
              ) : (
                <Link
                  key={index}
                  title={item?.menu}
                  href={item?.link}
                  className={`${commonClasses} flex items-center justify-center`}
                >
                  {item?.menu}
                </Link>
              )
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#dfdfdf] py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-[14px] text-[#666]">
            <Link
              href="/terms-and-conditions"
              className="hover:text-[#b12acb] transition-all duration-300"
            >
              Terms and Conditions
            </Link>

            <span className="text-[#cfcfcf]">|</span>

            <Link
              href="/privacy-policy"
              className="hover:text-[#b12acb] transition-all duration-300"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-[14px] text-[#666] text-center">
            © 2026 Careerrocket. All rights reserved.
          </p>

          {/* Modal */}
          {counselorPopup && (<ContactForm isPopup={1} />)}
        </div>
      </div>
    </footer>
  </>
  );
} 
