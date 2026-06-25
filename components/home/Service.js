import { ImUserTie } from "react-icons/im";
import { getServices } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState,useEffect } from "react";
import { BASE_URL } from "@/config";
import SkeletonService from "./skeleton/SkeletonService";
import CustomImage from "../common/ImageMedia";

export default function Services() {
  const { setService, service } = useDataStore((state) => state);
  const [data, setData] = useState(service);
  const [loading, setLoading] = useState(false);

     const fetchData = async () => {
      try {
        setLoading(true);
        const payload = {
          page: 1,
          limit: 10,
          search: "",
        };

        const res = await getServices(payload);
        const responseData = res?.data || [];
        setData(responseData);
        setService(responseData);

      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      if(!data) fetchData()
    }, [])
    
  
  return ( data && data?.length || loading ?
    <section id="our-service" className="py-10 bg-[#f6f4f8] px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Our <span className="text-purple-600">Services</span>
          </h2>
          <p className="text-gray-500 mt-3">
            Comprehensive support for every stage of your career journey,
            from discovery to placement.
          </p>
        </div>

    { loading ? 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">
        {[...Array(8)].map((_, i) => (
          <SkeletonService key={i} />
        ))}
      </div> : <>
          
          <div className="relative mt-20">

  {/* BACKGROUND GLOW */}
  <div className="absolute -top-20 left-0 w-72 h-72 bg-[#F6AB18]/10 blur-3xl rounded-full"></div>
  <div className="absolute -bottom-20 right-0 w-72 h-72 bg-[#9F23A8]/10 blur-3xl rounded-full"></div>

  <div className="relative z-10 grid xl:grid-cols-4 md:grid-cols-2 gap-7">

    {data &&
      data.map((item, i) => (

        <div
          key={i}
          className="
          group relative overflow-hidden
          rounded-[12px]
          bg-white/80
          backdrop-blur-xl
          border border-white/40
          shadow-[0_10px_40px_rgba(0,0,0,0.02)]
          transition-all duration-500
          hover:-translate-y-3
        "
        >

          {/* HOVER GLOW */}
          <div
            className="
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition duration-500
            bg-gradient-to-br
            from-[#F6AB18]/5
            via-transparent
            to-[#9F23A8]/5
          "
          ></div>

          <div className="relative z-10 p-7">

            {/* ICON */}
            <div
              className="
              relative mx-auto
              w-24 h-24
              rounded-[28px]
              bg-gradient-to-br
              from-[#F6AB18]/10
              to-[#9F23A8]/10
              border border-white/60
              flex items-center justify-center
              shadow-inner
              group-hover:scale-110
              group-hover:rotate-3
              transition-all duration-500
            "
            >

              {/* INNER GLOW */}
              <div
                className="
                absolute inset-2
                rounded-[22px]
                bg-white/60
                backdrop-blur-xl
              "
              ></div>

            <div className="w-12 h-12">
              <CustomImage img={item.icon} className={`relative z-10
                  object-contain
                  drop-shadow-md`} alt={item.serviceName} />
            </div>
         </div>

            {/* CONTENT */}
            <div className="text-center mt-7">

              <h3
                className="
                text-[16px]
                font-black
                font-semibold
                uppercase
                text-gray-900
                leading-tight
                group-hover:text-[#9F23A8]
                transition duration-300
              "
              >
                {item.serviceName}
              </h3>

              <p
                className="
                mt-5
                text-[15px]
                leading-8
                text-gray-500
              "
              >
                {item.description}
              </p>
            </div>

          </div>

          {/* BOTTOM ANIMATED LINE */}
          <div
            className="
            absolute bottom-0 left-0
            h-[3px] w-0
            bg-gradient-to-r
            from-[#9F23A8]
            to-[#9F23A8]
            group-hover:w-full
            transition-all duration-700
          "
          ></div>
        </div>
      ))}
  </div>
</div>
           </> }
      </div>
    </section> : null
  );
}