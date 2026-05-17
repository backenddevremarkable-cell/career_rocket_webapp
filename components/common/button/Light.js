"use client";

import Link from "next/link";

export default function LightButton({
  text, link, className
}) {
  return (
      <Link
        href={`/${link}`}
         className={`
            inline-flex items-center gap-2
            px-6 py-3
            rounded-[6px]
            border border-[#AF26B9]
            text-[#AF26B9]
            font-semibold
            hover:bg-[#AF26B9]
            hover:text-white
            hover:-translate-y-1
            transition-all duration-300 ${className}`}
        > {text}
        </Link>
  );
}