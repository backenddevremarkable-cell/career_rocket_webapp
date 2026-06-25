"use client";
import { useState } from "react";
 
import { GraduationCap, Award, ArrowRight, IndianRupee } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import ServiceVerifyModal from "@/components/ServiceVerifyModal";
import NotRegisteredModal from "@/components/NotRegisteredModal";
import Step2Modal from "@/components/Step2Modal";
import Step2DetailsPage from "@/app/step-2/page";
import Step2CounsellingPage from "@/app/step-2/counselling/page";
import { saveVerifiedUser } from "@/lib/session";
import { createCounsellingSession } from "@/lib/api";
import { saveCounsellingContext } from "@/lib/session";
import {
  fetchCounsellingLookups,
  unwrapCounsellingSession,
} from "@/lib/counsellingLookups";

const services = [
  {
    id: "counselling",
    type: "counselling",
    title: "Career Counseling",
    description:
      "One-on-one expert guidance to plan your career path and academic choices.",
    icon: GraduationCap,
    price: 999,
    delay: "animate-fade-in-up",
  },
  {
    id: "scholarship",
    type: "scholarship",
    title: "Scholarship Test",
    description:
      "Register for merit-based scholarship tests and national entrance programs.",
    icon: Award,
    price: 99,
    delay: "animate-fade-in-up-delay",
  },
];

export default function HomePage() {
  
  const [activeService, setActiveService] = useState(null);
  const [notRegisteredMobile, setNotRegisteredMobile] = useState(null);
  const [showStep2Modal, setShowStep2Modal] = useState(false);
  const [step2ModalType, setStep2ModalType] = useState(null);
  const [isLoadingStep2, setIsLoadingStep2] = useState(false);
  // const [decryptResponse, setDecryptResponse] = useState(null);
  // const [decryptError, setDecryptError] = useState(null);
  const handleCardClick = (service) => {
    setActiveService(service);
    setNotRegisteredMobile(null);
  };

  // useEffect(() => {
  //   // async function decryptSample() {
  //     async function decryptCallbackEncData() {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     const encData = searchParams.get("encData");

  //     if (!encData) return;
  //     try {
  //       // const sampleEnc = "WnHHVZLdxgpu1SMXxcPH0pUjVZynS+/Hbxa+YhCOtbaGpmWQJig9FLgsEBwApraO";
  //       // const result = await decryptEmitraEncData(sampleEnc);
  //       setDecryptError(null);
  //       const result = await decryptEmitraEncData(encData);
  //       console.log("decryptEncData response", result);
  //       setDecryptResponse(result?.data || result);
  //     } catch (error) {
  //       console.error("decryptEncData failed", error);
  //       setDecryptError(error.message || "decryptEncData failed");
  //     }
  //   }

  //   // decryptSample();
  //   decryptCallbackEncData();
  // }, []);

  const handleVerified = async (user) => {
    saveVerifiedUser(user);
    setActiveService(null);
    setNotRegisteredMobile(null);

    if (user.serviceType === "counselling") {
      setIsLoadingStep2(true);
      try {
        const sessionRaw = await createCounsellingSession(
          { mobileNo: user.mobile || user.mobileNo },
          user.token
        );
        const session = unwrapCounsellingSession(sessionRaw);
        const lookups = await fetchCounsellingLookups(session, user.token, user);

        saveCounsellingContext(lookups);
      } catch {
        saveCounsellingContext(null);
      } finally {
        setStep2ModalType("counselling");
        setShowStep2Modal(true);
        setIsLoadingStep2(false);
      }
      return;
    }

    setStep2ModalType("scholarship");
    setShowStep2Modal(true);
  };

  const handleNotRegistered = (mobile) => {
    setActiveService(null);
    setNotRegisteredMobile(mobile);
  };

  return (
    <AppLayout>
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-6 py-16">
        <div className="-mt-10 mb-12 text-center animate-fade-in-up">
          <h1 className="text-[36px] font-bold text-[#212121] lg:text-[44px]">
            Select a <span className="text-career-purple">Service</span>
          </h1>
          <p className="mt-3 text-[15px] text-[#9E9E9E]">
            Choose an option below to continue with E-Mitra services
          </p>
        </div>

        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-2 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleCardClick(service)}
                className={`service-card-pro group relative flex flex-col overflow-hidden rounded-2xl border border-[#EEE] bg-white p-0 text-left shadow-card ${service.delay}`}
              >
                <div className="h-1.5 w-full bg-career-purple" />

                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-career-lavender text-career-purple transition group-hover:bg-career-purple group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="rounded-xl bg-career-lavender px-3 py-1.5 text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-career-purple">
                        Fee
                      </p>
                      <p className="flex items-center justify-end gap-0.5 text-[26px] font-bold leading-none text-[#212121]">
                        <IndianRupee className="h-5 w-5 text-career-purple" />
                        {service.price}
                      </p>
                    </div>
                  </div>

                  <h2 className="mt-5 text-[20px] font-bold text-[#212121] lg:text-[22px]">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#757575]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-end border-t border-[#F0F0F0] pt-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-career-purple px-5 py-2.5 text-[13px] font-semibold text-white transition group-hover:bg-career-purple-dark group-hover:shadow-glow">
                      Continue
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* {decryptResponse && ( */}
      {/* {(decryptResponse || decryptError) && ( */}
        {/* <div className="mx-auto mb-6 w-full max-w-2xl rounded-2xl border border-dashed border-[#DDD] bg-[#FAFAFC] p-4 text-sm text-[#333]"> */}
          {/* <p className="mb-2 font-semibold text-[#111]">decryptEncData response (dev):</p>
          <pre className="whitespace-pre-wrap break-words text-[13px] text-[#444]">
            {JSON.stringify(decryptResponse, null, 2)}
          </pre> */}
          {/* <p className="mb-2 font-semibold text-[#111]">decryptEncData response:</p>
          {decryptError ? (
            <p className="text-[13px] text-red-600">{decryptError}</p>
          ) : (
            <pre className="whitespace-pre-wrap break-words text-[13px] text-[#444]">
              {JSON.stringify(decryptResponse, null, 2)}
            </pre>
          )}
        </div>
      )} */}

      {activeService && (
        <ServiceVerifyModal
          service={activeService}
          onClose={() => setActiveService(null)}
          onVerified={handleVerified}
          onNotRegistered={handleNotRegistered}
        />
      )}

      {showStep2Modal && (
        <Step2Modal onClose={() => setShowStep2Modal(false)}>
          {isLoadingStep2 ? (
            <div className="min-h-[180px] flex items-center justify-center p-8 text-[15px] font-medium text-[#757575]">
              Loading your details...
            </div>
          ) : step2ModalType === "scholarship" ? (
            <Step2DetailsPage compact />
          ) : (
            <Step2CounsellingPage compact />
          )}
        </Step2Modal>
      )}

      {notRegisteredMobile && (
        <NotRegisteredModal
          mobile={notRegisteredMobile}
          onClose={() => setNotRegisteredMobile(null)}
        />
      )}
    </AppLayout>
  );
}
