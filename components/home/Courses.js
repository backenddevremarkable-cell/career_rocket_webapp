"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import CourseCard from "../../pages/course/elements/card";

import { useEffect, useState } from "react";
import { getCourses } from "@/services/authService";
import { useDataStore } from "@/store/useDataStore";

import SkeletonCourses from "./skeleton/SkeletonCourses";
import LightButton from "../common/button/Light";

export default function Courses() {

  const { setCourses, courses } = useDataStore((state) => state);

  const [data, setData] = useState(courses);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {

      setLoading(true);

      const payload = {
        maincatId: 2,
        subCatId: 2,
        isPaid: 2,
        page: 1,
        limit: 10,
        search: "",
      };

      const res = await getCourses(payload);

      const responseData = res?.data || [];

      setData(responseData);

      setCourses(responseData);

    } catch (error) {

      console.error("Error fetching courses:", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (!courses) fetchData();

  }, []);

  return (
    (data?.records && data?.records.length) || loading ? (

      <section
        id="courses"
        className="py-10 md:py-10 bg-[#fff] px-4"
        style={{ paddingBottom: "70px" }}
      >

        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="flex justify-between items-center flex-wrap gap-4 mb-10">

            <div>

              <h2 className="text-4xl font-bold text-gray-900">
                Industry-Ready{" "}
                <span className="text-purple-600">Courses</span>
              </h2>

              <p className="text-gray-500 mt-2">
                Connect with mentors who are already succeeding
                in your dream career.
              </p>

            </div>

            <LightButton
              text={"View All Course"}
              link={"courses"}
            />

          </div>

          {
            loading ?

              <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                  {[...Array(4)].map((_, i) => (
                    <SkeletonCourses key={i} />
                  ))}

                </div>

              </div>

              :

              <div className="relative">

                {/* Left Arrow */}
                <button className="coursePrev absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300">

                  <HiChevronLeft size={24} />

                </button>

                {/* Right Arrow */}
                <button className="courseNext absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300">

                  <HiChevronRight size={24} />

                </button>

                {/* Swiper */}
                <Swiper

                  modules={[Navigation, Autoplay]}

                  navigation={{
                    nextEl: ".courseNext",
                    prevEl: ".coursePrev",
                  }}

                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}

                  loop={true}

                  speed={1000}

                  allowTouchMove={true}

                  grabCursor={true}

                  spaceBetween={20}

                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },

                    640: {
                      slidesPerView: 2,
                    },

                    1024: {
                      slidesPerView: 3,
                    },

                    1280: {
                      slidesPerView: 4,
                    },
                  }}

                  onTouchStart={(swiper) => {
                    swiper.autoplay.stop();
                  }}

                  onTouchEnd={(swiper) => {
                    swiper.autoplay.start();
                  }}

                >

                  {data?.records?.map((item, i) => (

                    <SwiperSlide key={i}>

                      <CourseCard
                        key={item.id}
                        data={item}
                        view={true}
                      />
                      

                    </SwiperSlide>

                  ))}

                </Swiper>

              </div>
          }

        </div>

      </section>

    ) : null
  );
}