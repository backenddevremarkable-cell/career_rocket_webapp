"use client";
import { withAuth } from '../../../utils/withAuth';
import Image from "next/image";
import certificateImg from "../../../assets/images/certificate.jpeg";
import { Download, Award, ShieldCheck } from "lucide-react";

function Certificate() {
    return (
        <main className="min-h-screen bg-[#F6F4F8]">
            <section className="lg:ml-[255px] pt-[78px] px-4 md:px-8 pb-12">
                <div className="min-h-[80vh] max-w-[1000px] mx-auto flex flex-col items-center justify-center">

                    {/* Header Section */}
                    <div className="mb-10 text-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f4e6fc] text-primary  mb-4">
                            <Award size={32} />
                        </div>
                        <h1 className="text-[32px] md:text-[32px] font-bold  tracking-tight text-[#1a1a1a]">
                            Professional Certificate
                        </h1>
                        <p className="mt-3 text-[15px] font-medium text-[#666] max-w-[600px] mx-auto">
                            You can view and download your verified course certificate below.
                        </p>
                    </div>

                    {/* Certificate Frame */}
                    <div className="group relative w-full rounded-[24px] bg-white p-4 md:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-[#eaeaea]">
                        {/* Glowing Background Effect */}
                        <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-primary/20 via-fuchsia-500/20 to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>

                        <div className="relative overflow-hidden rounded-[16px] border border-[#f0f0f0] bg-[#fcfbfc] shadow-inner">
                            <Image
                                src={certificateImg}
                                alt="professional certificate"
                                className="w-full h-auto object-cover transform duration-700 ease-out group-hover:scale-[1.02]"
                                priority
                            />

                            {/* Overlay actions on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                                <a
                                    href={certificateImg.src || "/assets/images/certificate.jpeg"}
                                    download="My_Professional_Certificate.jpeg"
                                    className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-primary shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 cursor-pointer"
                                >
                                    <Download size={18} />
                                    Download Image
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Meta info */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-[14px] font-medium text-[#777]">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        <span>Verified & Authenticated by Career Rocket</span>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default withAuth(Certificate);