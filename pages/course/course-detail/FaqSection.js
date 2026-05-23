"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

const modules = [
  {
    title: "The Science of Measuring Minds",
    content:
      "An overview of why we measure behavior and the evolution of psychometric tools from the 20th century to modern digital platforms.",
    points: ["History of Testing", "Quantitative vs Qualitative"],
  },
  {
    title: "Defining Behavioral Constructs",
  },
  {
    title: "Standardization & Norming",
  },
  {
    title: "Advanced Item Analysis",
  },
  {
    title: "Capstone Project: Assessment Design",
  },
];

export default function FaqSection() {
  return ( modules ?
    <section className="relative w-full bg-slate-50/50 py-24 overflow-hidden border-b border-slate-100">
      {/* Background ambient light */}
      <div className="absolute left-[-5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* Tagline */}
        <span className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-3 block text-center">
          Syllabus Breakdown
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 mb-16 leading-tight">
          Course <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Modules</span>
        </h2>

        {/* Accordion */}
        <div className="space-y-4">
          {modules.map((item, i) => (
            <Disclosure key={i} defaultOpen={i === 0}>
              {({ open }) => (
                <div
                  className={`border rounded-2xl p-5 transition-all duration-300 bg-white ${
                    open
                      ? "border-purple-500/25 shadow-[0_15px_35px_-10px_rgba(159,35,168,0.06)]"
                      : "border-slate-200/60 hover:border-purple-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
                  }`}
                >
                  {/* Header */}
                  <Disclosure.Button className="w-full flex justify-between items-center text-left cursor-pointer group">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-purple-600 mb-1.5 block uppercase">
                        MODULE {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 tracking-tight transition-colors group-hover:text-purple-800">
                        {item.title}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${open ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                      <ChevronUp
                        className={`w-4 h-4 transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </Disclosure.Button>

                  {/* Content */}
                  {item.content && (
                    <Disclosure.Panel className="mt-5 text-slate-600 text-sm sm:text-base border-t border-slate-100 pt-4 leading-relaxed">
                      <p>{item.content}</p>

                      {/* Points */}
                      {item.points && (
                        <div className="flex flex-wrap gap-3 mt-5">
                          {item.points.map((p, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-2 bg-purple-50/50 border border-purple-100/40 text-slate-600 px-3.5 py-1.5 rounded-full text-xs font-medium"
                            >
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </Disclosure.Panel>
                  )}
                </div>
              )}
            </Disclosure>
          ))}
        </div>

      </div>
    </section> : null
  );
}