"use client";

import Image from "next/image";

export default function TopHeader(props) {
    return (
        <div className="relative w-full  h-[180px]sm:h-[220px] md:h-[220px]
              overflow-hidden">
            <Image
                src={props.src}
                alt={props.alt}
                fill
                priority
                className="object-cover"
            />

            {/* PREMIUM OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

            {/* HERO CONTENT */}
            <div className="relative z-10 text-center  mx-auto h-full px-4 flex">
                <div style={{ margin: 'auto' }}>

                    {/* TITLE */}
                    <h1 className="text-3xl md:text-5xl
                                 font-black
                                 uppercase
                                 text-white
                                 leading-tight
                                 tracking-tight
                               ">
                        {props.title}
                    </h1>
                    <p className="text-gray-500 mt-2 text-white">
                        {props.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}