"use client";
import { withoutAuth } from '../../utils/withAuth';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";
import Image from "next/image";
import rightSide from "../../assets/images/sign-up.svg";
import { ERROR_MSG, setTokenCookie, getFromStorage, setuserInfo, SUCCESS_MSG } from "@/utils";
import { loginUser, otpVerify } from "@/services/authService";
import { useRouter } from "next/router";
import { useDataStore } from "@/store/useDataStore";

function SignIn() {
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOtp, setisOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(2);
  const inputRefs = useRef([]);
  const router = useRouter();
  const { setUsers, buyCourse } = useDataStore();

  // Timer countdown
  useEffect(() => {
    let interval = null;

    if (isOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOtp, timer]);

  //  setTimer(2);
  //       setOtp(["", "", "", ""]);
  //       inputRefs.current[0]?.focus();

  const handleLogin = async (event, isResend) => {
    if (!isResend) event.preventDefault()
    console.log(mobile, 'mobilemobilemobile')

    try {

      if (!isResend) {
        if (!mobile || mobile.length < 10) {
          ERROR_MSG("Please enter valid mobile number")
          return;
        }
        setLoading(true);
      }

      const payload = {
        mobileNo: mobile,
        countryId: "101",
      };

      const res = await loginUser(payload);

      if (res) {
        if (isResend) {
          setOtp(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }

        SUCCESS_MSG("Please Verify 4 Digti OTP No.")
        setisOtp(true)
        setTimer(60);
        //setToken(res.token);
      }

    } catch (error) {
      ERROR_MSG(error.response?.data || error.message)
      console.error("Login error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }


  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits are filled
    if (updatedOtp.join("").length === 4) {
      handleVerifyOtp(null, updatedOtp.join(""));
    }
  };

  // Handle Backspace
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP API
  const handleVerifyOtp = async (event, directOtp) => {
    if (event) event.preventDefault();

    const finalOtp = directOtp || otp.join("");

    if (finalOtp.length !== 4) {
      ERROR_MSG("Please enter 4 digit OTP");
      return;
    }

    try {
      setLoading(true);
      //LOGIN_OTP
      const payload = {
        mobileNo: mobile,
        otp: finalOtp,
      };

      const res = await otpVerify(payload);
      const { data } = res
      console.log(res, 'resresres')
      if (data?.userToken) {
        setTokenCookie(data?.userToken);
        setUsers(data?.userData)
        setuserInfo(JSON.stringify(data?.userData))
        SUCCESS_MSG("OTP verified successfully");
        router.push(buyCourse || getFromStorage('buyCourse') ? (getFromStorage('csid') ? "/course-detail" : "/courses") : "/dashboard")
        console.log("Verified:", data);
      } else {
        ERROR_MSG(data?.message || "Invalid OTP");
      }
    } catch (error) {
      ERROR_MSG(error?.response?.data?.message || error?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  // Resend OTP API
  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (res.ok) {
        setTimer(2);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        alert(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="min-h-screen bg-white relative flex">
      {/* LEFT SIDE - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 z-10 bg-white min-h-screen">
        <div className="w-full max-w-[440px] flex flex-col">

          {/* LOGO */}
          <Link href={'/'} className="mb-12 inline-block w-fit transition-transform hover:opacity-80">
            <Image src={logo} alt="Logo" width={180} height={45} className="h-auto" />
          </Link>

          {/* Heading */}
          <div className="mb-10">
            {isOtp && (
              <button onClick={() => setisOtp(false)} className="mb-6 flex items-center text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to sign up
              </button>
            )}
            <h1 className="text-3xl sm:text-[34px] font-bold text-slate-900 tracking-tight mb-3">
              {isOtp ? 'Check your phone' : 'Create your account'}
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              {isOtp
                ? 'We sent a 4-digit verification code to your mobile number. Enter it below to continue.'
                : 'Enter your mobile number to get started. We will send you a verification code.'}
            </p>
          </div>

          {isOtp ? (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100 flex items-center justify-between mb-8">
                <div>
                  <p className="text-[11px] text-purple-600 font-bold uppercase tracking-widest mb-1">Code sent to</p>
                  <p className="text-slate-800 font-semibold text-sm tracking-wide">+91 {mobile}</p>
                </div>
                <button type="button" onClick={() => setisOtp(false)} className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-purple-600 shadow-sm border border-purple-100 hover:bg-purple-600 hover:text-white transition-all">
                  <FaEdit size={14} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Verification Code</label>
                <div className="flex gap-3 sm:gap-4 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all shadow-sm"
                    />
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                {timer > 0 ? (
                  <p className="text-sm font-medium text-slate-500">Resend code in <span className="text-purple-600">{timer}s</span></p>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleLogin(true, 1)}
                    className="text-sm font-semibold text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                  >
                    Resend verification code
                  </button>
                )}
              </div>

              <button disabled={loading} type="submit" className="w-full mt-4 bg-purple-600 text-white py-4 rounded-2xl font-semibold text-[15px] shadow-[0_8px_20px_rgba(147,51,234,0.25)] hover:bg-purple-700 hover:shadow-[0_10px_25px_rgba(147,51,234,0.35)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Verifying...</>
                ) : (
                  'Verify & Continue'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder=" "
                  value={mobile}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 10) value = value.slice(0, 10);
                    setMobile(value);
                  }}
                  className="peer w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 pt-7 pb-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all font-medium text-slate-900"
                />
                <label className="absolute left-5 top-5 text-slate-400 text-sm font-medium transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-purple-600 peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:text-[11px]">
                  Mobile Number
                </label>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 peer-focus:text-purple-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold text-[15px] shadow-[0_8px_20px_rgba(147,51,234,0.25)] hover:bg-purple-700 hover:shadow-[0_10px_25px_rgba(147,51,234,0.35)] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending code...</>
                ) : (
                  'Continue with Mobile'
                )}
              </button>
            </form>
          )}

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              By continuing, you agree to our <Link href="/terms-and-conditions" className="font-semibold text-slate-700 hover:text-purple-600 transition-colors">Terms of Service</Link> and <Link href="/privacy-policy" className="font-semibold text-slate-700 hover:text-purple-600 transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - SaaS Visual */}
      <div className="hidden md:flex md:w-1/2 fixed right-0 top-0 bottom-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-12 flex-col justify-between overflow-hidden">
        {/* Abstract Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/20 blur-[120px]"></div>

        <div className="relative z-10 text-white mt-8 2xl:mt-16">
          <h2 className="text-4xl lg:text-5xl xl:text-[56px] font-black leading-[1.1] tracking-tight mb-6">
            Unlock your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">true potential.</span>
          </h2>
          <p className="text-purple-100/70 text-lg lg:text-xl max-w-lg leading-relaxed font-light">
            Join thousands of ambitious professionals using AI-driven insights to navigate their career paths with absolute confidence.
          </p>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center mt-12 mb-8 drop-shadow-2xl">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-full border border-white/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-8 bg-gradient-to-b from-white/10 to-transparent rounded-full border border-white/10"></div>
            {/* <img
              src={rightSide.src}
              alt="Career Dashboard"
              className="w-[80%] h-[80%] object-contain relative z-20"
            /> */}
          </div>
        </div>

        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-2xl w-fit shadow-2xl">
            <div className="flex -space-x-3">
              {[44, 12, 33, 47].map(i => (
                <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#302b63] bg-purple-200 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="pr-4">
              <p className="text-white font-bold text-sm sm:text-base tracking-wide">10,000+ Students</p>
              <p className="text-purple-200/80 text-xs sm:text-sm font-medium">Successfully mentored</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default withoutAuth(SignIn);