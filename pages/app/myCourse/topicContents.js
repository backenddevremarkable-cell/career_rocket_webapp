import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReactPlayer from "react-player";

import NoRecordFound from "../../../components/common/NoRecordFound";
import CustomImage from "../../../components/common/ImageMedia";
import LoadingScreen from "../../../components/common/Loading";

import { contentByTopicId } from "@/services/authService";
import { getFromStorage } from "@/utils/index";

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

    return data?.filter(
      (item) => item?.contentType === activeTab
    );

  }, [activeTab, data]);

  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      <section className="px-4 pb-10 pt-[85px] lg:ml-[255px] lg:px-8">

        {!loading ? (

          <>

            {data?.length > 0 ? (

              <div className="mx-auto max-w-[1150px]">

                {/* HEADER */}
                <div className="mb-8 flex flex-col gap-2">

                  <h1 className="text-[30px] font-black text-[#1d1d1d]">
                    {data?.[0]?.topicName_en}
                  </h1>

                  <p className="text-[14px] text-[#7a7a7a]">
                    Explore videos, learning resources and useful topic materials.
                  </p>

                </div>

                {/* FILTER BUTTONS */}
                <div className="mb-8 flex flex-wrap gap-3">

                  <button
                    onClick={() => setActiveTab("all")}
                    className={`inline-flex h-[44px] items-center justify-center cursor-pointer rounded-full px-5 text-[13px] font-bold transition-all duration-300 ${
                      activeTab === "all"
                        ? "bg-primary text-white border border-[#ececec]"
                        : "border border-[#ececec] bg-white text-[#666] hover:border-primary hover:text-primary"
                    }`}
                  >
                    All ({data?.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("video")}
                    className={`inline-flex h-[44px] items-center justify-center cursor-pointer rounded-full px-5 text-[13px] font-bold transition-all duration-300 ${
                      activeTab === "video"
                        ? "bg-primary text-white border border-[#ececec]"
                        : "border border-[#ececec] bg-white text-[#666] hover:border-primary hover:text-primary"
                    }`}
                  >
                    🎬 Videos
                  </button>

                  <button
                    onClick={() => setActiveTab("link")}
                    className={`inline-flex h-[44px] items-center justify-center cursor-pointer rounded-full px-5 text-[13px] font-bold transition-all duration-300 ${
                      activeTab === "link"
                        ? "bg-primary text-white border border-[#ececec]"
                        : "border border-[#ececec] bg-white text-[#666] hover:border-primary hover:text-primary"
                    }`}
                  >
                    🔗 Links
                  </button>

                </div>

                {/* CONTENT LIST */}
                <div className="grid gap-5">

                  {filteredData?.map((item, index) => (

                    <div
                      key={item?.id || index}
                      className="group relative overflow-hidden rounded-[12px] border border-[#ececec] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
                    >

                      {/* BACKGROUND GLOW */}
                      <div className="absolute right-[-40px] top-[-40px] h-[120px] w-[120px] rounded-full bg-primary/5 blur-3xl"></div>

                      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        {/* LEFT SIDE */}
                        <div className="flex flex-1 items-start gap-4">

                          {/* THUMBNAIL */}
                          <div className="relative h-[90px] w-[120px] shrink-0 overflow-hidden rounded-[12px] border border-[#f0eaf5] bg-[#faf7fd]">

                            {item?.thumbnailImage ? (

                              <CustomImage
                                className="h-full w-full object-cover rounded-[12px]"
                                img={item?.thumbnailImage}
                                alt={item?.title_en}
                              />

                            ) : (

                              <div className="flex h-full items-center justify-center text-[36px]">
                                {item?.contentType === "video" ? "🎬" : "🔗"}
                              </div>

                            )}

                            {/* TYPE BADGE */}
                            <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-[4px] text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur">
                              {item?.contentType}
                            </div>

                          </div>

                          {/* CONTENT */}
                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                                {item?.subjectName_en}
                              </span>

                              {item?.downloadable && (

                                <span className="rounded-full bg-[#eafaf0] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1f9d57]">
                                  Downloadable
                                </span>

                              )}

                            </div>

                            <h2 className="mt-3 line-clamp-2 text-[18px] font-black leading-[28px] text-[#1e1e1e] transition-all duration-300 group-hover:text-primary md:text-[22px]">
                              {item?.title_en}
                            </h2>

                            <div className="mt-3 flex flex-wrap items-center gap-3">

                              <span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-[11px] font-semibold text-[#666]">
                                {item?.contentType === "video"
                                  ? "Video Lesson"
                                  : "External Resource"}
                              </span>

                              <span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-[11px] font-semibold text-[#666]">
                                Learning Material
                              </span>

                            </div>

                          </div>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-3">

                          {/* BOOKMARK */}
                          <button className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#ececec] bg-white text-[18px] text-[#777] transition-all duration-300 hover:border-primary hover:text-primary">
                            {item?.isBookmarked ? "★" : "☆"}
                          </button>

                          {/* ACTION BUTTON */}
                          {item?.contentType === "video" ? (

                            <button
                              onClick={() => {
                                setVideoUrl(item?.contentUrl);
                                setOpenVideo(true);
                              }}
                              className="inline-flex h-[50px] items-center cursor-pointer justify-center rounded-full bg-primary px-6 text-[14px] font-bold text-white transition-all duration-300 hover:scale-[1.03]"
                            >
                              Watch Now
                            </button>

                          ) : (

                            <Link
                              href={item?.contentUrl || "#"}
                              target="_blank"
                              className="inline-flex h-[50px] items-center justify-center rounded-full bg-primary px-6 text-[14px] font-bold text-white  transition-all duration-300 hover:scale-[1.03]"
                            >
                              Open Link
                            </Link>

                          )}

                        </div>

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

      {/* VIDEO MODAL */}
       
       {
  openVideo && (

    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[1000px] overflow-hidden rounded-[12px] bg-black shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={() => {
            setOpenVideo(false);
            setVideoUrl("");
          }}
          className="cursor-pointer absolute right-4 top-4 z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[18px] font-bold text-black"
        >
          ✕
        </button>

        {/* VIDEO */}
        <div className="aspect-video w-full bg-black">

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

  )
}

    </main>
  );
};

export default TopicContents;