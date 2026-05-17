"use client";

import { FaCheck } from "react-icons/fa";

export default function AppPromo() {
  return (
    <section id="pricing" className="py-10 md:py-10 bg-[#f6f4f8] px-4">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          Invest in Your{" "}
          <span className="text-purple-600">Career Journey</span>
        </h2>

        <p className="text-gray-500 mt-3 mb-14">
          Affordable plans that give you access to career tests, expert counselling, and growth resources.
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-center">

          {/* BASIC */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-left">
            <h3 className="font-semibold text-lg">Basic</h3>
            <h4 className="text-4xl font-bold mt-2">₹199</h4>

            <ul className="mt-6 space-y-4 text-gray-600 text-sm">
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> Basic Career Test</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> Career Library Access</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> Community Forum</li>
            </ul>

            <button className="mt-8 w-full border border-purple-600 text-purple-600 py-3 rounded-full btn-hover hover:text-white transition">
              Get Started
            </button>
          </div>

          {/* PRO (CENTER ACTIVE) */}
    
          
          <div className="relative bg-white rounded-2xl p-10 shadow-xl border-2 border-purple-600 scale-105 animated-border">
            
            {/* Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm px-4 py-1 rounded-full">
              Most Popular
            </span>

            <h3 className="font-semibold text-lg">Pro</h3>
            <h4 className="text-4xl font-bold mt-2">
              ₹299<span className="text-sm text-gray-500">/month</span>
            </h4>

            <ul className="mt-6 space-y-4 text-gray-600 text-sm">
              <li className="flex gap-3 items-center"><FaCheck className="text-purple-600"/> Advanced Psychometrics</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-purple-600"/> Detailed SRA Report</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-purple-600"/> AI Career Bot Access</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-purple-600"/> 2 Expert Calls/mo</li>
            </ul>

            <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-full hover:scale-105 transition">
              Get Started
            </button>
          </div>

          {/* PREMIUM */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-left">
            <h3 className="font-semibold text-lg">Premium</h3>
            <h4 className="text-4xl font-bold mt-2">
              ₹499<span className="text-sm text-gray-500">/month</span>
            </h4>

            <ul className="mt-6 space-y-4 text-gray-600 text-sm">
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> Unlimited Expert Calls</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> All Certification Courses</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> Resume Review</li>
              <li className="flex gap-3 items-center"><FaCheck className="text-gray-400"/> Job Placement Support</li>
            </ul>

            <button className="mt-8 w-full border border-purple-600 text-purple-600 py-3 rounded-full btn-hover hover:text-white transition">
              Get Started
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}