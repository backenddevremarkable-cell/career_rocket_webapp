"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { label: "Services", href: "/" },
  { label: "Transaction", href: "/transactions" },
  { label: "Support", href: "#support" },
  { label: "Terms & Conditions", href: "#terms" },
  // { label: "Return to E-Mitra", href: "#emitra" },
  { label: "Return to E-Mitra", href: "/emitra" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-[#F0F0F0] bg-white/80 px-6 py-4 backdrop-blur-sm lg:px-12">
      <Logo />
      <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href) && link.href !== "#";

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[13px] font-medium transition-colors ${
                isActive
                  ? "relative text-career-purple after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-career-gold after:content-['']"
                  : "text-[#616161] hover:text-career-purple"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        className="rounded-full bg-career-purple px-6 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-career-purple-dark"
      >
        Sign Up
      </button>
    </header>
  );
}
