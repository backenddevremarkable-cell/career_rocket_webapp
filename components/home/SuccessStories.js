"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import user from "../../assets/images/success-stories.svg";
import Image from "next/image";
import { storiesSuccess } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState, useEffect } from "react";
import SkeletonStories from "./skeleton/SkeletonStories";
import { BASE_URL } from "@/config";
import CustomImage from "../common/ImageMedia";
import { FaPlay, FaTimes } from "react-icons/fa";

export default function SuccessStories() {

  const { setStories, stories } = useDataStore((state) => state);
  const [data, setData] = useState(stories);
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null); // { url, name }

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = {
        page: 1,
        limit: 10,
        search: "",
      };

      const res = await storiesSuccess(payload);
      const responseData = res?.data || [];
      setData(responseData);
      setStories(responseData);

    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!data) fetchData()
  }, [])

  return (data?.records && data?.records.length || loading ?
    <section className="py-10 md:py-10 bg-[#f6f4f8] w-full">
      <div className="max-w-6xl mx-auto relative px-4 md:px-0">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          Stories of <span className="text-purple-600">Success</span>
        </h2>
        <p className="text-gray-500 mt-2 mb-10">
          Connect with mentors who are already succeeding in your dream career.
        </p>
        {loading ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonStories key={i} />
            ))}
          </div> : <>
            {/* arrows */}
            <button className="prevBtn absolute left-0 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
              <HiChevronLeft size={24} />
            </button>
            <button className="nextBtn absolute right-0 top-[55%] z-10 bg-white shadow-md rounded-full p-2">
              <HiChevronRight size={24} />
            </button>

            {/* Slider FULL WIDTH */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".nextBtn",
                prevEl: ".prevBtn",
              }}
              spaceBetween={25}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 1.1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {data && data?.records.map((item, i) => (
                <SwiperSlide key={i}>

                  {/* CARD */}
                  <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gradient-to-b hover:from-purple-900  bg-success">

                    {/* TEXT */}
                    <div title={item?.story} className="p-6 min-h-[255px]">
                      <p className="text-gray-700 text-sm leading-relaxed group-hover:text-white line-clamp-9">
                        {item?.story}
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between p-5 border-t border-purple-200 bg-white/60 group-hover:bg-transparent">
                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 ">
                          <CustomImage alt={item?.name} errorMedia={`${BASE_URL}website/img/blog-details-author.png`} className="rounded-full object-cover border border-purple-200 p-2" img={item.profile} />
                        </div>


                        <div>
                          <h4 className="text-sm font-semibold text-purple-700 group-hover:text-white">
                            {item?.name}
                          </h4>
                          <p className="text-xs text-gray-500 group-hover:text-gray-200">
                            {item?.position}
                          </p>
                        </div>
                      </div>

                      {/* play button or quote icon */}
                      {item?.videoUrl ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo({ url: item.videoUrl, name: item.name });
                          }}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer transition-all duration-300 shadow-md group-hover:bg-white group-hover:text-purple-900 shrink-0"
                          title="Watch Success Story Video"
                        >
                          <FaPlay className="text-sm ml-0.5" />
                        </button>
                      ) : (
                        <span className="text-5xl font-bold text-purple-200 group-hover:text-white/20">
                          ”
                        </span>
                      )}
                    </div>

                  </div>

                </SwiperSlide>
              ))}
            </Swiper>
          </>}
      </div>

      {/* PROFESSIONAL VIDEO POPUP MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-[#131224] rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl transition-all duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-white tracking-wide">
                Success Story: <span className="text-purple-400">{activeVideo.name}</span>
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-red-600/80 text-white cursor-pointer transition-all duration-300 hover:rotate-90"
              >
                <FaTimes />
              </button>
            </div>
            {/* Modal Body */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(activeVideo.url)}
                title={`${activeVideo.name}'s Success Story`}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section> : null
  );
}