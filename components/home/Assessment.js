"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import pic1 from "../../assets/images/yourSelft-1.svg";
import pic2 from "../../assets/images/yourSelft-2.svg";
import { useRouter } from "next/router";
import LightButton from "../common/button/Light";
import DarkButton from "../common/button/Dark";

export default function Assessment() {

  const router = useRouter();

  return (
    <section id="test" className="py-10 md:py-10 bg-[#fff] px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Know Yourself.{" "}
            <span className="text-purple-600">Prepare Better.</span>
          </h2>
          <p className="text-gray-500 mt-3">
            Comprehensive assessments that reveal your strengths, interests,
            and career readiness level.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT CARD */}
          <div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-md"
          >
            <div className="relative">
              <Image
                src={pic1}   // 👈 apni image path lagao
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                alt=""
              />
            </div>

            <div className="p-8 pt-10">
              <h3 className="text-xl font-semibold text-gray-900">
                Psychometric Test
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 text-sm">
                <li>✓ Personality Analysis</li>
                <li>✓ Aptitude Measurement</li>
                <li>✓ Interest Profiling</li>
              </ul>

              <DarkButton className={'mt-6 rounded-md'} text={'Start Psychometric Test'} link={"ideal-career-test"} />
              {/* 
              <button text={'Start Psychometric Test'} onClick={()=>router.push("/ideal-career-test")} className="mt-6 cursor-pointer bg-purple-600 text-white px-5 py-3 rounded-md hover:bg-purple-700 transition
                hover:bg-[#981fa1]
                hover:shadow-[0_15px_35px_rgba(175,38,185,0.35)]
                hover:-translate-y-1
                hover:scale-[1.02]
              ">
                Start Psychometric Test
              </button> */}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-md"
          >
            <div className="relative">
              <Image
                src={pic2}   // 👈 apni image path lagao
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                alt=""
              />
            </div>

            <div className="p-8 pt-10 bg-[#f6f4f8]">
              <h3 className="text-xl font-semibold text-gray-900">
                Skills Readiness
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 text-sm">
                <li>✓ Identify Skill Gaps</li>
                <li>✓ Industry Benchmarking</li>
                <li>✓ Readiness Score</li>
              </ul>

              <LightButton className={'mt-6 rounded-md'} text={'Start SRA Test'} link={'personality-test'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}