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


  return (<>
    <section className="min-h-screen bg-black flex items-center justify-center p-0 bg-white">
      <div className="w-full max-w-12xl bg-white  overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="w-full max-w-[550px] xl:ml-20 p-10 md:p-16 flex flex-col justify-center">

          {/* LOGO */}
          <Link href={'/'}>
            <h2 className="font-bold text-xl mb-12">
              <Image src={logo} />
            </h2>
          </Link>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900">Sign up</h1>
          <p className="text-gray-500 mt-2 mb-8">
            Embark on your journey to success! Get your profile evaluated and take
            the first step towards achieving your dreams today!
          </p>

          {/* MOBILE */}

          {isOtp ?
            <form onSubmit={handleVerifyOtp}>
              <div className="relative mb-6">
                {/* <input
          type="number"
          placeholder=" "
          defaultValue=""
          className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-3 focus:outline-none focus:border-purple-600"
        /> */}

                <div className="user-mobile">{mobile}
                  <FaEdit title="Change Mobile No" onClick={() => setisOtp(false)} className="edit-mobile" />
                </div>

                <label for="otpnumber"> OTP </label>
                <div style={{ clear: 'both' }}></div>

                {otp.map((digit, index) => (
                  <input
                    id="otpnumber"
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 mr-2"
                  />
                ))}
              </div>

              <div className="text-center mt-4">
                {timer > 0 ? (
                  <p className="text-sm text-gray-500">Resend OTP in {timer}s</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleLogin(true, 1)}
                    className="text-sm font-medium text-purple-700 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* BUTTON */}
              <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition">
                {loading ? 'Please wait..' : 'Submit'}
              </button>
            </form>
            :
            <form onSubmit={handleLogin}>
              <div className="relative mb-6">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder=" "
                  value={mobile}
                  onChange={(e) => {
                    let value = e.target.value;

                    // ✅ Only numbers allow
                    value = value.replace(/\D/g, "");

                    // ✅ Limit to 10 digits
                    if (value.length > 10) value = value.slice(0, 10);

                    setMobile(value);
                  }}
                  className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-3 focus:outline-none focus:border-purple-600"
                />
                <label className="absolute left-3 px-1 bg-white text-gray-400 text-sm
        transition-all duration-200
        top-1/2 -translate-y-1/2
        peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-600
        peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs">
                  Mobile Number
                </label>
              </div>

              {/* BUTTON */}
              <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition">
                {loading ? 'Please wait..' : 'Submit'}
              </button>
            </form>
          }



          <div className="flex items-center gap-6 my-6 text-gray-400 text-sm">
            {/* OR 
            <div className="flex-1 h-[1px] bg-gray-200" />
            or
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          {/* GOOGLE */}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden md:block md:fixed right-0 top-0 w-1/2 h-screen">
          <img
            src={`${rightSide.src}?q=80&w=1600&auto=format&fit=crop`}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section></>
  );
}
export default withoutAuth(SignIn);