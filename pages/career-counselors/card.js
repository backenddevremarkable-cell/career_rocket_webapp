import Link from "next/link";
import {  FaStar } from "react-icons/fa";
import Image from "next/image";
import { BASE_URL } from "@/config";
import CustomImage from "../../components/common/ImageMedia";
// components/CourseCard.jsx
export default function CounselorCard({ item }) {

    const totalYears = item ? item.experience.match(/\d+/)?.[0] : "10"
    const label =  item ? item.experience.match(/[a-zA-Z]+/)?.[0] : "yrs"

  return (
      item ?
      <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
        {/* avatar */}
        <div className="relative w-fit mx-auto">
           <div className="w-20 h-20 "> 
            <CustomImage img={item.profilePic} className={`rounded-full object-cover custom-img mx-auto`} alt={item.name} />
          </div>
      
           { item.avgRating ? 
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 counselor-rating">
            <FaStar size={10} /> {item.avgRating}
            </span> : null }
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
            {item.name}
            { item.isVerified ? <span></span> : null }
        </h3>
        <p className="text-sm text-gray-500">{item.role}</p>

        <p className="text-xs text-gray-400 mt-2">
            • {`${totalYears} ${totalYears>1 ? '+ Yrs' : 'Year'}`}  Experience
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-2 justify-center mt-3">
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
            Career Planning
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
            Career Transitions
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
            Higher Studies Guidance
            </span>
        </div>

        {/* buttons */}
        {/* <div className="flex gap-3 mt-5">
            <a
            href={`tel:${item.phone}`}
            className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 text-gray-700 hover:bg-gray-100 transition"
            >
            <FaPhoneAlt size={14} />
            Call
            </a>

            <a
            href={`https://wa.me/${item.whatsapp}`}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
            >
            <BsChatDotsFill size={16} />
            Chat
            </a>
        </div> */}
        </div> : null
  );
}