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

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:px-10">

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
          className="relative flex h-[520px] w-full max-w-[620px] items-center justify-center"
        >

          {/* TOP MESSAGE */}
          <div className="absolute right-50 top-0 z-30 max-w-[320px] rounded-[12px] border border-white/50 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
            <TypingText text="Prachee Ma’am, future ke liye best career option kaise choose karu?" />
          </div>

          {/* TOP IMAGE */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-0 z-20 overflow-hidden rounded-[12px] border-[6px] border-white bg-white shadow-2sm"
          >
            <Image
              src={pic2}
              alt="mentor"
              width={260}
              height={300}
              className="h-[250px] w-[220px] object-cover"
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
            className="absolute bottom-10 left-0 z-20 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-2sm"
          >
            <Image
              src={pic1}
              alt="speaker"
              width={320}
              height={320}
              className="h-[320px] w-[320px] object-cover"
            />
          </motion.div>

          {/* BOTTOM MESSAGE */}
          <div className="absolute bottom-24 right-0 z-30 w-full max-w-[350px] rounded-[12px] bg-purple-600 px-4 py-2 leading-1">
            <TypingText
              text="Career guidance helps students discover the right skills, courses, and career opportunities."
              dark
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ======================================
   TYPING EFFECT COMPONENT
====================================== */

function TypingText({ text, dark = false }) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));

      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <div ref={ref} className="w-full">
      <p
        className={`
          text-[12px]
          md:text-base
          font-semibold
          leading-6
          whitespace-normal
          break-words
          ${dark
            ? "text-white"
            : "text-primary"
          }
        `}
      >
        {displayText}

        <span
          className={`ml-1 animate-pulse ${dark ? "text-white" : "text-[#a020f0]"
            }`}
        >
        </span>
      </p>
    </div>
  );
}