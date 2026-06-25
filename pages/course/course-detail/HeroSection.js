"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHourglassEnd, FaIndianRupeeSign } from "react-icons/fa6";
import { ShieldCheck, Target, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import {
  getTokenCookie,
  getFromStorage,
  saveToStorage,
} from "@/utils";
import Swal from "sweetalert2";

const showSuccessAlert = (message) => {
  return Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    background: "#ffffff",
    color: "#1f2937",
    iconColor: "#a855f7",
    confirmButtonColor: "#9D2BA8",
    customClass: {
      popup: "rounded-2xl border border-purple-500/20 shadow-2xl",
      confirmButton: "px-6 py-2.5 rounded-lg text-white font-semibold transition-all hover:scale-105 cursor-pointer",
    },
  });
};

const showErrorAlert = (message) => {
  return Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    background: "#ffffff",
    color: "#1f2937",
    iconColor: "#ef4444",
    confirmButtonColor: "#9D2BA8",
    customClass: {
      popup: "rounded-2xl border border-purple-500/20 shadow-2xl",
      confirmButton: "px-6 py-2.5 rounded-lg text-white font-semibold transition-all hover:scale-105 cursor-pointer",
    },
  });
};

const showInfoAlert = (message) => {
  return Swal.fire({
    title: "Info",
    text: message,
    icon: "info",
    background: "#ffffff",
    color: "#1f2937",
    iconColor: "#3b82f6",
    confirmButtonColor: "#9D2BA8",
    customClass: {
      popup: "rounded-2xl border border-gray-200 shadow-2xl",
      confirmButton: "px-6 py-2.5 rounded-lg text-white font-semibold transition-all hover:scale-105 cursor-pointer",
    },
  });
};

import { useDataStore } from "@/store/useDataStore";
import {
  buyCourse,
  getCoursesDetail,
  successPayment,
  buyFreeCourse,
} from "@/services/authService";
import Modal from "../../../components/common/Modal";
import CustomImage from "../../../components/common/ImageMedia";

export default function HeroSection(props) {
  const { setBuyCourse, courseId } = useDataStore((state) => state);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // ✅ Load Razorpay only once
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const existingScript = document.getElementById("razorpay-script");
      if (existingScript) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // ✅ Open Razorpay
  const openRazorpay = async (orderId) => {
    const isLoaded = await loadRazorpay();

    if (!isLoaded || !window.Razorpay) {
      showErrorAlert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: orderId,

      handler: async (response) => {
        try {
          // ✅ activate course
          const buyRes = await successPayment({
            paymentId: response.razorpay_payment_id,
          });

          if (buyRes?.status === 200) {
            showSuccessAlert("Course purchased successfully").then(() => {
              router.push("/my-course");
            });
          } else {
            showErrorAlert("Course activation failed");
          }
        } catch (err) {
          console.error(err);
          showErrorAlert("Something went wrong after payment");
        }
      },

      modal: {
        ondismiss: () => console.log("Payment popup closed"),
      },

      theme: {
        color: "#9F23A8",
      },
    };

    const rzp = new window.Razorpay(options);

    // ✅ handle failure
    rzp.on("payment.failed", function (response) {
      console.log("Payment Failed:", response.error);
      showErrorAlert(response.error.description || "Payment failed");
    });

    rzp.open();
  };

  // ✅ Buy Flow
  const buyNow = async () => {
    const token = getTokenCookie();

    if (!token) {
      showInfoAlert("Please login to buy the course").then(() => {
        setBuyCourse(1);
        saveToStorage("buycourse", 1);
        router.push("/sign-up");
      });
      return;
    }

    const courseIdFinal = courseId || getFromStorage("csid");

    if (!courseIdFinal) {
      router.push("/courses");
      return;
    }

    try {
      setLoader(true);

      const resCourse = await getCoursesDetail({ id: courseIdFinal });
      const cdata = resCourse?.data;

      if (!cdata) {
        showErrorAlert("Course not found");
        return;
      }

      // 🔴 Paid Course
      if (cdata.isPaid) {
        const res = await buyCourse({
          testId: cdata.id,
          type: "WALLET",
          amount: cdata.sellPrice,
        });

        if (res?.status === 200 && res?.orderId) {
          await openRazorpay(res.orderId);
        } else {
          showErrorAlert("Payment initialization failed");
        }
      }

      // 🟢 Free Course
      else {
        const res = await buyFreeCourse({
          courseId: cdata.id,
        });

        if (res?.status === 200) {
          showSuccessAlert("Course purchased successfully").then(() => {
            router.push("/my-course");
          });
        } else {
          showErrorAlert("Failed to purchase course");
        }
      }
    } catch (err) {
      console.error(err);
      showErrorAlert("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const discountPercent = props?.mrp && props?.sellPrice ? Math.round(((props.mrp - props.sellPrice) / props.mrp) * 100) : 0;

  return (props ?
    <>
      <section className="relative overflow-hidden bg-[#0a0516] text-white py-16 sm:py-16">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute right-[-10%] top-[-10%] h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[150px] pointer-events-none" />

        {/* CONTENT */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">

            {/* LEFT COLUMN - TEXT CONTENT */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Premium Category Badge */}
              <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-6">
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,#9D2BA8_0%,#4c0f51_50%,#9D2BA8_100%)]" />
                <div className="inline-flex items-center justify-center rounded-full bg-slate-950/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-purple-200 backdrop-blur-3xl gap-2 border border-purple-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  {props?.mainCategoryName_en}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-purple-300">
                {props?.title_en}
              </h1>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg text-slate-300/85 leading-relaxed text-justify line-clamp-4">
                {props?.description_en}
              </p>

              {props?.description_en && (
                <button
                  onClick={() => setOpen(true)}
                  className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors duration-200 flex items-center gap-1 group"
                >
                  Read Full Details
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>
              )}

              {/* Modern Glassmorphic Badges */}
              <div className="flex flex-wrap gap-2.5 mt-8">
                {["Video Lectures", "12 Modules", "Certificate Included", "Beginner Friendly"].map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-purple-500/30 text-purple-200/90 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    {item}
                  </span>
                ))}
              </div>

              {/* Access Details Box */}
              <div className="flex items-center gap-3 mt-6 text-sm text-slate-300/85 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <FaHourglassEnd className="text-purple-400" />
                <span>
                  Access details: <span className="font-semibold text-white">{props?.validity}</span> {props?.validityType === "date" ? 'Date access Available' : 'Days access Available'}
                </span>
              </div>

              {/* Price & Savings */}
              <div className="mt-8 flex items-baseline gap-4 flex-wrap">
                {props?.isPaid ? (
                  props?.sellPrice ? (
                    <>
                      <div className="flex items-center text-4xl sm:text-5xl font-black text-white tracking-tight">
                        <FaIndianRupeeSign className="text-purple-400 text-3xl mr-0.5" />
                        <span>{props.sellPrice}/-</span>
                      </div>
                      {props?.mrp && props?.mrp > props?.sellPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-xl line-through text-slate-500 font-medium">
                            ₹{props.mrp}
                          </span>
                          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide uppercase">
                            Save {discountPercent}%
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center text-4xl sm:text-5xl font-black text-white tracking-tight">
                      <FaIndianRupeeSign className="text-purple-400 text-3xl mr-0.5" />
                      <span>{props?.mrp}/-</span>
                    </div>
                  )
                ) : (
                  <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent tracking-tight">
                    FREE
                  </span>
                )}
              </div>

              {/* CTA Enroll Button */}
              {!loader ? (
                <button
                  onClick={() => buyNow()}
                  className="group relative mt-8 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-8 py-3.5 font-bold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:shadow-purple-600/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span>{props?.isPaid ? 'Unlock Full Course' : 'Enroll for Free'}</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1 font-semibold text-lg">→</span>
                </button>
              ) : (
                <button className="flex items-center justify-center gap-2.5 bg-purple-700/80 text-white px-8 py-3.5 rounded-xl mt-8 cursor-not-allowed border border-purple-500/30">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-semibold">Securing transaction...</span>
                </button>
              )}
            </div>

            {/* RIGHT COLUMN - MEDIA VIEWPORT */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative group/image max-w-md mx-auto lg:max-w-none">

                {/* Glow behind image */}
                <div className="absolute inset-0 scale-105 rounded-3xl bg-gradient-to-tr from-purple-600/25 to-indigo-600/25 blur-3xl opacity-70 transition-opacity duration-500 group-hover/image:opacity-95" />

                {/* Custom Card Frame */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <div className="overflow-hidden rounded-xl bg-white/5">
                    <CustomImage img={props?.bannerImage} alt={props?.title_en} className="w-full h-auto object-cover transform duration-700 hover:scale-[1.02]" />
                  </div>
                </div>

                {/* Floating Badges */}
                {/* Badge 1: Certified */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-slate-950/90 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md text-white"
                >
                  <div className="w-5 h-5 flex items-center justify-center bg-purple-500/20 text-purple-400 rounded-full">
                    <ShieldCheck size={13} />
                  </div>
                  <span>Verified Certificate</span>
                </motion.div>

                {/* Badge 2: Practical */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-slate-950/90 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md text-white"
                >
                  <div className="w-5 h-5 flex items-center justify-center bg-purple-500/20 text-purple-400 rounded-full">
                    <Target size={13} />
                  </div>
                  <span>Practical Training</span>
                </motion.div>

                {/* Badge 3: Industry */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 right-8 bg-slate-950/90 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md text-white animate-pulse"
                >
                  <div className="w-5 h-5 flex items-center justify-center bg-purple-500/20 text-purple-400 rounded-full">
                    <GraduationCap size={13} />
                  </div>
                  <span>Industry Standard</span>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {open && (
        <Modal setOpen={setOpen} heading={props?.title_en} description={props?.description_en} />
      )}
    </> : null
  );
}
