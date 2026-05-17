"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import pic from "../../assets/images/counselors.svg";
import CounselorCard from "../../pages/career-counselors/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCounselor } from "@/services/authService";
import { useDataStore } from "@/store/useDataStore";
import "swiper/css";
import "swiper/css/navigation";

export default function Counselors() {

  const { setcounselorHome, counselorHome, searchCounselors, setSearchCounselors } = useDataStore((state) => state);
  const [counselors, setCounselors] = useState(counselorHome);

  const fetchCounselors = async ()=>{

      const payload = {
          "serviceId":0,
          "page":1,
          "limit":50,
          "search":""
       }

      const res = await getCounselor(payload);
      setCounselors(res?.data || [])
      setcounselorHome(res?.data || [])
  }
  
  useEffect(() => {
    if(!counselorHome) fetchCounselors()
      return () => {
       // setSearchCounselors(null)
      }
  }, [])


  return (<>
    <section className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      

      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-3">Career Counselors</h1>
        <p class="text-gray-500">  Connect with experienced career counselors to get expert guidance, personalized career advice, and support</p></div>
 
          {
             searchCounselors ?
              <div className="max-w-6xl mx-auto mb-10 pb-10  border-b border-[#eaeaea]">
                <h1 className="text-[20px] font-semibold text-gray-800 mb-6">Showing Search Result </h1>
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                   <CounselorCard item={{ ...searchCounselors, experience: "5", avgRating: 4.5 }} />
                </div>
             </div>  
             :
             null
          }

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Heading */}
          {counselors && counselors.map((item, i) => (
             <CounselorCard item={item} />
          ))}
      </div>
    </section>
  </>);
}