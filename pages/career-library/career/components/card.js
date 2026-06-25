"use client";
import { saveToStorage, getSlug } from "@/utils/index";
import { useRouter } from "next/router";
import { useDataStore } from "@/store/useDataStore";
import Image from "next/image";
import Link from "next/link";

export default function Card(item) {

    const { setCaree } = useDataStore();
    const router = useRouter()

    const handleClick = (e) => {
        setCaree(e?.id);
        saveToStorage("cname", e?.name_en);
        saveToStorage("cid", e?.id);
        // router.push(`/career/${getSlug(e.name_en)}`); 
    }


    return (
        <Link
            href={`/career/${getSlug(item.name_en)}`}
            title={item.name_en}
            onClick={() => handleClick(item)}
            className="group text-left"
        >
            <div
                className="
            relative overflow-hidden
            rounded-[10px]
            bg-white/90
            backdrop-blur-lg
            border border-gray-100
            transition-all duration-500
            hover:-translate-y-2
            p-5"
            >

                {/* Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-purple-100/30 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-50 text-[#840d8d] border border-purple-100/50 shadow-sm">
                        {item.careerCount} Careers
                    </span>
                </div>

                {/* Image */}
                <div className="relative z-10 flex items-center justify-center h-44 cursor-pointer">
                    <div
                        className="
            w-32 h-32
            rounded-full
            bg-gradient-to-br from-purple-50 to-fuchsia-50
            flex items-center justify-center
            shadow-inner
            group-hover:scale-110
            transition duration-500"
                    >
                        <Image
                            src={item.icon}
                            alt={item.name_en}
                            width={120}
                            height={120}
                            loading="lazy"
                            className="
                rounded-full
                object-cover
                drop-shadow-sm
                group-hover:rotate-3
                transition duration-500"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center mb-4">
                    <h3
                        className="
                h-[50px]
                text-lg
                font-bold
                text-gray-800
                group-hover:text-[#840d8d]
                transition duration-300
                "
                    >
                        {item.name_en}
                    </h3>

                    {/* <p className="text-sm text-gray-500 mt-2">
            Explore career opportunities
            </p> */}
                </div>

                {/* Bottom Line */}
                <div
                    className="
            absolute bottom-0 left-0
            h-1 w-0
            bg-gradient-to-r from-[#AF26B9] to-[#AF26B9]
            group-hover:w-full
            transition-all duration-500
        "
                />
            </div>
        </Link>
    );
}