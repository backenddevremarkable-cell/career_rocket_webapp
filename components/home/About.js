"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { FaUsers, FaAward, FaBrain } from "react-icons/fa";
import about from "../../assets/images/about.svg";
import success from "../../assets/images/success.gif";
import mentorship from "../../assets/images/mentorship.gif";
import certificate from "../../assets/images/certificate-authority.gif";
import Image from "next/image";
import DarkButton from "../common/button/Dark";
import LightButton from "../common/button/Light";

export default function About() {

  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setTimeout(() => setStartCount(true), 800);
  }, []);

  return (
    <>
      {/* ABOUT SECTION */}
      
      <section className="bg-gray-100 py-0" id="about">
        <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-12 items-center 
        pt-10 md:pt-0 px-4 sm:px-6 lg:px-8 about-section">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Are you <span className="text-gray-900">confused</span>
              <br />
              about your <span className="text-purple-600 text-primary">career!</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Unlock your true potential with our science-backed
              psychometric assessments and personalized expert guidance.
            </p>

            <div className="mt-8 flex gap-4">
              <DarkButton link="/ideal-career-test" className={'rounded-[25px]'} text={'Start Career Assessment →'}  />
              <LightButton link="/career-library" className={'rounded-[25px]'} text={'Explore Careers'} />
            </div>
          </div>

          {/* RIGHT IMAGE + FLOATING CARDS */}
          <div className="relative">

            <Image
              src={about}
              alt="student"
              className=""
              style={{ width: '100%'}}
            />

         {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [-10, 80], x: [0, -0] }}
              transition={{ repeat: 0, duration: 1.5, delay: 2 }}
              viewport={{ once: true, amount: 0 }}
              className="floating-card top-[5%] right-[30%] motion-card-1"
            >
              {/* <FaUsers className="text-orange-500 text-xl" /> */}
              <Image src={success} width={42}/>
                <span className="font-semibold">
                {startCount && <CountUp end={200} duration={2} enableScrollSpy scrollSpyOnce />}+ Careers
                </span>
            </motion.div>
            {/* Floating Card 1 */}

                {/* Certified Courses */}
                <motion.div
                    animate={{ y: [-10, 80], x: [0, -70] }}
                    transition={{ repeat: 0, duration: 1.5, delay: 3 }}
                    viewport={{ once: true, amount: 0 }}
                    className="floating-card top-[35%] left-[5%] cerfiacte-motion motion-card-2"
                >
                    <span className="font-semibold">Certified Courses</span>
                    <Image src={certificate} width={42}/>
                    {/* <FaAward className="text-purple-500 text-lg" /> */}
                </motion.div> 

                {/* Expert Mentors */}
                <motion.div
                    initial={{ y: 0 }}
                    transition={{  duration: 1.5, delay: 1 }}
                    whileInView={{ opacity: 1, y: [-5, -60]  }}
                    viewport={{ once: true, amount: 0 }}
                    className="floating-card bottom-[0%] right-[27%] motion-card-3"
                >
                    {/* <FaBrain className="text-indigo-500 text-lg" /> */}
                    <Image src={mentorship} width={42}/>
                    <span className="font-semibold">Expert Mentors</span>
                </motion.div>

          </div>
        </div>
      </section>
 
    </>
  );
}
