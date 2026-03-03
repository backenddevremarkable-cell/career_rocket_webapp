"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../assets/images/logo.svg";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 1200);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <nav
     className={`${scrolled ? 'fixed' : 'absolute' } w-full top-0 left-0 z-50 transition-all duration-300 
       ${scrolled ? "bg-white shadow-md" : ""}`}
>
      <div className={`max-w-7xl mx-auto px-6 ${!scrolled ? 'py-6' : '' } flex justify-between items-center`}>

        {/* Logo */}
        <div className="text-2xl font-bold">
          <Image src={logo} width={scrolled ? 150 : null} className={scrolled ? `py-2` : null}/>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          {/* <Link href="/" className="text-purple-600 text-primary font-semibold">Home</Link> */}
          <Link href="#">Career Library</Link>
          <Link href="#">Our Services</Link>
          <Link href="#">Tests</Link>
          <Link href="#">Experts</Link>
          <Link href="#">Courses</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Contact us</Link>
        </div>

        {/* Sign Up */}
        <div className="hidden md:block">
          <Link href={'signup'} className="btn-gradient">Sign Up</Link>
        </div>

        {/* Mobile Icon */}
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
          {/* <Link href="/">Home</Link> */}
          <Link href="#">Career Library</Link>
          <Link href="#">Our Services</Link>
          <Link href="#">Tests</Link>
          <Link href="#">Experts</Link>
          <Link href="#">Courses</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Contact us</Link>
          <button className="btn-gradient w-full mt-4">Sign Up</button>
        </div>
      )}
    </nav>
  );
}