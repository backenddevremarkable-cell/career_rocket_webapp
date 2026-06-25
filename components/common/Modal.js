"use client";
import parse from "html-react-parser";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Modal(props) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-4">
      {/* Modal Card motion container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-3xl rounded-[12px] bg-white border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* HEADER */}
        <div className="relative flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-purple-50/10">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 pr-10">
            {props?.heading}
          </h2>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => props?.setOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes className="text-base" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[70vh] overflow-y-auto px-8 py-6 text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
          <div className="space-y-4">
            {parse(props?.description || "")}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
