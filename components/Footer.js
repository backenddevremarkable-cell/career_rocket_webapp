"use client";

import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import logo from "../assets/images/logo.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#250022] text-gray-300 pt-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-white/10">

          {/* LEFT */}
          <div>
            <div className="text-xl font-bold text-white">
                <Image src={logo}/>
            </div>

            <p className="mt-5 text-sm leading-relaxed">
              Empowering students and professionals to find their true calling
              through science, data, and expert mentorship.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-5 mt-6 text-lg">
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaLinkedinIn className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
              <FaFacebookF className="hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-white font-semibold mb-5">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Psychometric Test</li>
              <li className="hover:text-white cursor-pointer">Career Library</li>
              <li className="hover:text-white cursor-pointer">Expert Mentors</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-semibold mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* APP DOWNLOAD */}
          <div>
            <h4 className="text-white font-semibold mb-5">Get the App</h4>

            {/* APP STORE */}
            <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 mb-4 hover:bg-white/20 transition cursor-pointer">
              <FaApple size={24} />
              <div>
                <p className="text-xs">Download on the</p>
                <p className="text-white font-semibold">App Store</p>
              </div>
            </div>

            {/* PLAY STORE */}
            <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition cursor-pointer">
              <FaGooglePlay size={22} />
              <div>
                <p className="text-xs">Get it on</p>
                <p className="text-white font-semibold">Google Play</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm py-6 gap-4">
          <p>© 2026 Careerrocket. All rights reserved.</p>

          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}