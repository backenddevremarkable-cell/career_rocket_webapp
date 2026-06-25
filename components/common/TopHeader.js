"use client";

import Image from "next/image";

export default function TopHeader(props) {
    return (
        <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] overflow-hidden">
            <Image
                src={props.src}
                alt={props.alt}
                fill
                priority
                className="object-cover"
            />

            {/* PREMIUM OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/80 to-slate-950"></div>

            {/* HERO CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6 text-center">

                {/* TITLE */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                    {props.title}
                </h1>

                {/* SUBTITLE */}
                {props.subtitle && (
                    <p className="text-xs sm:text-sm md:text-base text-slate-200/90 mt-3 max-w-2xl leading-relaxed font-medium">
                        {props.subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}