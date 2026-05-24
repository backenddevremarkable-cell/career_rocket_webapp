"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../assets/images/logo.svg";
import {
  HiOutlineMenu,
  HiX,
  HiChevronDown,
  HiHome,
  HiBookOpen,
  HiBriefcase,
  HiClipboardList,
  HiUsers,
  HiAcademicCap,
  HiPhone,
  HiLogout,
  HiViewGrid
} from "react-icons/hi";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDataStore } from "@/store/useDataStore";
import useScrollSpy from "@/hooks/observerSection";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const { users } = useDataStore((state) => state);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#profile-menu-container')) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // user data sync
  useEffect(() => {
    setUserData(users);
  }, [users]);

  // scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY > 20;
      const threshold = 20;

      if (currentScrollY <= threshold) {
        setScrolled(false);
      } else {
        setScrolled(isScrollingUp);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuItems = [
    { label: "Home", href: "/", key: "", icon: HiHome },

    {
      label: "Career Library",
      key: "career",
      icon: HiBookOpen,
      children: [
        { label: "Career", href: "/career-library" },
        { label: "Gen Z Career", href: "/career-library-gen-z" },
      ],
    },

    { label: "Our Services", href: "/#our-service", key: "our-service", icon: HiBriefcase },
    { label: "Tests", href: "/#test", key: "test", icon: HiClipboardList },
    { label: "Experts", href: "/#experts", key: "experts", icon: HiUsers },
    { label: "Courses", href: "/#courses", key: "courses", icon: HiAcademicCap },
    { label: "Contact us", href: "/contact-us", key: "contact-us", icon: HiPhone },
  ];

  const activeSection = useScrollSpy(menuItems.map((i) => i.key));

  const isItemActive = (item) => {
    if (!pathname) return false;
    if (item.href) {
      if (item.href === "/") {
        return pathname === "/";
      }
      if (item.href.startsWith("/#")) {
        return activeSection === item.key && pathname === "/";
      }
      return pathname === item.href || pathname.startsWith(item.href + "/");
    }
    if (item.children) {
      return item.children.some(sub => pathname === sub.href || pathname.startsWith(sub.href + "/"));
    }
    return false;
  };

  return (
    <nav
      className={`${scrolled ? "fixed" : pathname === "/" ? "absolute" : ""} 
      w-full top-0 left-0 z-50 transition-all duration-300
      ${scrolled ? "bg-white shadow-md" : ""}`}
    >
      <div className={`max-w-6xl mx-auto px-6 ${!scrolled ? "py-3" : ""} flex justify-between items-center`}>

        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            width={scrolled ? 150 : 170}
            alt="logo"
            className={scrolled ? "py-2" : ""}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 font-medium text-gray-700">
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.key} className="relative group">
                  {/* 🔽 Label + Icon */}
                  <span className="flex items-center gap-1 cursor-pointer hover:text-[#9D2BA8] transition duration-200">
                    {item.label}
                    <HiChevronDown className="text-sm transition-transform duration-300 group-hover:rotate-180" />
                  </span>

                  {/* Dropdown */}
                  <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-50 border border-slate-100">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-slate-700 hover:text-[#9D2BA8] hover:bg-slate-50 transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.key} href={item.href} className="hover:text-[#9D2BA8] transition duration-200">
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          {userData ? (
            <div id="profile-menu-container" className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 lg:gap-3 cursor-pointer p-1 lg:pr-3 rounded-full lg:border lg:border-slate-200 bg-white lg:hover:border-purple-300 transition-all"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#d946ef] to-[#8b1ab6] flex items-center justify-center text-white font-bold shadow-[0_4px_10px_rgba(217,70,239,0.3)] ring-2 ring-white">
                  {userData.profileImage ? (
                    <img src={userData.profileImage} alt={userData.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm md:text-base">{(userData.name || "U")[0].toUpperCase()}</span>
                  )}
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-sm font-bold text-slate-800 leading-none">{userData.name || "User"}</span>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">Student</span>
                </div>
                <HiChevronDown className={`hidden lg:block text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </div>

              {/* Dropdown Menu */}
              <div className={`absolute right-0 top-[calc(100%+10px)] w-56 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] rounded-[16px] border border-slate-100 overflow-hidden z-50 transition-all duration-300 origin-top-right ${profileOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>

                {/* Mobile only Header inside dropdown */}
                <div className="lg:hidden px-5 py-4 bg-slate-50 border-b border-slate-100">
                  <span className="block text-sm font-bold text-slate-800 truncate">{userData.name || "User"}</span>
                  <span className="block text-[11px] font-semibold text-slate-500 mt-1">Student</span>
                </div>

                <div className="p-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-[12px] text-slate-700 hover:text-purple-700 transition font-semibold"
                  >
                    <HiViewGrid className="text-xl" />
                    <span className="text-sm">Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      localStorage.clear();
                      window.location.href = '/';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 mt-1 hover:bg-red-50 rounded-[12px] text-red-500 hover:text-red-600 transition cursor-pointer text-left font-semibold"
                  >
                    <HiLogout className="text-xl" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:block">
              <Link href="/sign-up" className="btn-gradient">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <div className="lg:hidden text-[28px] cursor-pointer p-1 text-slate-700 hover:text-[#9D2BA8] transition">
            <HiOutlineMenu onClick={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Slide-out Drawer */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-[9998] transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl z-[9999] transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header or Profile Card */}
        {userData ? (
          <div className="px-6 py-6 bg-gradient-to-br from-[#4A154B] via-[#6B1F72] to-[#9D2BA8] text-white flex flex-col gap-3 relative overflow-hidden flex-shrink-0">
            {/* Background decorative glows */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
            <div className="absolute -left-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-md pointer-events-none"></div>

            <div className="flex justify-between items-start z-10">
              {/* Profile Image / Initials */}
              <div className="relative w-12 h-12 rounded-full border border-white/30 overflow-hidden bg-white/10 flex items-center justify-center">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt={userData.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold uppercase">
                    {(userData.name || "U")[0]}
                  </span>
                )}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition p-1 hover:bg-white/10 rounded-lg cursor-pointer"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            <div className="z-10 mt-1">
              <h4 className="font-bold text-sm leading-tight tracking-wide truncate">
                {userData.name || "Career Rocket User"}
              </h4>
              <p className="text-xs text-white/80 truncate mt-0.5">
                {userData.mail || "No email available"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-5 border-b border-slate-100 flex-shrink-0">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image src={logo} width={150} alt="logo" />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="text-2xl text-slate-500 hover:text-purple-600 transition p-1 cursor-pointer"
            >
              <HiX />
            </button>
          </div>
        )}

        {/* Drawer Body (Scrollable Menu list) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {menuItems.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;

            // Submenu mobile
            if (item.children) {
              const isOpen = submenuOpen === item.key;
              return (
                <div key={item.key} className="space-y-1">
                  <div
                    onClick={() =>
                      setSubmenuOpen(isOpen ? null : item.key)
                    }
                    className={`flex justify-between items-center px-4 py-3 rounded-xl transition duration-200 cursor-pointer ${active
                      ? "bg-[#9D2BA8]/10 text-[#9D2BA8] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#9D2BA8] font-medium"
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {Icon && <Icon className={`text-xl ${active ? "text-[#9D2BA8]" : "text-slate-500"}`} />}
                      <span>{item.label}</span>
                    </div>
                    <HiChevronDown className={`text-lg transition-transform duration-300 ${isOpen ? "rotate-180 text-[#9D2BA8]" : "text-slate-400"}`} />
                  </div>

                  {/* Submenu links */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0 pointer-events-none"}`}>
                    <div className="pl-12 pr-4 py-1 space-y-1">
                      {item.children.map((sub) => {
                        const subActive = pathname && (pathname === sub.href || pathname.startsWith(sub.href + "/"));
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className={`block py-2.5 px-3.5 rounded-lg text-sm transition duration-200 ${subActive
                              ? "text-[#9D2BA8] font-semibold bg-[#9D2BA8]/5"
                              : "text-slate-600 hover:text-[#9D2BA8] hover:bg-slate-50 font-medium"
                              }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            // Normal link
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition duration-200 ${active
                  ? "bg-[#9D2BA8]/10 text-[#9D2BA8] font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#9D2BA8] font-medium"
                  }`}
              >
                {Icon && <Icon className={`text-xl ${active ? "text-[#9D2BA8]" : "text-slate-500"}`} />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex-shrink-0">
          {userData ? (
            <button
              onClick={() => {
                setOpen(false);
                localStorage.clear();
                window.location.href = '/';
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition"
            >
              <HiLogout className="text-lg" />
              Logout
            </button>
          ) : (
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="btn-gradient w-full block text-center py-3 text-sm font-semibold rounded-full"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
