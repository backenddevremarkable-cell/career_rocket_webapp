"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  ChevronDown,
  ClipboardList,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore";
import CustomImage from "../../../components/common/ImageMedia";
import { BASE_URL } from "@/config";
import SearchGloabal from "../../../components/common/SearchGloabal";


export default function Header({ setSidebarOpen }) {
  const [openProfile, setOpenProfile] =
    useState(false);

  const [userData, setUserData] = useState(null);
  const { users } = useDataStore((state) => state);

  useEffect(() => {
    setUserData(users)
  }, [users]);


  return (
    <header className="fixed right-0 top-0 z-30 flex h-[78px] w-full lg:w-[calc(100%-255px)] items-center justify-between border-b border-[#f0f0f0] bg-white/95 px-4 sm:px-8 backdrop-blur-md">

      {/* LEFT: HAMBURGER & SEARCH */}
      <div className="flex items-center gap-4 w-full max-w-[530px]">
        {/* HAMBURGER FOR MOBILE */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] bg-white text-[#555] shadow-[0_2px_10px_rgba(0,0,0,0.04)] lg:hidden  hover:text-primary transition-all duration-300"
        >
          {/* Custom 3-line hamburger for a perfectly clean look */}
          <div className="flex flex-col gap-[4.5px] items-center justify-center">
            <span className="w-5 h-[2px] bg-current rounded-full"></span>
            <span className="w-5 h-[2px] bg-current rounded-full"></span>
            <span className="w-5 h-[2px] bg-current rounded-full"></span>
          </div>
        </button>

        {/* SEARCH */}
        <div className="relative flex-1 hidden sm:block">
          <SearchGloabal isDashboard={true} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="group flex h-[44px] sm:h-[48px] items-center gap-3 rounded-[14px] sm:rounded-[16px] bg-white pl-2 pr-3 sm:pr-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300"
          >
            {/* Desktop Text */}
            <div className="text-left hidden sm:block ml-2">
              <p
                className="text-[11px] font-medium text-[#888] leading-none mb-1"
                style={{ whiteSpace: "nowrap" }}
              >
                Welcome Back
              </p>
              <h4
                className="text-[13px] font-bold text-[#1a1a1a] leading-none"
                style={{ whiteSpace: "nowrap" }}
              >
                Hi, {userData?.name} 👋
              </h4>
            </div>

            <div className="relative h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] shrink-0 overflow-hidden rounded-full bg-[#f3eff6]">
              <CustomImage
                noMediaImg={true}
                errorMedia={`${BASE_URL}website/img/blog-details-author.png`}
                img={userData?.profilePhoto}
                className="absolute inset-0 h-full w-full object-cover rounded-full"
                alt={'career rocket'}
              />
            </div>

            <ChevronDown
              size={15}
              strokeWidth={2.5}
              className={`text-[#555] transition-transform duration-300 ${openProfile ? "rotate-180 text-primary" : ""}`}
            />
          </button>

          {/* DROPDOWN */}
          <div
            className={`absolute right-0 top-[70px] w-[220px] overflow-hidden rounded-[18px] border border-[#ece7ef] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 ${openProfile
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-3 opacity-0"
              }`}
          >
            <div className="border-b border-[#f3eff6] p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-[44px] w-[44px] shrink-0 overflow-hidden rounded-full border border-gray-100 bg-[#f3eff6]">
                  <CustomImage
                    noMediaImg={true}
                    errorMedia={`${BASE_URL}website/img/blog-details-author.png`}
                    img={userData?.profilePhoto}
                    className="absolute inset-0 h-full w-full object-cover rounded-full"
                    alt={'career rocket'}
                  />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#222]">
                    {userData?.name}
                  </h4>

                  <p className="text-[12px] text-[#777]">
                    Student Account
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">

              <DropdownItem
                icon={User}
                url="/profile"
                title="My Profile"
              />

              <DropdownItem
                icon={ClipboardList}
                url="/my-test"
                title="My Tests"
              />

              <DropdownItem
                icon={LogOut}
                url="/logout"
                title="Logout"
                danger
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================= DROPDOWN ================= */

function DropdownItem({
  icon: Icon,
  title,
  url,
  danger = false,
}) {
  return (
    <Link href={url}
      className={`flex h-[44px] w-full items-center gap-3 rounded-[12px] px-3 transition-all duration-200 ${danger
        ? "text-red-500 hover:bg-red-50"
        : "text-[#333] hover:bg-[#f7f3fb]"
        }`}
    >
      <Icon size={17} />

      <span className="text-[13px] font-medium">
        {title}
      </span>
    </Link>
  );
}