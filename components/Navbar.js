"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../assets/images/logo.svg";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDataStore } from "@/store/useDataStore";
import useScrollSpy from "@/hooks/observerSection";
import { HiChevronDown } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const { users } = useDataStore((state) => state);

  // user data sync
  useEffect(() => {
    setUserData(users);
  }, [users]);

  // scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;//lastScrollY
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

const menuItems = [
  { label: "Home", href: "/", key: "" },

  {
    label: "Career Library",
    key: "career",
    children: [
      { label: "Career", href: "/career-library" },
      { label: "Gen Z Career", href: "/career-library-gen-z" },
    ],
  },

  { label: "Our Services", href: "/#our-service", key: "our-service" },
  { label: "Tests", href: "/#test", key: "test" },
  { label: "Experts", href: "/#experts", key: "experts" },
  { label: "Courses", href: "/#courses", key: "courses" },
  { label: "Contact us", href: "/contact-us", key: "contact-us" },
];

  const activeSection = useScrollSpy(menuItems.map((i) => i.key));

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
         
         <div className="hidden md:flex gap-8 font-medium text-gray-700">
  {menuItems.map((item) => {
    if (item.children) {
      return (
        <div key={item.key} className="relative group">
          
          {/* 🔽 Label + Icon */}
          <span className="flex items-center gap-1 cursor-pointer">
            {item.label}
            <HiChevronDown className="text-sm transition-transform duration-300 group-hover:rotate-180" />
          </span>

          {/* Dropdown */}
          <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-50">
            {item.children.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link key={item.key} href={item.href}>
        {item.label}
      </Link>
    );
  })}
</div>

        {/* Right Button */}
        <div className="hidden md:block">
          <Link
            href={userData ? "/dashboard" : "/sign-up"}
            className="btn-gradient"
          >
            {userData ? "Dashboard" : "Sign Up"}
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-3xl cursor-pointer">
          {open ? (
            <HiX onClick={() => setOpen(false)} />
          ) : (
            <HiOutlineMenu onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
       
       {open && (
  <div className="md:hidden bg-white shadow-xl py-6 px-6 space-y-4 mobile-menu">
    {menuItems.map((item) => {
      // 🔽 Submenu mobile
      if (item.children) {
        return (
          <div key={item.key}>
            <div
              onClick={() =>
                setSubmenuOpen(
                  submenuOpen === item.key ? null : item.key
                )
              }
              className="flex justify-between items-center cursor-pointer"
            >
              <span>{item.label}</span>
              <span>{submenuOpen === item.key ? "-" : "+"}</span>
            </div>

            {/* Submenu */}
            {submenuOpen === item.key && (
              <div className="ml-4 mt-2 space-y-2">
                {item.children.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className="block text-gray-600"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }

      // 🔽 Normal menu
      return (
        <Link
          key={item.key}
          href={item.href}
          onClick={() => setOpen(false)}
          className="block"
        >
          {item.label}
        </Link>
      );
    })}

    <Link
      href={userData ? "/dashboard" : "/sign-up"}
      className="btn-gradient w-full mt-4 block text-center"
    >
      {userData ? "Dashboard" : "Sign Up"}
    </Link>
  </div>
)}
    </nav>
  );
}