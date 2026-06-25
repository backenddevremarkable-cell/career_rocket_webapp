"use client";

import { useState, useEffect, useCallback } from "react";
import Step2DetailsPage from "@/app/step-2/page";
import Step2CounsellingPage from "@/app/step-2/counselling/page";
import { saveVerifiedUser, saveCounsellingContext } from "@/lib/session";
import { createCounsellingSession, studentLogin } from "@/lib/api";
import { fetchCounsellingLookups, unwrapCounsellingSession } from "@/lib/counsellingLookups";
import {
  Loader2,
  AlertCircle,
  ShieldCheck,
  HelpCircle,
  Smartphone,
  ArrowRight,
  Check
} from "lucide-react";

const EMITRA_SERVICE_MAPPING = {
  "14111": {
    id: "counselling",
    type: "counselling",
    title: "Career Counseling",
    price: 999,
    localServiceId: 1,
  },
  "14112": {
    id: "scholarship",
    type: "scholarship",
    title: "Scholarship Test",
    price: 99,
    localServiceId: 2,
  }
};

const SCHOLARSHIP_FEATURES = [
  ["Scholarship जीतने का मौका", "अपनी तैयारी का सही मूल्यांकन"],
  ["All India Rank Analysis", "Weak & Strong Topics की पहचान"],
  ["Competitive Exam Experience", "Performance Report से सुधार"],
  ["Academic Profile Improvement", "कम फीस में Quality Preparation"],
];

const COUNSELLING_FEATURES = [
  ["सही करियर चुनने में मदद", "Confusion Free Career Planning"],
  ["समय और पैसे की बचत", "बेहतर भविष्य के लिए सही दिशा"],
  ["10वीं/12वीं के बाद क्या करें", "Interest और Ability के अनुसार सुझाव"],
];

const getServiceObj = (serviceIdVal) => {
  const sId = String(serviceIdVal || "").trim();
  return EMITRA_SERVICE_MAPPING[sId] || EMITRA_SERVICE_MAPPING["14111"];
};

export default function EmitraDecryptPreview({ callbackParams, serverResult, backendBaseUrl = "http://localhost:3010" }) {
  const [tokenData, setTokenData] = useState(serverResult?.tokenResponse?.data);
  const [timeLeft, setTimeLeft] = useState(serverResult?.tokenResponse?.data?.expires_in || 0);
  const [refreshResponse, setRefreshResponse] = useState(null);
  const [status, setStatus] = useState("Active");
  const [serviceId, setServiceId] = useState(null);

  // Verification and Modal States mapped to inline views
  const [activeService, setActiveService] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showNotRegisteredModal, setShowNotRegisteredModal] = useState(false);
  const [verifiedUserMobile, setVerifiedUserMobile] = useState("");
  const [showStep2Modal, setShowStep2Modal] = useState(false);
  const [step2ModalType, setStep2ModalType] = useState(null);
  const [isLoadingStep2, setIsLoadingStep2] = useState(false);
  const [autoCheckDone, setAutoCheckDone] = useState(false);

  // Custom states for the new inline UX
  const [mobileInput, setMobileInput] = useState("");

  useEffect(() => {
    const initialToken = serverResult?.tokenResponse?.data;
    if (initialToken) {
      setTokenData(initialToken);
      setTimeLeft(initialToken.expires_in || 0);
      setStatus("Active");
      setRefreshResponse(null);
      setServiceId(serverResult?.serviceId);
    }
  }, [serverResult]);

  const handleRefresh = useCallback(async () => {
    setStatus("Refreshing...");
    try {
      const response = await fetch(`${backendBaseUrl}/api/regenerateAuthorizationToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: tokenData?.refresh_token }),
      });
      const resData = await response.json();
      if (response.ok && resData.data) {
        setTokenData(resData.data);
        setStatus("Refreshed");
        setRefreshResponse(resData);
      } else {
        setStatus("Refresh Failed");
        setRefreshResponse(resData);
      }
    } catch (err) {
      setStatus("Refresh Error");
      setRefreshResponse({ error: err.message });
    }
  }, [backendBaseUrl, tokenData?.refresh_token]);

  useEffect(() => {
    if (!tokenData?.expires_in) return;

    if (timeLeft <= 0) {
      if (tokenData?.refresh_token && status === "Active") {
        handleRefresh();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, tokenData, status, handleRefresh]);

  const handleUserVerified = useCallback(async (user) => {
    const activeServiceId = String(serverResult?.serviceId || serviceId || "").trim();
    let localServiceId = 1;
    if (activeServiceId === "14112" || activeServiceId === "2") {
      localServiceId = 2;
    } else if (activeServiceId === "14111" || activeServiceId === "1") {
      localServiceId = 1;
    } else {
      localServiceId = user.serviceType === "scholarship" ? 2 : 1;
    }

    const decryptedData = serverResult?.decryptResponse?.data?.data ?? serverResult?.decryptResponse?.data ?? serverResult?.decryptResponse;
    const kioskData = serverResult?.kioskResponse?.data?.data ?? serverResult?.kioskResponse?.data?.serverResult ?? serverResult?.kioskResponse?.data ?? serverResult?.kioskResponse;
    const ssoProfile = serverResult?.verifyResponse?.data?.data ?? serverResult?.verifyResponse?.data ?? serverResult?.verifyResponse;

    const isSsoTokenValid = !!(ssoProfile?.sAMAccountName || ssoProfile?.samaccountname);

    const verifiedUserObj = {
      ...user,
      localServiceId,
      serviceType: localServiceId === 2 ? "scholarship" : "counselling",
      emitraSSOID: isSsoTokenValid 
        ? (ssoProfile?.sAMAccountName || ssoProfile?.samaccountname || decryptedData?.SSOID || decryptedData?.ssoId || "PRACHEE.GAUR")
        : "SSOTESTKIOSK",
      emitraSSOTOKEN: isSsoTokenValid 
        ? (serverResult?.ssoToken || decryptedData?.SSOTOKEN || decryptedData?.ssotoken || "")
        : "",
      emitraMerchantCode: decryptedData?.MERCHANTCODE || "REMARKEDU24",
      emitraOfficeCode: isSsoTokenValid ? (kioskData?.OFFICECODE || kioskData?.officeCode || "REMARKEDUHQ") : "REMARKEDUHQ",
      emitraReturnUrl: decryptedData?.RETURNURL || decryptedData?.returnUrl || "",
    };

    saveVerifiedUser(verifiedUserObj);
    setShowVerifyModal(false);
    setShowNotRegisteredModal(false);

    setIsLoadingStep2(true);
    try {
      const sessionRaw = await createCounsellingSession(
        {
          mobileNo: verifiedUserObj.mobile || verifiedUserObj.mobileNo,
          serviceId: localServiceId
        },
        verifiedUserObj.token
      );
      const session = unwrapCounsellingSession(sessionRaw);

      if (verifiedUserObj.serviceType === "counselling") {
        const lookups = await fetchCounsellingLookups(session, verifiedUserObj.token, verifiedUserObj);
        saveCounsellingContext(lookups);
      }
    } catch (err) {
      console.error("Session initialization failed:", err);
      saveCounsellingContext(null);
    } finally {
      setStep2ModalType(verifiedUserObj.serviceType);
      setShowStep2Modal(true);
      setIsLoadingStep2(false);
    }
  }, [serverResult, serviceId]);

  const checkUserInDatabase = useCallback(async (mobile, serviceObj) => {
    setIsLoadingStep2(true);
    try {
      const result = await studentLogin(mobile);
      const token = result?.token;
      const responseUser = result?.response;
      const localUser = result?.user;
      const isVerified =
        (typeof result?.registered === "boolean" ? result.registered : null) ??
        responseUser?.isVerified ??
        false;

      if (!isVerified) {
        setVerifiedUserMobile(mobile);
        setShowNotRegisteredModal(true);
        setShowVerifyModal(false);
        return;
      }

      const user = responseUser || localUser || {};
      const verifiedUser = {
        ...user,
        token,
        serviceType: serviceObj.type,
        localServiceId: serviceObj.localServiceId,
        mobile: user.mobile || user.mobileNo || mobile,
        mobileNo: user.mobileNo || user.mobile || mobile,
        MOBILE: user.mobile || user.mobileNo || mobile,
        KIOSKNAM: (user.name || "").trim() || "Student",
      };

      handleUserVerified(verifiedUser);
    } catch (err) {
      console.error("Database check failed", err);
      setVerifiedUserMobile(mobile);
      setShowNotRegisteredModal(true);
      setShowVerifyModal(false);
    } finally {
      setIsLoadingStep2(false);
    }
  }, [handleUserVerified]);

  // Automatic verification and modal trigger
  useEffect(() => {
    if (autoCheckDone || !serverResult?.decryptResponse?.ok) return;

    const decryptedData = serverResult?.decryptResponse?.data?.data ?? serverResult?.decryptResponse?.data ?? serverResult?.decryptResponse;
    const kioskData = serverResult?.kioskResponse?.data?.data ?? serverResult?.kioskResponse?.data?.serverResult ?? serverResult?.kioskResponse?.data ?? serverResult?.kioskResponse;
    const ssoProfile = serverResult?.verifyResponse?.data?.data ?? serverResult?.verifyResponse?.data ?? serverResult?.verifyResponse;

    const rawMobile = decryptedData?.MOBILE || decryptedData?.mobile || decryptedData?.mobileNo ||
      kioskData?.MOBILE || kioskData?.mobile || kioskData?.mobileNo ||
      ssoProfile?.mobile || ssoProfile?.mobileNo || ssoProfile?.MOBILE;

    const cleanMobile = rawMobile ? String(rawMobile).trim().replace(/\D/g, "") : "";

    const isNullOrEmpty = !cleanMobile || cleanMobile.trim() === "" || cleanMobile === "null" || cleanMobile === "undefined";
    const isZero = cleanMobile === "0";
    const startsWithZero = cleanMobile.startsWith("0");
    const firstThreeDigitsZero = cleanMobile.substring(0, 3) === "000" || cleanMobile.substring(0, 3) === "0" || parseInt(cleanMobile.substring(0, 3), 10) === 0;

    const isMobileValid = !isNullOrEmpty && !isZero && !startsWithZero && !firstThreeDigitsZero && cleanMobile.length >= 10;

    const resolvedService = getServiceObj(decryptedData?.SERVICEID || serviceId);
    setActiveService(resolvedService);
    setAutoCheckDone(true);

    const startsWithThreeZeros = cleanMobile.substring(0, 3) === "000";

    if (cleanMobile === "" || startsWithThreeZeros) {
      setVerifiedUserMobile("");
      setShowVerifyModal(true);
    } else if (isMobileValid) {
      checkUserInDatabase(cleanMobile, resolvedService);
    } else {
      setVerifiedUserMobile(cleanMobile);
      setShowNotRegisteredModal(true);
    }
  }, [serverResult, serviceId, autoCheckDone, checkUserInDatabase]);

  const hasError = Boolean(serverResult?.error);

  if (!callbackParams?.encData) {
    return (
      <div className="rounded-2xl border border-[#EEEEEE] bg-white p-6 shadow-card relative overflow-hidden text-center max-w-sm mx-auto">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-career-purple to-career-purple-dark" />
        <HelpCircle className="mx-auto h-12 w-12 text-[#BDBDBD] mt-2" />
        <h3 className="mt-3 text-[16px] font-bold text-[#212121]">No Kiosk Session Found</h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#757575] max-w-xs mx-auto">
          Please initiate this transaction directly from your E-Mitra kiosk portal.
        </p>
      </div>
    );
  }

  if (refreshResponse) {
    console.log("eMitra Token Refresh Response Details:", refreshResponse);
  }

  let view = "LOADING";
  if (hasError) {
    view = "ERROR";
  } else if (!autoCheckDone) {
    view = "LOADING";
  } else if (showStep2Modal) {
    view = "STEP2";
  } else if (showNotRegisteredModal) {
    view = "NOT_REGISTERED";
  } else if (showVerifyModal) {
    view = "VERIFY";
  }

  return (
    <div className={`w-full mx-auto transition-all duration-300 ${view === "STEP2" ? "max-w-xl" : "max-w-sm"}`}>
      {/* Outer Card wrapper for views other than STEP2 */}
      {view !== "STEP2" ? (
        <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 md:p-6 shadow-card relative overflow-hidden">
          {/* Subtle colored accent top border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-career-purple to-career-purple-dark" />

          {/* Render Loading View */}
          {view === "LOADING" && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-career-lavender text-career-purple mb-4 shadow-sm">
                <ShieldCheck className="h-8 w-8 animate-bounce" />
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-career-purple opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-career-purple"></span>
                </span>
              </div>
              <h2 className="text-[17px] font-bold text-[#212121]">Verifying Session</h2>
              <p className="mt-1 text-[12px] text-[#757575] max-w-xs">
                Please wait while we securely decrypt your E-Mitra kiosk session.
              </p>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-career-purple bg-career-lavender/50 px-3.5 py-1 rounded-full">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying SSO Token...
              </div>
            </div>
          )}

          {/* Render Verify View (Enter phone inline) */}
          {view === "VERIFY" && activeService && (
            <div className="animate-fade-in space-y-4">
              <div className="border-b border-[#F0F0F0] pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-career-purple bg-career-lavender rounded-full mb-1">
                      Link Transaction
                    </span>
                    <h2 className="text-[17px] font-bold text-[#212121]">
                      {activeService.title}
                    </h2>
                  </div>
                  <div className="shrink-0 rounded-xl border border-career-purple/10 bg-career-lavender/30 px-3 py-1 text-right">
                    <p className="text-[18px] font-bold text-[#212121]">
                      ₹{activeService.price}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-career-purple/10 bg-career-lavender/10 p-3">
                  <p className="text-[11.5px] font-bold text-career-purple mb-1.5">Included Benefits</p>
                  <div className="space-y-1.5">
                    {(activeService.type === "scholarship" ? SCHOLARSHIP_FEATURES : COUNSELLING_FEATURES).map((row, rowIdx) => (
                      <div key={rowIdx} className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {row.map((item) => (
                          <div key={item} className="flex items-center gap-1.5">
                            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32]">
                              <Check className="h-2 w-2" strokeWidth={3} />
                            </span>
                            <p className="text-[11px] leading-snug text-[#424242]">{item}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#424242] block mb-1.5">
                    विद्यार्थी का Career Rocket एप पर पंजीकृत मोबाइल नंबर दर्ज करें:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[13px] font-semibold border-r pr-2 border-gray-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileInput}
                      onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Student Mobile Number"
                      maxLength={10}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 py-2.5 text-[13.5px] text-[#212121] placeholder:text-[#BDBDBD] focus:border-career-purple focus:outline-none focus:ring-2 focus:ring-career-purple/20 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end border-t border-[#F0F0F0] pt-4">
                <button
                  type="button"
                  onClick={() => checkUserInDatabase(mobileInput, activeService)}
                  disabled={isLoadingStep2 || mobileInput.length < 10}
                  className="flex items-center gap-1 rounded-xl bg-career-purple px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-career-purple-dark disabled:opacity-50 shadow-sm"
                >
                  {isLoadingStep2 ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Linking...
                    </>
                  ) : (
                    <>
                      Verify & Proceed
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Render Not Registered View */}
          {view === "NOT_REGISTERED" && (
            <div className="flex flex-col items-center py-4 text-center animate-fade-in space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 border border-orange-100 shadow-sm">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-[16px] font-bold text-[#212121]">
                Number Not Registered
              </h3>
              <p className="text-[13px] font-bold text-career-purple bg-career-lavender px-3 py-0.5 rounded-full">
                +91 {verifiedUserMobile}
              </p>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-left w-full">
                <p className="text-[11.5px] leading-relaxed text-[#616161]">
                  यह मोबाइल नंबर Career Rocket एप पर अभी रजिस्टर्ड नहीं है। कृपया Career
                  Rocket एप को प्ले स्टोर से इंस्टॉल कर के अपना अकाउंट बनाएं।
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotRegisteredModal(false);
                    setShowVerifyModal(true);
                  }}
                  className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-[12.5px] font-semibold text-[#616161] transition hover:bg-gray-50"
                >
                  Change Number
                </button>

                <a
                  href={`/verify?mobile=${encodeURIComponent(verifiedUserMobile || "")}`}
                  className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-career-purple py-2.5 text-[12.5px] font-semibold text-white transition hover:bg-career-purple-dark shadow-sm"
                >
                  Create Account
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Render Error View */}
          {view === "ERROR" && (
            <div className="flex flex-col items-center justify-center py-4 text-center animate-fade-in space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 border border-red-100 shadow-sm">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-[16px] font-bold text-red-800">
                Session Decryption Error
              </h3>
              <p className="text-[11.5px] leading-relaxed text-[#757575] max-w-xs mx-auto">
                We encountered an issue verifying the secure session with E-Mitra.
              </p>
              {serverResult?.error && (
                <p className="font-mono text-[9px] text-red-600 bg-red-50 px-2 py-1 rounded max-w-xs overflow-x-auto">
                  {serverResult.error}
                </p>
              )}
            </div>
          )}

          {/* SSL Secure Footer for intermediate views */}
          <div className="mt-6 text-center text-[10.5px] text-[#9E9E9E] border-t border-[#F5F5F5] pt-4">
            <p className="font-medium text-gray-400">Secure SSL Encrypted Connection</p>
            <p className="mt-0.5">Support Helpdesk: 7301023501</p>
          </div>
        </div>
      ) : (
        /* Render Step 2 payment checkout inline inside compact card container */
        <div className="rounded-2xl border border-[#EEEEEE] bg-white p-3 md:p-5 shadow-card relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-career-purple to-career-purple-dark" />
          {isLoadingStep2 ? (
            <div className="min-h-[180px] flex flex-col items-center justify-center p-6 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-career-purple mb-2.5" />
              <p className="text-[13px] font-medium text-[#757575]">Loading student details...</p>
            </div>
          ) : step2ModalType === "scholarship" ? (
            <Step2DetailsPage compact />
          ) : (
            <Step2CounsellingPage compact />
          )}
        </div>
      )}
    </div>
  );
}
