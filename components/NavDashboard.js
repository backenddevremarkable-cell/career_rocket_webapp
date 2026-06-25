"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Search,
  Menu,
  X,
  Rocket,
  FileText,
  GraduationCap,
  BookOpen,
  ClipboardList,
  User,
  Users, 
} from "lucide-react";
import logo from "../assets/images/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import useLogout from "@/hooks/useLogout";
import { useDataStore } from "@/store/useDataStore";

import {
  getProfile
} from "@/services/authService";
import { usePathname } from "next/navigation";

export default function NavDashboard({updateClass}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSearch, setisSearch] = useState(false);
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const { users } = useDataStore((state) => state);
  
   // ✅ check active
  const isActive = (href) => pathname.includes(href);

  // ✅ check parent active
  const isParentActive = (children) => {
    //  const isActivePage = ["psychometric-test", "sra"].some(path =>
    //         window.location.href.includes(path)
    //       )
    return children?.some((child) => pathname.includes(child.href));
  };

  
   useEffect(() => {
       setUserData(users)
   }, [users]);
   

  useEffect(() => {
      setisSearch(
        ["psychometric-test", "sra"].some(path =>
            window.location.href.includes(path)
          )
      );
  }, []);


  const menuItems = [
      {
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        label: "Research",
        key: "research",
        children: [
          { label: "Career Library", href: "/career-library" },
        ],
      },
      {
        label: "Self Assessment",
        key: "assessment",
        children: [
          { label: "Ideal Career Test", href: "/ideal-career-test" },
          { label: "Personality Test", href: "/personality-test" },
        ],
      },
      {
        label: "Student",
        key: "student",
        children: [
          { label: "My Profile", href: "/profile" },
          { label: "My Tests", href: "/my-test" },
          { label: "My Course", href: "/my-course" },
          { href: "/logout", label: "Logout" },
          ],
      },
    ]

 
  return (
    <header className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm ${updateClass === 'sticky' ? 'nav-border' : null}`}>
      {/* Top Header */}

   
     { !isSearch ? 
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
         <Image src={logo}/>
        </Link>

        {/* Search Bar Desktop */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Type and Search university"
              className="h-12 w-full rounded-full border-2 border-fuchsia-400 bg-white pl-5 pr-32 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-fuchsia-600 focus:ring-4 focus:ring-fuchsia-100"
            />
            <button className="absolute right-1.5 top-1/2 flex h-9 -translate-y-1/2 items-center gap-2 rounded-full bg-orange-400 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-orange-500">
              <Search size={16} />
              Search
            </button>
          </div>
        </div>

         {/* Right Welcome */}
        <div className="hidden shrink-0 text-right md:block">
          <p className="text-sm text-gray-400">Welcome Back</p>
          <h3 className="text-lg font-semibold text-fuchsia-700">
            { userData?.name || userData?.mobileNo }</h3>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div> : null }

      {/* Desktop Navigation */}
       
      <nav className="hidden border-t bg-white md:block nav-border">
      <div className="mx-auto flex max-w-7xl justify-center">
        <ul className="flex items-center">

          {menuItems.map((item, index) => {
            // simple link (Dashboard)
            if (!item.children) {
              return (
                <li  className="min-w-[180px]" key={index}>
                  <Link
                    style={{ width : '100%', display : 'block', textAlign : 'center' }}
                    href={item.href}
                    className={`px-6 py-4 font-medium transition
                    ${
                      isActive(item.href)
                        ? "bg-fuchsia-700 text-white"
                        : "text-gray-900 hover:text-fuchsia-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            // 🔥 dropdown menu
            const parentActive = isParentActive(item.children);
            

            return (
              <li key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(item.key)}
                  className={`inline-flex min-w-[240px] items-center justify-center gap-2 from-fuchsia-700  px-6 py-4 text-[17px] font-medium
                  ${
                    parentActive
                      ? "text-white inner-nav-selected"
                      : null
                  }`}
                >
                  {item.label} <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {openDropdown === item.key && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl p-2">
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        href={child.href}
                        className={`block px-4 py-2 rounded-lg transition
                        ${
                          isActive(child.href)
                            ? "bg-fuchsia-50 text-fuchsia-700"
                            : "text-gray-700 hover:bg-fuchsia-50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}

        </ul>
      </div>
    </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-md md:hidden">
          {/* Mobile Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Type and Search university"
              className="h-11 w-full rounded-full border-2 border-fuchsia-400 bg-white pl-4 pr-28 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-fuchsia-600"
            />
            <button className="absolute right-1.5 top-1/2 flex h-8 -translate-y-1/2 items-center gap-2 rounded-full bg-orange-400 px-4 text-sm font-semibold text-white">
              <Search size={15} />
              Search
            </button>
          </div>

          {/* Mobile Welcome */}
          <div className="mb-4 rounded-2xl bg-fuchsia-50 p-4">
            <p className="text-sm text-gray-500">Welcome Back</p>
            <h3 className="text-lg font-semibold text-fuchsia-700">Hello { userData?.name || userData?.mobileNo } </h3>
          </div>

          <div className="space-y-2">
            <MobileNavLink href="/" label="Home" />

            <MobileDropdown
              title="Research"
              isOpen={openDropdown === "research"}
              onClick={() => toggleDropdown("research")}
              items={[
                { href: "/career-library", label: "Career Library" },
              ]}
            />

            <MobileDropdown
              title="Self Assessment"
              isOpen={openDropdown === "assessment"}
              onClick={() => toggleDropdown("assessment")}
              highlight={true}
              items={[
                {
                  href: "/ideal-career-test",
                  label: "Ideal Career Test",
                },
                {
                  href: "/personality-test",
                  label: "Personality Test",
                }
              ]}
            />

            <MobileDropdown
              title="Student"
              isOpen={openDropdown === "student"}
              onClick={() => toggleDropdown("student")}
              items={[
                { href: "/profile", label: "My Profile" },
                { href: "/my-test", label: "My Tests" },
                { href: "/my-course", label: "My Course" },
                { href: "/logout", label: "Logout" },
              ]}
            />
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Reusable Components ---------- */

function DropdownItem({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-fuchsia-50 hover:text-fuchsia-700"
    >
      <span className="text-fuchsia-600">{icon}</span>
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-100 px-4 py-3 text-base font-medium text-gray-800 transition hover:bg-fuchsia-50 hover:text-fuchsia-700"
    >
      {label}
    </Link>
  );
}

function MobileDropdown({
  title,
  isOpen,
  onClick,
  items,
  highlight = false,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <button
        onClick={onClick}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium transition ${
          highlight
            ? "bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white"
            : "bg-white text-gray-800 hover:bg-fuchsia-50 hover:text-fuchsia-700"
        }`}
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="space-y-1 bg-white p-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-fuchsia-50 hover:text-fuchsia-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}