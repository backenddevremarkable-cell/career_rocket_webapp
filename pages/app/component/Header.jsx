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


export default function Header() {
  const [openProfile, setOpenProfile] =
    useState(false);

  const [userData, setUserData] = useState(null);
  const { users } = useDataStore((state) => state);

    useEffect(() => {
        setUserData(users)
    }, [users]);


  return (
    <header className="fixed right-0 top-0 z-30 flex h-[78px] w-[calc(100%-255px)] items-center justify-between border-b border-[#ebe7ef] bg-[#fbfafc]/95 px-8 backdrop-blur-lg">
      
      {/* SEARCH */}
      <div className="relative w-[530px]">
         <SearchGloabal isDashboard={true}/> 
        {/* <Search
          size={17}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-[#888]"
        /> */}

        {/* <input
          type="text"
          placeholder="Search courses, mentors, or careers..."
          className="h-[44px] w-full rounded-full border border-[#ece7ef] bg-white pl-12 pr-5 text-[13px] outline-none transition-all duration-300 placeholder:text-[#999] focus:border-[#c026d3] focus:shadow-[0_0_0_4px_rgba(192,38,211,0.08)]"
        /> */}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* ICON */}
        <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-[#ece7ef] bg-white text-[#666] hover:border-[#c026d3] hover:text-[#c026d3]">
          <Bell size={17} />
        </button>

        <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-[#ece7ef] bg-white text-[#666] hover:border-[#c026d3] hover:text-[#c026d3]">
          <Settings size={17} />
        </button>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() =>
              setOpenProfile(!openProfile)
            }
            className="flex items-center gap-3 rounded-[12px] border border-[#ece7ef] bg-white px-3 py-2"
          >
            <div className="text-right">
              <p className="text-[11px] text-[#888]">
                Welcome Back
              </p>

              <h4 className="text-[13px] font-bold text-[#222]">
                Hi, {userData?.name} 👋
              </h4>
            </div>

            <div className="h-[38px] w-[38px]">
             <CustomImage errorMedia={`${BASE_URL}website/img/blog-details-author.png`} img={userData?.profilePhoto} className={`rounded-full`} alt={'career rocket'} />
            </div>

            <ChevronDown
              size={15}
              className={`text-[#666] transition-all duration-300 ${
                openProfile
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          <div
            className={`absolute right-0 top-[70px] w-[220px] overflow-hidden rounded-[18px] border border-[#ece7ef] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 ${
              openProfile
                ? "visible translate-y-0 opacity-100"
                : "invisible translate-y-3 opacity-0"
            }`}
          >
            <div className="border-b border-[#f3eff6] p-4">
              <div className="flex items-center gap-3">
                <div className="h-[44px] w-[44px] shrink-0">
                  <CustomImage errorMedia={`${BASE_URL}website/img/blog-details-author.png`} img={userData?.profilePhoto} className={`rounded-full`} alt={'career rocket'} />
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
      className={`flex h-[44px] w-full items-center gap-3 rounded-[12px] px-3 transition-all duration-200 ${
        danger
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