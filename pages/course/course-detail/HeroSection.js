"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import practicalLearn from "../../../assets/images/coaching.gif";
import industry from "../../../assets/images/certified.gif";
import certificate from "../../../assets/images/nanotechnology.gif";

import { FaHourglassEnd, FaIndianRupeeSign } from "react-icons/fa6";
import {
  getTokenCookie,
  ERROR_MSG,
  SUCCESS_MSG,
  getFromStorage,
  saveToStorage,
} from "@/utils";

import { useDataStore } from "@/store/useDataStore";
import {
  buyCourse,
  getCoursesDetail,
  successPayment,
  buyFreeCourse,
} from "@/services/authService";
import Modal from "../../../components/common/Modal";
import { Link } from "lucide-react";
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
      ERROR_MSG("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: orderId,

      handler: async (response) => {

        console.log(response.razorpay_payment_id,'responseresponseresponseresponse')

        try {
          // ✅ verify payment
          // const verifyRes = await fetch("/api/payment-success", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(response),
          // });

          // const verifyData = await verifyRes.json();

          // if (!verifyData.success) {
          //   ERROR_MSG("Payment verification failed");
          //   return;
          // }

          // ✅ activate course
          const buyRes = await successPayment({
            paymentId: response.razorpay_payment_id,
          });

          if (buyRes?.status === 200) {
            SUCCESS_MSG("Course purchased successfully");
            router.push("/my-course");
          } else {
            ERROR_MSG("Course activation failed");
          }
        } catch (err) {
          console.error(err);
          ERROR_MSG("Something went wrong after payment");
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
      ERROR_MSG(response.error.description || "Payment failed");
    });

    rzp.open();
  };

  // ✅ Buy Flow
  const buyNow = async () => {
    const token = getTokenCookie();

    if (!token) {
      ERROR_MSG("Please login to buy the course");
      setBuyCourse(1);
      saveToStorage("buycourse", 1);
      router.push("/sign-up");
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
        ERROR_MSG("Course not found");
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
          ERROR_MSG("Payment initialization failed");
        }
      }

      // 🟢 Free Course
      else {
        const res = await buyFreeCourse({
          courseId: cdata.id,
        });

        if (res?.status === 200) {
          SUCCESS_MSG("Course purchased successfully");
          router.push("/my-course");
        } else {
          ERROR_MSG("Failed to purchase course");
        }
      }
    } catch (err) {
      console.error(err);
      ERROR_MSG("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return ( props ?

  <>
    
   <section className="relative overflow-hidden bg-[#050816] text-white">
  {/* LEFT PURPLE GLOW */}
  <div className="absolute left-[-180px] top-[120px] h-[500px] w-[500px] rounded-full bg-[#9D2BA7]/35 blur-[140px]" />
  {/* RIGHT BLUE/PURPLE GLOW */}
  <div className="absolute right-[-120px] top-[-100px] h-[450px] w-[450px] rounded-full bg-[#7e1f87]/30 blur-[130px]" />
  {/* BOTTOM PINK GLOW */}
  <div className="absolute bottom-[-220px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d90eef]/20 blur-[160px]" />
  {/* EXTRA SOFT LIGHT */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)]" />
  {/* CENTER OVERLAY */}
  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(157,43,167,0.12),rgba(126,31,135,0.06),transparent)]" />

  {/* CONTENT */}
  <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-8">
    <div className="grid items-center gap-16 lg:grid-cols-2">
      {/* LEFT */}
      <div>
        {/* Animated Badge */}
        <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
          <div className="relative z-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-7 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,255,255,0.08)]">
             {props?.mainCategoryName_en}
          </div>
        </div>

        <h1 className="mt-2 text-5xl leading-tight font-extrabold md:text-5xl">
           {props?.title_en}
        </h1>

         <p className="mt-6 text-lg leading-8 text-justify text-white/75 line-clamp-4">
           {props?.description_en}
         </p>


        {props?.description_en && (
          <button
            onClick={() => setOpen(true)}
            className="mt-3 text-white/75 cursor-pointer font-semibold"
          >
            More Info.
          </button>
        )}
        
        {/* TAGS */}
        <div className="flex flex-wrap gap-3 mt-6">
          {["Video lecture", "12 Modules", "Certificate Included", "Beginner Friendly"].map((item, i) => (
            <span
              key={i}
              className="bg-purple-100 text-gray-900 px-4 py-2 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>


        <span className="flex items-center gap-1 mt-6 text-white/75">
          <FaHourglassEnd/> 
            Access details : {props.validity} {props.validityType=="date" ? ' Date access Available' : ' Days access Available'}
        </span>

        {/* PRICE */}
        <div className="mt-6">
          <div className="flex items-center gap-1 text-[45px] font-bold">
            <FaIndianRupeeSign className="text-gray-400 mt-1" />
            {props.isPaid  ? props.sellPrice ? 
             <>
                <span className="line-through text-gray-400">
                  {props.mrp}
                </span>

                <span className="text-white ml-2">
                  {props.sellPrice}/-
                </span>
              </>  
              : 
              <span className="text-gray-400">{props.mrp}/-</span>
              : <span className="text-gray-400">Free</span>}
        </div>
       </div>     

       { !loader ?
          <button onClick={()=>buyNow()} className="mt-6 bg-purple-600 hover:bg-purple-800 text-white px-8 py-3 rounded-lg cursor-pointer transition-all">
            Buy Now →
          </button> :
          <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-4 mt-6 px-6 py-3 rounded-lg  cursor-not-allowed">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span> Please wait...</span>
          </button> }  
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        {/* glow behind image */}
        <div className="absolute inset-0 scale-110 rounded-[30px] bg-[#d90eef]/20 blur-3xl"></div>
        <div className="relative overflow-hidden rounded-[12px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="bg-white">
            <CustomImage img={props?.bannerImage} alt={props?.title_en} className="rounded-2xl w-full" />
          </div> 

          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: -50 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="absolute top-4 right-4 bg-white z-9000 px-4 py-2  text-sm font-medium flex items-center gap-2 c-detail-motion"
          >
            <Image src={industry} width={42}/>
            <div className="c-montion-text">Certified </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30, }}
            animate={{ opacity: 1, x: 10, y: -50 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-10 left-0 bg-white  px-4 py-2  text-sm font-medium c-detail-motion"
          >
            <Image src={practicalLearn} width={42}/> 
             <div className="c-montion-text">Practical Learning</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: -20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-0 right-4 bg-white  px-4 py-2  text-sm font-medium c-detail-motion"
          >
            <Image src={certificate} width={42}/> 
             <div className="c-montion-text"> Industry Relevant </div>
          </motion.div> */}

        </div>

      </div>
    </div>
  </div>
</section>

  { open && (
    <Modal setOpen={setOpen} heading={props?.title_en} description={props?.description_en} />
  )}
    </> : null
  );
}