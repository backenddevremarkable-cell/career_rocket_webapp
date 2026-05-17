"use client";

import { useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  Briefcase,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Library,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../assets/images/logo.svg";


export default function Sidebar() {
  const [openAssessment, setOpenAssessment] =
    useState(true);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[255px] border-r border-[#ebe7ef] bg-[#fbfafc] lg:flex lg:flex-col">
      
      {/* LOGO */}
      <div className="flex h-[78px] items-center border-b border-[#f1edf4] px-6">

         <Link href="/">
          <Image
            src={logo}
            width={180}
            alt="logo"
            className={"py-2"}
          />
        </Link>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        
        {/* ACTIVE */}
        <Link
          href="#"
          className="flex h-[48px] items-center gap-3 rounded-[14px] bg-primary px-4 text-white"
        >
          <LayoutDashboard size={18} />

          <span className="text-[14px] font-semibold">
            Dashboard
          </span>
        </Link>

        <div className="mt-3 space-y-[5px]">
          
          <SidebarItem
            icon={BookOpen}
            title="My Purchase"
          />

          <SidebarItem
            icon={GraduationCap}
            title="Scholarship Test"
          />

          {/* CAREER */}
          <div>
            <button
              onClick={() =>
                setOpenAssessment(
                  !openAssessment
                )
              }
              className="flex h-[48px] w-full items-center justify-between rounded-[14px] px-4 transition-all duration-200 hover:bg-[#f5eff9]"
            >
              <div className="flex items-center gap-3">
                <ClipboardList
                  size={18}
                  className="text-[#5f5868]"
                />

                <span className="text-[14px] font-medium text-[#2d2438]">
                  Career Assessment
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-[#777] transition-all duration-300 ${
                  openAssessment
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* SUB MENU */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openAssessment
                  ? "max-h-[300px]"
                  : "max-h-0"
              }`}
            >
              <div className="ml-7 mt-1 space-y-1 border-l border-[#eadcf7] pl-5">
                
                <SubMenuItem url="/personality-test" title="Personality Test" />

                <SubMenuItem url="/ideal-career-test" title="Ideal Career Test" />

                {/* <SubMenuItem title="Skill Analysis" /> */}
              </div>
            </div>
          </div>

          <SidebarItem
            icon={Library}
            title="Career Library"
          />

          <SidebarItem
            icon={Briefcase}
            title="AI Admission Guidance"
          />
        </div>

        {/* BUTTON */}
        <button className="mt-10 flex h-[50px] w-full items-center justify-center gap-2 rounded-[12px] bg-primary text-[14px] font-semibold text-white shadow-[0_10px_30px_rgba(193,53,226,0.28)]">
          <Sparkles size={16} />
          New Career Goal
        </button>
      </div>
    </aside>
  );
}

/* ================= ITEM ================= */

function SidebarItem({
  icon: Icon,
  title,
}) {
  return (
    <button className="flex h-[48px] w-full items-center gap-3 rounded-[14px] px-4 transition-all duration-200 hover:bg-[#f5eff9]">
      <Icon
        size={18}
        className="text-[#5f5868]"
      />

      <span className="text-[14px] font-medium text-[#2d2438]">
        {title}
      </span>
    </button>
  );
}

function SubMenuItem({ title, url }) {
  return (
    <Link href={url} className="flex h-[38px] w-full items-center rounded-[10px] px-3 text-[13px] font-medium text-[#6f647b] transition-all duration-200 hover:bg-[#f6effd] hover:text-[#a126db]">
      {title}
    </Link>
  );
}