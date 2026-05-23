"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

import pic1 from "../../assets/images/about/1.png";
import pic2 from "../../assets/images/about/2.png";
import bckgroundImage from "../../assets/images/about/bg.png";
import DarkButton from "../common/button/Dark";

export default function CareerHeroSection() {
  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      style={{
        backgroundImage: `url(${bckgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[12%] h-52 w-52 rounded-full bg-purple-200/30 blur-3xl"></div>
        <div className="absolute left-[35%] top-[20%] h-64 w-64 rounded-full bg-violet-200/20 blur-3xl"></div>
        <div className="absolute right-[15%] top-[18%] h-52 w-52 rounded-full bg-cyan-100/30 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[25%] h-52 w-52 rounded-full bg-purple-100/30 blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 lg:gap-16 lg:flex-row lg:px-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h1 className="text-4xl font-black leading-tight text-[#1a1225] md:text-6xl">
            Your Future,
            <br />
            Powered by{" "}
            <span className="bg-gradient-to-r color-primary text-transparent">
              Expert Guidance
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience a digital-first mentorship ecosystem where visionary
            technology meets personalized human expertise to accelerate your
            career growth.
          </p>


          <DarkButton
            text={
              <>
                Start Your Journey
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </>
            }
            link="counselors"
            className="group mt-10 gap-3 px-8 py-4"
          />
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex w-full max-w-[620px] items-center justify-center h-[430px] sm:h-[480px] md:h-[520px]"
        >

          {/* ─── TOP CHAT BUBBLE (Student) ─── */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-0 top-0 z-30 w-[55%] max-w-[280px] sm:left-auto sm:right-44 sm:w-auto sm:max-w-[300px]"
          >
            {/* Bubble card */}
            <div className="relative rounded-2xl rounded-tl-sm border border-white/60 bg-white/95 px-3 py-2.5 shadow-[0_8px_32px_rgba(159,35,168,0.13)] backdrop-blur-md sm:px-4 sm:py-3">
              {/* Top meta row */}
              <div className="mb-2 flex items-center gap-2">
                {/* Tiny avatar */}
                <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border-2 border-purple-100 shadow-sm">
                  <Image src={pic1} alt="student" className="h-full w-full object-cover" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F23A8]">
                  Student
                </span>
                {/* Typing dots */}
                <span className="ml-auto flex items-center gap-[3px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </span>
              </div>

              {/* Message text */}
              <TypingText
                text="Prachee Ma'am, future ke liye best career option kaise choose karu?"
              />

              {/* Timestamp */}
              <p className="mt-1.5 text-right text-[9px] font-medium text-gray-400">
                Just now
              </p>
            </div>
          </motion.div>

          {/* TOP IMAGE */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-0 z-20 overflow-hidden rounded-[12px] border-[4px] border-white bg-white shadow-xl sm:border-[6px]"
          >
            <Image
              src={pic2}
              alt="mentor"
              width={260}
              height={300}
              className="h-[160px] w-[130px] object-cover sm:h-[200px] sm:w-[175px] md:h-[250px] md:w-[220px]"
            />
          </motion.div>

          {/* CIRCLE IMAGE */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 z-20 overflow-hidden rounded-full border-[4px] border-white bg-white shadow-xl sm:border-[6px] sm:bottom-6 md:bottom-10"
          >
            <Image
              src={pic1}
              alt="speaker"
              width={320}
              height={320}
              className="h-[160px] w-[160px] object-cover sm:h-[240px] sm:w-[240px] md:h-[320px] md:w-[320px]"
            />
          </motion.div>

          {/* ─── BOTTOM CHAT BUBBLE (Mentor Reply) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute bottom-14 right-0 z-30 w-[58%] max-w-[280px] sm:bottom-20 sm:w-auto sm:max-w-[340px] md:bottom-24 md:max-w-[360px]"
          >
            {/* Bubble card */}
            <div className="relative rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#9F23A8] via-[#a829b2] to-[#7a1882] px-4 py-3 shadow-[0_10px_36px_rgba(159,35,168,0.30)]">
              {/* Glint highlight overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl rounded-tr-sm bg-gradient-to-b from-white/10 to-transparent"></div>

              {/* Top meta row */}
              <div className="relative mb-2 flex items-center gap-2">
                {/* Tiny mentor avatar */}
                <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/40 shadow-sm">
                  <Image src={pic2} alt="prachee" className="h-full w-full object-cover" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Prachee Ma&apos;am
                </span>
                {/* Verified dot */}
                <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[9px] font-black text-white">
                  ✓
                </span>
              </div>

              {/* Message text */}
              <div className="relative">
                <TypingText
                  text="Career guidance helps students discover the right skills, courses, and career opportunities."
                  dark
                  delayStart={2000}
                />
              </div>

              {/* Timestamp */}
              <p className="relative mt-1.5 text-right text-[9px] font-medium text-white/50">
                Career Expert • Online
              </p>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

/* ======================================
   TYPING EFFECT COMPONENT
====================================== */

function TypingText({ text, dark = false, delayStart = 0 }) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      let index = 0;

      intervalId = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, 28);
    }, delayStart);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, text, delayStart]);

  return (
    <div ref={ref} className="w-full">
      <p
        className={`
          text-[13px]
          md:text-[15px]
          font-semibold
          leading-[1.6]
          whitespace-normal
          break-words
          ${dark ? "text-white" : "text-[#1a1225]"}
        `}
      >
        {displayText}
        {!done && (
          <span
            className={`ml-0.5 inline-block h-[1em] w-[2px] animate-pulse align-middle ${dark ? "bg-white/60" : "bg-[#9F23A8]"
              }`}
          ></span>
        )}
      </p>
    </div>
  );
}