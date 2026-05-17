import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug } from "@/utils/index";
import {
  careerById
} from "@/services/authService";
import Link from "next/link";

const Career = () => {

    const [data, setdata] = useState(null);
    const [loading,setLoading] = useState(true);
    const careerId = useDataStore((state) => state?.careerDetail);

    const fetchData = async () => {
        try {
          const res = await careerById({ id : careerId || getFromStorage('cdid')})
          console.log("Career Category Response:", res);
          setdata(res?.data || {});
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }  
  
       useEffect(() => {
           fetchData ();
        }, []);

  return (<>
    { loading ?    
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg font-medium">
            Loading...
          </p>
        </div>
      :
     (<>    
     
       
 <section className="relative bg-[#faf7ff] overflow-hidden">
 
  {/* HERO SECTION */}
  <div className="relative w-full
        h-[180px]
        sm:h-[220px]
        md:h-[280px]
        lg:h-[350px]
        xl:h-[260px] overflow-hidden">
          
      <Image
        src={data?.bannerImage}
        alt={data?.name_en}
        fill
        priority
        className="object-cover scale-105"
      />

    {/* PREMIUM OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

    {/* HERO CONTENT */}
    <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-center">

      <div className="max-w-3xl">

        {/* BADGES */}
        <div className="flex flex-wrap items-center gap-3 mb-6">

          <span
            className="
            px-5 py-2 rounded-full
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            text-white text-sm font-medium
          "
          >
            {data?.carCatName_en}
          </span>

          <span
            className="
            px-5 py-2 rounded-full
            bg-[#F6AB18]/20
            border border-[#F6AB18]/30
            text-[#ffd67f]
            text-sm font-semibold
            backdrop-blur-xl
          "
          >
            {data?.demand === 2
              ? "High Demand"
              : data?.demand === 1
              ? "Medium Demand"
              : "Low Demand"}
          </span>
        </div>

        {/* TITLE */}
        <h1
          className="
          text-4xl md:text-6xl
          font-black
          text-white
          leading-tight
          tracking-tight
        "
        >
          {data?.name_en}
        </h1>
      </div>
    </div>
  </div>

  {/* MAIN CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 py-14">

    <div className="grid lg:grid-cols-[1fr_360px] gap-8">

      {/* LEFT CONTENT */}
      <div className="space-y-8">

        {/* OVERVIEW */}
        <div
          className="
          rounded-[12px]
          bg-white/80
          backdrop-blur-xl
          p-8
        "
        >
          <div className="flex items-center gap-4 mb-7">

            <div
              className="
              w-14 h-14 rounded-[10px]
              bg-gradient-to-br bg-[#F9F5FE]
              flex items-center justify-center
              text-white text-2xl
              shadow-sm
            "
            >
              📘
            </div>

            <div>
              <p className="text-[12px] text-gray-500 uppercase tracking-widest">
                Career Overview
              </p>

              <h2 className="text-2xl font-black uppercase text-gray-900">
                Overview
              </h2>
            </div>
          </div>

          <p className="text-gray-600 leading-7 text-[16px]">
            {data?.description_en}
          </p>
        </div>

        {/* RESPONSIBILITIES */}
        <div
          className="
          rounded-[12px]
          bg-white/80
          backdrop-blur-xl
           p-8
        "
        >

          <div className="flex items-center gap-4 mb-10">

            <div
              className="
              w-14 h-14 rounded-[10px]
              bg-gradient-to-br bg-[#F9F5FE]
              flex items-center justify-center
              text-white text-2xl
              shadow-sm
            "
            >
              💼
            </div>

            <h2 className="text-2xl uppercase font-black text-gray-900">
              Roles & Responsibilities
            </h2>
          </div>

          <div className="space-y-8">

            {data?.rolesAndResponsibilities_en
              ?.split("\n")
              ?.map((item, i) => (

                <div key={i} className="flex gap-5 group">

                  {/* TIMELINE */}
                  <div className="flex flex-col items-center">

                    <div
                      className="
                      w-2 h-2 rounded-full
                      bg-gradient-to-r bg-[#AF26B9]
                      shadow-lg"></div>

                      <div
                        className="
                        w-[2px] h-full
                        bg-[#AF26B9]"
                      ></div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                    pb-8
                    group-hover:translate-x-1
                    transition duration-300"
                  >

                    <h3 className="text-xl font-bold text-gray-900">
                      {item}
                    </h3>

                    <p className="mt-2 text-gray-500 leading-4">
                      Key professional responsibility within the industry.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ADVANTAGES / DISADVANTAGES */}
        <div className="grid md:grid-cols-2 gap-7">

          {/* ADVANTAGES */}
          <div
            className="
            rounded-[12px]
            bg-white/80
            backdrop-blur-xl
            uppercase
            border border-[#F6AB18]/20
            p-8
            shadow-[0_10px_40px_rgba(246,171,24,0.10)]
          "
          >

            <h2 className="text-2xl font-black text-[#F6AB18] mb-8">
              Advantages
            </h2>

            <div className="space-y-5">

              {data?.advantage_en
                ?.split("\n")
                ?.map((item, i) => (

                  <div
                    key={i}
                    className="
                    flex items-start gap-4
                    rounded-2xl
                    bg-[#F6AB18]/5
                    border border-[#F6AB18]/10
                    p-4
                  "
                  >

                    <div
                      className="
                      w-7 h-7 rounded-full
                      bg-[#F6AB18]
                      flex items-center justify-center
                      text-white font-bold
                    "
                    >
                      ✓
                    </div>

                    <p className="text-gray-700 text-[12px] leading-7">
                      {item}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* DISADVANTAGES */}
          <div
            className="
            rounded-[12px]
            bg-white/80
            backdrop-blur-xl
            border border-[#9F23A8]/20
            p-8
          "
          >

            <h2 className="text-2xl uppercase font-black text-[#9F23A8] mb-8">
              Challenges
            </h2>

            <div className="space-y-5">

              {data?.disadvantage_en
                ?.split("\n")
                ?.map((item, i) => (

                  <div
                    key={i}
                    className="
                    flex items-start gap-4
                    rounded-2xl
                    bg-[#9F23A8]/5
                    border border-[#9F23A8]/10
                    p-4
                  "
                  >

                    <div
                      className="
                      w-7 h-7 rounded-full
                      bg-[#9F23A8]
                      flex items-center justify-center
                      text-white font-bold
                    "
                    >
                      ✕
                    </div>

                    <p className="text-gray-700 uppercase text-[12px] leading-7">
                      {item}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="lg:sticky top-24 h-fit space-y-6">

        {/* INSIGHTS CARD */}
        <div
          className="
          rounded-[12px]
          bg-gradient-to-br from-[#9F23A8] to-[#fcd3ff]
          p-8
          text-white
        "
        >

          <h2 className="text-2xl uppercase font-black mb-8">
            Career Insights
          </h2>

          <div className="space-y-7">

            <div>
              <p className="text-white/70 text-sm">
                Average Salary
              </p>

              <h3 className="text-4xl font-black mt-2">
                {data?.avgSalary || "N/A"}
              </h3>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-white/70 text-sm">
                Eligibility
              </p>

              <h3 className="text-lg font-semibold mt-2 leading-7">
                {data?.eligibility_en}
              </h3>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-white/70 text-sm">
                Category
              </p>

              <h3 className="text-xl font-bold mt-2">
                {data?.carCatName_en}
              </h3>
            </div>
          </div>
        </div>

        {/* STREAMS */}
        <div
          className="
          rounded-[12px]
          bg-white/80
          backdrop-blur-xl
          border border-white/50
          p-7
        "
        >

          <h2 className="text-2xl uppercase font-black text-gray-900 mb-6">
            Streams
          </h2>

          <div className="flex flex-wrap gap-3">

            {data?.streams?.map((stream, i) => (
              <div
                key={i}
                className="
                px-5 py-3 rounded-[12px]
                bg-gradient-to-r from-[#F6AB18]/10 to-[#9F23A8]/10
                border border-[#9F23A8]/10
                text-gray-700 font-semibold
              "
              >
                {stream.name_en}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
            
    </>)
   }
  </>)
}

export default Career;