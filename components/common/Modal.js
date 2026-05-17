"use client";
import parse from "html-react-parser";
import { FaTimes } from "react-icons/fa";

export default function Modal(props) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl rounded-[12px] bg-white shadow-2xl overflow-hidden">
            {/* CLOSE */}
        <div className="bg-primary py-1"> 
            <button
            onClick={() => props?.setOpen(false)}
            className="absolute top-5 right-5 z-10 cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
            <FaTimes className="text-black text-lg" />
            </button>
            

            {/* HEADER */}
            <div className="px-8 py-6">
            <h2 className="text-[25px] text-[#fff] font-semibold">
                {props?.heading}
            </h2>
            </div>
        </div> 

            {/* CONTENT */}
            <div className="max-h-[80vh] overflow-y-auto px-8 py-6 text-[17px] text-justify leading-8 text-gray-700">
            {parse(props?.description || "")}
            </div>
        </div>
        </div>
  );
}