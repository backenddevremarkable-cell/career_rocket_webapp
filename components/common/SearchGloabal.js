"use client";

import { Button } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiX,
  FiTrendingUp,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";


import {
  truncateWords, ERROR_MSG
} from "@/utils";

import {
  globalSearch
} from "@/services/publicService";
import CustomImage from "./ImageMedia";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore";

export default function SearchGloabal({ isDashboard }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { setSearchCounselors, setSearchCareer, setSearchCourses } = useDataStore((state) => state);

  const popupRef = useRef(null);
  const inputRef = useRef(null);

  // Keyboard shortcut listener to focus search when '/' or 'Ctrl+K' / 'Cmd+K' is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }
      if (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Suggestions
  const suggestions = [
    "Amazon",
    "Amazon Careers",
    "Amazon Seller",
    "Amazon India",
    "Career Counselling",
    "Top Universities",
    "Software Engineering",
    "AI Courses",
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  // ESC Close + Body Scroll Lock
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // BODY SCROLL STOP
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);


  const searchData = async (e) => {
    try {
      if (!e?.trim()) {
        ERROR_MSG("Please search any keyword.");
        setData({});
        return;
      }

      setLoading(true);
      const res = await globalSearch({ search: e });
      console.log("Career Category Response:", res);

      setData(res.data || {});
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <div className={`w-full ${!isDashboard ? 'max-w-[760px]' : 'max-w-[860px]'} mx-auto relative`}>
        <div className={`search-wrapper ${!isDashboard ? "mt-10" : "search-wrapper-dashboard"} relative flex items-center`}>
          <div className="relative flex-1 flex items-center">
            <FiSearch className="absolute left-4 text-slate-400 text-lg pointer-events-none" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={`Search careers, universities, courses...`}
              className="search-input !pl-11 !pr-4"
            />
          </div>

          <div className="flex items-center gap-2 pr-1.5 flex-shrink-0">
            {/* Keyboard shortcut hint */}

            {search && ((data?.career) || (data?.counsellor) || (data?.course)) ? (
              <button
                onClick={() => { setData(null); setSearch("") }}
                className="h-9 w-9 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center transition flex-shrink-0"
              >
                <FiX className="text-lg text-gray-500" />
              </button>
            ) : null}

            <Button
              onClick={() => loading ? null : searchData(search)}
              type="button"
              className={`${loading ? "cursor-not-allowed opacity-50 bg-gray-300" : `cursor-pointer`} search-btn !my-1.5 !mr-1.5 !ml-0`}
            >
              <FiSearch className="sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        {(data?.career) || (data?.counsellor) || (data?.course) ?
          <div className="mt-2 absolute left-0 right-0 z-50 overflow-hidden max-w-2xl mx-auto rounded-[16px] border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] animate-fade">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Search Results
              </h3>

              <span className="text-xs font-medium text-slate-400">
                {((data?.career?.length || 0) +
                  (data?.counsellor?.length || 0) +
                  (data?.course?.length || 0))} Found
              </span>
            </div>

            <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-50">
              {data?.career?.length > 0 || data?.counsellor?.length > 0 || data?.course?.length > 0 ? (
                <>
                  {data?.career && data.career.map((item, index) => (
                    <Link
                      href="/career-library"
                      onClick={() => setSearchCareer(item)}
                      key={`career-${index}`}
                      className="group w-full flex items-center justify-between px-5 py-3 hover:bg-purple-50/40 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-[10px] bg-gradient-to-br from-[#F3E8FF] to-[#FAE8FF] flex items-center justify-center text-[#9D2BA8] border border-purple-100 flex-shrink-0 relative overflow-hidden">
                          <CustomImage className="rounded-[10px] object-cover custom-img mx-auto" alt={item?.name_en} img={item?.icon} />
                        </div>

                        <div>
                          <h2 className="text-[14px] font-bold text-slate-800 group-hover:text-[#9D2BA8] transition-colors">
                            {item?.name_en}
                          </h2>

                          <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">
                            {truncateWords(item?.description_en, 20)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-[#9D2BA8] border border-purple-100/50 uppercase tracking-wider">
                          Career
                        </span>
                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#9D2BA8] group-hover:text-white transition-all duration-300">
                          <FiArrowUpRight className="text-slate-400 text-base group-hover:text-white" />
                        </div>
                      </div>
                    </Link>
                  ))}

                  {data?.course && data.course.map((item, index) => (
                    <Link
                      href="/courses"
                      onClick={() => setSearchCourses(item)}
                      key={`course-${index}`}
                      className="group w-full flex items-center justify-between px-5 py-3 hover:bg-emerald-50/30 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-[10px] bg-gradient-to-br from-[#E6FBF0] to-[#F0FDF4] flex items-center justify-center text-emerald-700 border border-emerald-100 flex-shrink-0 relative overflow-hidden">
                          <CustomImage className="rounded-[10px] object-cover custom-img mx-auto" alt={item?.title} img={item?.thumbnailUrl} />
                        </div>

                        <div>
                          <h2 className="text-[14px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                            {item?.title}
                          </h2>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100/50 uppercase tracking-wider">
                          Course
                        </span>
                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                          <FiArrowUpRight className="text-slate-400 text-base group-hover:text-white" />
                        </div>
                      </div>
                    </Link>
                  ))}

                  {data?.counsellor && data.counsellor.map((item, index) => (
                    <Link
                      href="/counselors"
                      onClick={() => setSearchCounselors(item)}
                      key={`counsellor-${index}`}
                      className="group w-full flex items-center justify-between px-5 py-3 hover:bg-amber-50/30 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-[10px] bg-gradient-to-br from-[#FEF3C7] to-[#FFFBEB] flex items-center justify-center text-amber-700 border border-amber-100 flex-shrink-0 relative overflow-hidden">
                          <CustomImage className="rounded-[10px] object-cover custom-img mx-auto" alt={item?.name} img={item?.profilePic} />
                        </div>

                        <div>
                          <h2 className="text-[14px] font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                            {item?.name}
                          </h2>

                          <p className="text-[12px] text-slate-500 mt-0.5">
                            {item?.mobileNo}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100/50 uppercase tracking-wider">
                          Counselor
                        </span>
                        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                          <FiArrowUpRight className="text-slate-400 text-base group-hover:text-white" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="py-16 text-center">
                  <FiSearch className="mx-auto text-4xl text-slate-300 mb-3" />
                  <h3 className="text-sm font-bold text-slate-700">
                    No Results Found
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Try different keywords or filters
                  </p>
                </div>
              )}
            </div>
          </div> : null}
      </div>


      {/* POPUP */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] bg-white/80 backdrop-blur-2xl animate-fade">
          {/* Main Content */}
          <div
            ref={popupRef}
            className="relative z-10 flex flex-col items-center min-h-screen pt-[40px] px-5"
          >

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-6 right-6 h-12 w-12 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:scale-105 transition-all"
            >
              <FiX className="text-[24px] text-gray-700" />
            </button>

            <div className="w-full max-w-[920px]">

              {/* Heading */}
              <div className="text-center mb-6">
                <h1 className="text-[52px] font-bold bg-gradient-to-r color-primary bg-clip-text text-transparent">
                  Search
                </h1>

                <p className="text-gray-500 mt-1 mb-2 text-lg">
                  Discover careers, courses, counselor & more
                </p>
              </div>

              {/* Search Input */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full blur-xl opacity-20" />
                <div className="relative flex items-center h-[72px] px-7 pr-2 rounded-full border border-gray-200 bg-white shadow-[0_15px_60px_rgba(0,0,0,0.04)]">
                  <FiSearch className="text-gray-400 text-[28px]" />
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search anything..."
                    className="w-full px-5 bg-transparent outline-none text-[20px] font-medium text-gray-700 placeholder:text-gray-400"
                  />
                  <Button onClick={() => loading ? null : searchData(search)} type="button" className={`${loading ? "cursor-not-allowed opacity-50 bg-gray-300" : `cursor-pointer`}  h-12 search-btn`}>
                    <FiSearch className="mr-2" /> Search
                  </Button>

                  {/* {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="h-11 w-11 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                    >
                      <FiX className="text-[22px] text-gray-500" />
                    </button>
                  )} */}
                </div>
              </div>

              {/* Suggestions */}

              {(data?.career) || (data?.counsellor) || (data?.career) ?
                <div className="mt-2 overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">


                  <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase">
                      Popular Searches
                    </h3>

                    <span className="text-xs text-gray-400">
                      {((data?.career?.length || 0) +
                        (data?.counsellor?.length || 0) +
                        (data?.course?.length || 0))} Results
                    </span>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">

                    {data?.career?.length || data?.counsellor?.length || data?.career?.length > 0 ? (

                      <>

                        {data?.career.map((item, index) => (
                          <button
                            key={index}
                            className="group w-full flex items-center justify-between px-4 py-2 hover:bg-[#faf7ff] transition-all border-b border-gray-100 last:border-none"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-[8px] bg-gradient-to-br from-[#F3E8FF] to-[#FAE8FF] flex items-center justify-center text-[#9D2BA8] g-search">
                                <CustomImage className={`rounded-[8px] object-cover custom-img mx-auto`} alt={item?.name_en} img={item?.icon} />
                              </div>

                              <div className="text-left">
                                <h2 className="text-[15px] font-semibold text-gray-800">
                                  {item?.name_en}
                                </h2>

                                <p className="text-[12px] text-gray-500">
                                  {truncateWords(item?.description_en, 20)}
                                </p>
                              </div>
                            </div>

                            <div className="h-11 w-11 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#9D2BA8] transition-all">
                              <FiArrowUpRight className="text-gray-400 text-xl group-hover:text-white" />
                            </div>
                          </button>
                        ))}


                        {data?.course.map((item, index) => (
                          <button
                            key={index}
                            className="group w-full flex items-center justify-between px-4 py-2 hover:bg-[#faf7ff] transition-all border-b border-gray-100 last:border-none"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-[8px] bg-gradient-to-br from-[#F3E8FF] to-[#FAE8FF] flex items-center justify-center text-[#9D2BA8]  g-search">
                                <CustomImage className={`rounded-[8px] object-cover custom-img mx-auto`} alt={item?.title} img={item?.thumbnailUrl} />
                              </div>

                              <div className="text-left">
                                <h2 className="text-[15px] font-semibold text-gray-800">
                                  {item?.title}
                                </h2>
                                {/* <p className="text-[12px] text-gray-500">
                             { truncateWords(item?.description_en,20)}
                          </p> */}
                              </div>
                            </div>

                            <div className="h-11 w-11 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#9D2BA8] transition-all">
                              <FiArrowUpRight className="text-gray-400 text-xl group-hover:text-white" />
                            </div>
                          </button>
                        ))}


                        {data?.counsellor.map((item, index) => (
                          <button
                            key={index}
                            className="group w-full flex items-center justify-between px-4 py-2 hover:bg-[#faf7ff] transition-all border-b border-gray-100 last:border-none"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-[8px] bg-gradient-to-br from-[#F3E8FF] to-[#FAE8FF] flex items-center justify-center text-[#9D2BA8] g-search">
                                <CustomImage className={`rounded-[8px] object-cover custom-img mx-auto`} alt={item?.name} img={item?.profilePic} />
                              </div>

                              <div className="text-left">
                                <h2 className="text-[15px] font-semibold text-gray-800">
                                  {item?.name}
                                </h2>

                                <p className="text-[12px] text-gray-500">
                                  {item?.mobileNo}
                                </p>
                              </div>
                            </div>

                            <div className="h-11 w-11 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#9D2BA8] transition-all">
                              <FiArrowUpRight className="text-gray-400 text-xl group-hover:text-white" />
                            </div>
                          </button>
                        ))}

                      </>




                    ) :

                      <div className="py-20 text-center">
                        <FiSearch className="mx-auto text-5xl text-gray-300 mb-4" />

                        <h3 className="text-lg font-semibold text-gray-700">
                          No Results Found
                        </h3>

                        <p className="text-gray-400 mt-2">
                          Try different keywords
                        </p>
                      </div>

                    }
                  </div>
                </div> : null}

            </div>
          </div>
        </div>
      )}
    </>
  );
}