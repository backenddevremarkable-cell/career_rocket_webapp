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
    <section className="w-full bg-purple-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Course <span className="text-purple-700">Modules</span>
        </h2>

        {/* Accordion */}
        <div className="space-y-4">
          {modules.map((item, i) => (
            <Disclosure key={i} defaultOpen={i === 0}>
              {({ open }) => (
                <div
                  className={`rounded-2xl p-5 transition-all ${
                    open
                      ? "bg-white shadow-md border-l-4 border-purple-700"
                      : "bg-white/70"
                  }`}
                >
                  {/* Header */}
                  <Disclosure.Button className="w-full flex justify-between items-center text-left">
                    <div>
                      <p className="text-xs tracking-widest text-purple-600 mb-1">
                        MODULE {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    <ChevronUp
                      className={`w-5 h-5 transition-transform ${
                        open ? "rotate-180 text-purple-700" : "text-gray-500"
                      }`}
                    />
                  </Disclosure.Button>

                  {/* Content */}
                  {item.content && (
                    <Disclosure.Panel className="mt-4 text-gray-600 text-sm">
                      <p>{item.content}</p>

                      {/* Points */}
                      {item.points && (
                        <div className="flex flex-wrap gap-6 mt-4 text-sm">
                          {item.points.map((p, idx) => (
                            <span
                              key={idx}
                              className="flex items-center gap-2 text-gray-500"
                            >
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
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