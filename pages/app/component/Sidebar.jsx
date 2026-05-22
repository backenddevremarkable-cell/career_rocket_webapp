"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const pathname = usePathname();

  const assessmentPaths = [
    "/personality-test",
    "/ideal-career-test",
    "/my-test",
  ];

  const [openAssessment, setOpenAssessment] =
    useState(
      assessmentPaths.includes(pathname)
    );

  const isAssessmentActive =
    assessmentPaths.includes(pathname);

  // Close sidebar on page change
  useEffect(() => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 z-50 h-screen w-[255px] border-r border-[#ebe7ef] bg-[#fbfafc] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col`}>

        {/* LOGO */}
        <div className="flex h-[78px] items-center justify-between border-b border-[#f1edf4] px-6">

          <Link href="/">
            <Image
              src={logo}
              width={150}
              alt="logo"
              className="py-2"
            />
          </Link>

          {/* CLOSE BUTTON FOR MOBILE */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666] hover:bg-[#f5eff9] lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-4 py-5">

        {/* DASHBOARD */}
        <Link
          href="/dashboard"
          className={`flex h-[48px] items-center gap-3 rounded-[14px] px-4 transition-all duration-200 ${
            pathname === "/dashboard"
              ? "bg-primary text-white"
              : "hover:bg-[#f5eff9]"
          }`}
        >
          <LayoutDashboard
            size={18}
            className={
              pathname === "/dashboard"
                ? "text-white"
                : "text-[#5f5868]"
            }
          />

          <span
            className={`text-[14px] font-semibold ${
              pathname === "/dashboard"
                ? "text-white"
                : "text-[#2d2438]"
            }`}
          >
            Dashboard
          </span>
        </Link>

        <div className="mt-3 space-y-[5px]">

          <SidebarItem
            icon={BookOpen}
            url="/my-course"
            title="My Courses"
          />

          <SidebarItem
            icon={GraduationCap}
            url="/scholarship-test"
            title="Scholarship Test"
          />

          {/* CAREER ASSESSMENT */}
          <div>

            <button
              onClick={() =>
                setOpenAssessment(
                  !openAssessment
                )
              }
              className={`flex h-[48px] w-full items-center justify-between rounded-[14px] px-4 transition-all duration-200 ${
                isAssessmentActive
                  ? "bg-[#f6effd]"
                  : "hover:bg-[#f5eff9]"
              }`}
            >
              <div className="flex items-center gap-3">

                <ClipboardList
                  size={18}
                  className={
                    isAssessmentActive
                      ? "text-primary"
                      : "text-[#5f5868]"
                  }
                />

                <span
                  className={`text-[14px] font-medium ${
                    isAssessmentActive
                      ? "text-primary"
                      : "text-[#2d2438]"
                  }`}
                >
                  Career Assessment
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-all duration-300 ${
                  openAssessment
                    ? "rotate-180"
                    : ""
                } ${
                  isAssessmentActive
                    ? "text-primary"
                    : "text-[#777]"
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

                <SubMenuItem
                  url="/personality-test"
                  title="Personality Test"
                />

                <SubMenuItem
                  url="/ideal-career-test"
                  title="Ideal Career Test"
                />

                <SubMenuItem
                  url="/my-test"
                  title="My Tests"
                />
              </div>
            </div>
          </div>

          <SidebarItem
            icon={Library}
            url="/career-library"
            title="Career Library"
          />

          <SidebarItem
            icon={Briefcase}
            url="/ai-admission-guidance"
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
    </>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  icon: Icon,
  title,
  url,
}) {

  const pathname = usePathname();
  const isActive = pathname === url;
  const isCourse = pathname.includes("course");

  return (
    <Link
      href={url || "#"}
      className={`flex h-[48px] w-full items-center gap-3 rounded-[14px] px-4 transition-all duration-200 ${
        isActive || (title === "My Courses" && isCourse)
          ? "bg-primary text-white"
          : "hover:bg-[#f5eff9]"
      }`}
    >
      <Icon
        size={18}
        className={
          isActive
            ? "text-white"
            : "text-[#5f5868]"
        }
      />

      <span
        className={`text-[14px] font-medium ${
          isActive
            ? "text-white"
            : "text-[#2d2438]"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}

/* ================= SUB MENU ITEM ================= */

function SubMenuItem({
  title,
  url,
}) {

  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={`flex h-[38px] w-full items-center rounded-[10px] px-3 text-[13px] font-medium transition-all duration-200 ${
        isActive
          ? "bg-[#f6effd] text-[#a126db]"
          : "text-[#6f647b] hover:bg-[#f6effd] hover:text-[#a126db]"
      }`}
    >
      {title}
    </Link>
  );
}