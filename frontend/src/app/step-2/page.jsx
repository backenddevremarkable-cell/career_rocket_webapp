"use client";


import { useRouter } from "next/navigation";
import { ArrowRight, Lock, GraduationCap } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import FormCard from "@/components/FormCard";
import PaymentConfirmModal from "@/components/PaymentConfirmModal";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import { useEffect, useState } from "react";
import { getVerifiedUser, saveVerifiedUser } from "@/lib/session";
import { processPayment, callEmitraBackToBackTransaction, updateEmitraApplicationId } from "@/lib/api";


export default function Step2DetailsPage({ compact = false }) {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [paying, setPaying] = useState(false);
  const closePaymentSuccess = () => setShowPaymentSuccess(false);

  const course = { id: "scholarship", name: "Scholarship Test", price: 99 };

  const openPaymentConfirm = () => {
    const currentMobile = student?.mobile || student?.mobileNo || student?.MOBILE;
    if (student?.emitraSSOID && (!currentMobile || currentMobile.trim().length < 10)) {
      alert("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें");
      return;
    }
    setShowPaymentConfirm(true);
  };
  const closePaymentConfirm = () => setShowPaymentConfirm(false);

  const handlePayNow = async () => {
    if (!student) return;
    const currentMobile = student.mobile || student.mobileNo || student.MOBILE;
    if (student.emitraSSOID && (!currentMobile || currentMobile.trim().length < 10)) {
      alert("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें");
      return;
    }
    setPaying(true);
    try {
      // Unconditionally call back-to-back transaction as requested
      const ssoId = student.emitraSSOID || "SSOTESTKIOSK";
      const ssoToken = student.emitraSSOTOKEN || "158442";
      
      const response = await callEmitraBackToBackTransaction({
        SERVICEID: "14112",
        CONSUMERKEY: currentMobile,
        CONSUMERNAME: student.name || student.KIOSKNAM || "Test User",
        SSOID: ssoId,
        SSOTOKEN: ssoToken
      });
      const emitraData = response?.data?.data ?? response?.data ?? response;

      // If the transaction is successful, generate and update the Application ID
      const statusCode = emitraData?.TRANSACTIONSTATUSCODE || emitraData?.transactionStatusCode;
      const receiptNo = emitraData?.RECEIPTNO || emitraData?.receiptNo;
      const isSuccess = emitraData && String(statusCode) === "200" && receiptNo && String(receiptNo) !== "0";

      if (isSuccess) {
        const applicationId = "CRAPP" + Date.now() + Math.floor(Math.random() * 1000);
        emitraData.applicationId = applicationId;

        try {
          await updateEmitraApplicationId({
            MERCHANTCODE: emitraData.MERCHANTCODE || "REMARKEDU24",
            REQUESTID: emitraData.REQUESTID || currentMobile,
            TRANSACTIONID: emitraData.TRANSACTIONID || emitraData.receiptNo || "0",
            APPLICATIONID: applicationId
          });
        } catch (updateErr) {
          console.error("Failed to update application ID with eMitra:", updateErr);
        }
      }

      setTransactionDetails(emitraData);
      setShowPaymentConfirm(false);
      setShowPaymentSuccess(true);
    } catch (err) {
      console.error("Payment failed", err);
      if (student.emitraSSOID) {
        setTransactionDetails({
          status: "FAILED",
          error: err.message || "E-Mitra Back-to-Back Transaction API failed.",
          rawError: err.toString()
        });
        setShowPaymentConfirm(false);
        setShowPaymentSuccess(true);
      } else {
        alert("Payment failed. Please try again.");
      }
    } finally {
      setPaying(false);
    }
  };

  useEffect(() => {
    const u = getVerifiedUser();

    if (!u) {
      router.replace("/");
      return;
    }

    setStudent(u);
    if (u.emitraSSOID && !(u.mobile || u.mobileNo || u.MOBILE)) {
      setIsMobileEditable(true);
    }
  }, [router]);

  const pageContent = (
    <FormCard title="Student Details" >
      <div className="flex items-center justify-between rounded-lg border border-career-purple/30 bg-career-lavender px-3.5 py-3">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="h-5 w-5 text-career-purple" />
          <div>
            <p className="text-[10px] text-[#9E9E9E]">Selected Service</p>
            <p className="text-[14px] font-bold text-career-purple">
              Scholarship Test
            </p>
          </div>
        </div>
        <Lock className="h-4 w-4 text-[#9E9E9E]" />
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-[#757575]">
            Full Name
          </label>
          <input
            type="text"
            value={student?.name || ""}
            readOnly
            className="mt-1.5 w-full rounded-lg border border-[#E0E0E0] px-4 py-3 text-[14px] text-[#212121] placeholder:text-[#BDBDBD] focus:border-career-purple focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[13px] font-medium text-[#757575]">
            Mobile Number
          </label>
          <input
            type="tel"
            value={student?.mobile || student?.mobileNo || student?.MOBILE || ""}
            readOnly={!isMobileEditable}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              const updatedStudent = {
                ...student,
                mobile: val,
                mobileNo: val,
                MOBILE: val,
              };
              setStudent(updatedStudent);
              saveVerifiedUser(updatedStudent);
            }}
            placeholder="Enter mobile number"
            className={`mt-1.5 w-full rounded-lg border border-[#E0E0E0] px-4 py-3 text-[14px] text-[#212121] placeholder:text-[#BDBDBD] focus:border-career-purple focus:outline-none ${isMobileEditable ? "bg-white" : "bg-[#FAFAFA]"
              }`}
          />
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#757575]">
            Email ID
          </label>
          <input
            type="email"
            value={student?.mail || ""}
            readOnly

            className="mt-1.5 w-full rounded-lg border border-[#E0E0E0] px-4 py-3 text-[14px] text-[#212121] placeholder:text-[#BDBDBD] focus:border-career-purple focus:outline-none"
          />
        </div>




        <div className="flex justify-end">
          <button
            type="button"
            onClick={openPaymentConfirm}
            className="flex items-center justify-center gap-1 rounded-xl bg-career-purple px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-career-purple-dark"
          >
            Proceed to Pay
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>


      </div>
    </FormCard>
  );

  if (compact) {
    return (
      <>
        <div >{pageContent}</div>
        {showPaymentConfirm && (
          <PaymentConfirmModal
            user={student}
            course={course}
            onPay={handlePayNow}
            onClose={closePaymentConfirm}
            paying={paying}
          />
        )}
        {showPaymentSuccess && (
          <PaymentSuccessModal onClose={closePaymentSuccess} transactionDetails={transactionDetails} user={student} />
        )}
      </>
    );
  }

  return (
    <>
      <PortalLayout activeStep={2}>{pageContent}</PortalLayout>
      {showPaymentConfirm && (
        <PaymentConfirmModal
          user={student}
          course={course}
          onPay={handlePayNow}
          onClose={closePaymentConfirm}
          paying={paying}
        />
      )}
      {showPaymentSuccess && (
        <PaymentSuccessModal onClose={closePaymentSuccess} transactionDetails={transactionDetails} user={student} />
      )}
    </>
  );
}
