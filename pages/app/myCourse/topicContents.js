import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import NoRecordFound from "../../../components/common/NoRecordFound";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";

import { contentByTopicId } from "@/services/authService";
import { getFromStorage } from "@/utils/index";
import { PlayCircle, Link as LinkIcon, Download, Bookmark, BookmarkCheck, FileVideo, Play, X, Layers, Filter } from "lucide-react";

const TopicContents = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");

  /* VIDEO MODAL */
  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  /* FETCH DATA */
  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = {
        topicId: getFromStorage("topicId"),
      };
      const res = await contentByTopicId(payload);
      setData(res?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* FILTER DATA */
  const filteredData = useMemo(() => {
    if (activeTab === "all") return data;
    return data?.filter((item) => item?.contentType === activeTab);
  }, [activeTab, data]);

  return (
    <main className="min-h-screen bg-[#F6F4F8]">
      <section className="px-4 pb-12 pt-[80px] lg:ml-[255px] lg:px-8">
        {!loading ? (
          <>
            {data?.length > 0 ? (
              <div className="mx-auto max-w-[1150px]">

                {/* HEADER */}
                <div className="mb-10 rounded-[12px] bg-white p-8  border border-[#eaeaea]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-primary">
                          <Layers size={14} />
                          Learning Materials
                        </span>
                      </div>
                      <h1 className="text-[32px] md:text-[38px] font-black tracking-tight text-[#1a1a1a] leading-tight">
                        {data?.[0]?.topicName_en || "Topic Contents"}
                      </h1>
                      <p className="mt-2 text-[15px] font-medium text-[#666]">
                        Explore videos, links, and downloadable resources for this topic.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FILTER & STATS BAR */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* SEGMENTED CONTROL TABS */}
                  <div className="inline-flex rounded-full bg-white p-1.5 shadow-sm border border-[#f1edf4]">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`relative flex items-center gap-2 px-6 py-2.5 text-[14px] font-bold rounded-full transition-all duration-300 ${activeTab === "all" ? "text-white shadow-md" : "text-[#666] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
                        }`}
                    >
                      {activeTab === "all" && <div className="absolute inset-0 rounded-full bg-primary" style={{ zIndex: 0 }}></div>}
                      <span className="relative z-10 flex items-center gap-2"><Filter size={16} /> All ({data?.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("video")}
                      className={`relative flex items-center gap-2 px-6 py-2.5 text-[14px] font-bold rounded-full transition-all duration-300 ${activeTab === "video" ? "text-white shadow-md" : "text-[#666] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
                        }`}
                    >
                      {activeTab === "video" && <div className="absolute inset-0 rounded-full bg-primary" style={{ zIndex: 0 }}></div>}
                      <span className="relative z-10 flex items-center gap-2"><FileVideo size={16} /> Videos</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("link")}
                      className={`relative flex items-center gap-2 px-6 py-2.5 text-[14px] font-bold rounded-full transition-all duration-300 ${activeTab === "link" ? "text-white shadow-md" : "text-[#666] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
                        }`}
                    >
                      {activeTab === "link" && <div className="absolute inset-0 rounded-full bg-primary" style={{ zIndex: 0 }}></div>}
                      <span className="relative z-10 flex items-center gap-2"><LinkIcon size={16} /> Links</span>
                    </button>
                  </div>
                </div>

                {/* CONTENT LIST */}
                <div className="grid gap-5">
                  {filteredData?.map((item, index) => (
                    <div
                      key={item?.id || index}
                      className="group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-[12px] border border-[#ececec] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A126DB]/30 hover:shadow-[0_12px_30px_rgba(161,38,219,0.08)]"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex flex-1 items-start gap-5">

                        {/* THUMBNAIL */}
                        <div className="relative h-[90px] w-[140px] shrink-0 overflow-hidden rounded-[14px] border border-[#f0eaf5] bg-[#f8f6fb] group-hover:ring-2 group-hover:ring-[#A126DB]/20 transition-all">
                          {item?.thumbnailImage ? (
                            <>
                              <CustomImage
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                img={item?.thumbnailImage}
                                alt={item?.title_en}
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                              {item?.contentType === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white">
                                    <Play fill="currentColor" size={18} className="ml-1" />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex h-full items-center justify-center text-primary/40 bg-primary/5">
                              {item?.contentType === "video" ? <FileVideo size={36} /> : <LinkIcon size={36} />}
                            </div>
                          )}

                          {/* TYPE BADGE */}
                          <div className="absolute bottom-2 left-2 rounded-full bg-black/70 backdrop-blur-md px-2 py-[2px] text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
                            {item?.contentType}
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-col min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                              {item?.subjectName_en}
                            </span>
                            {item?.downloadable && (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 ring-1 ring-emerald-500/20">
                                <Download size={12} />
                                Downloadable
                              </span>
                            )}
                          </div>

                          <h2 className="mt-2 line-clamp-2 text-[18px] md:text-[20px] font-black leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#A126DB]">
                            {item?.title_en}
                          </h2>

                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#666]">
                              {item?.contentType === "video" ? <PlayCircle size={14} className="text-[#A126DB]/70" /> : <LinkIcon size={14} className="text-blue-500/70" />}
                              {item?.contentType === "video" ? "Video Lesson" : "External Resource"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="flex shrink-0 items-center gap-3 border-t border-[#f0f0f0] pt-4 md:border-0 md:pt-0">
                        {/* BOOKMARK */}
                        {/* <button className="group/btn relative flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#ececec] bg-[#fdfdfd] text-[#888] transition-all hover:border-primary hover:bg-primary/5 hover:text-primary">
                          {item?.isBookmarked ? <BookmarkCheck size={20} className="text-primary" /> : <Bookmark size={20} />}
                        </button> */}

                        {/* ACTION BUTTON */}
                        {item?.contentType === "video" ? (
                          <button
                            onClick={() => {
                              setVideoUrl(item?.contentUrl);
                              setOpenVideo(true);
                            }}
                            className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-full bg-[#f8f5fc] px-7 text-[14px] font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105"
                          >
                            Watch Now
                          </button>
                        ) : (
                          <Link
                            href={item?.contentUrl || "#"}
                            target="_blank"
                            className="inline-flex h-[48px] items-center justify-center rounded-full bg-[#f8f5fc] px-7 text-[14px] font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105"
                          >
                            Open Link
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <NoRecordFound />
            )}
          </>
        ) : (
          <LoadingScreen isDashboard={true} />
        )}
      </section>

      {/* THEATER VIDEO MODAL */}
      {openVideo && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg">
          <div className="relative w-full max-w-[1200px] overflow-hidden rounded-[24px] bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                setOpenVideo(false);
                setVideoUrl("");
              }}
              className="absolute right-6 top-6 z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
            >
              <X size={24} />
            </button>

            {/* VIDEO WRAPPER */}
            <div className="aspect-video w-full bg-black/50">
              <video
                controls
                autoPlay
                playsInline
                className="h-full w-full"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TopicContents;