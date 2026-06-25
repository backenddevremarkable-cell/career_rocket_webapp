"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, ArrowRight } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import FormCard from "@/components/FormCard";
import CounsellingSelect from "@/components/CounsellingSelect";
import PaymentConfirmModal from "@/components/PaymentConfirmModal";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import { getVerifiedUser, saveVerifiedUser, getCounsellingContext, saveCounsellingContext } from "@/lib/session";
import { processPayment, callEmitraBackToBackTransaction, updateEmitraApplicationId } from "@/lib/api";
import {
  fetchCounsellingLookups,
  fetchCitiesForDivision,
  fetchBlocksForCity,
  divisionOptionLabel,
  cityOptionLabel,
  blockOptionLabel,
  divisionOptionValue,
  cityOptionValue,
  blockOptionValue,
} from "@/lib/counsellingLookups";

export default function Step2CounsellingPage({ compact = false }) {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [session, setSession] = useState({});

  const [divisionId, setDivisionId] = useState("");
  const [divisionCityId, setDivisionCityId] = useState("");
  const [blockId, setBlockId] = useState("");
  const [address, setAddress] = useState("");
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [paying, setPaying] = useState(false);

  const course = { id: "counselling", name: "Career Counselling", price: 999 };
  const closePaymentSuccess = () => setShowPaymentSuccess(false);

  const openPaymentConfirm = () => {
    const currentMobile = student?.mobile || student?.mobileNo || student?.MOBILE;
    if (student?.emitraSSOID && (!currentMobile || currentMobile.trim().length < 10)) {
      alert("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें");
      return;
    }
    if (!divisionId || !divisionCityId || !blockId || !address.trim()) {
      alert("कृपया सभी आवश्यक फ़ील्ड (Division, City, Block, Address) भरें");
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
        SERVICEID: "14111",
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
      setTransactionDetails({
        status: "FAILED",
        error: err.message || "E-Mitra Back-to-Back Transaction API failed.",
        rawError: err.toString()
      });
      setShowPaymentConfirm(false);
      setShowPaymentSuccess(true);
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

    const load = async () => {
      setLoading(true);
      try {
        let ctx = getCounsellingContext();
        if (ctx?.session) {
          ctx = await fetchCounsellingLookups(ctx.session, u.token, u);
          saveCounsellingContext(ctx);
        }

        setSession(ctx?.session || {});
        setDivisions(ctx?.divisions || []);
        setCities(ctx?.cities || []);
        setBlocks(ctx?.blocks || []);
        setDivisionId(String(ctx?.session?.divisionId ?? ""));
        setDivisionCityId(String(ctx?.session?.divisionCityId ?? ""));
        setBlockId(String(ctx?.session?.blockId ?? ""));
        setAddress(ctx?.session?.address || "");
      } catch {
        setDivisions([]);
        setCities([]);
        setBlocks([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleDivisionChange = async (newDivisionId) => {
    setDivisionId(newDivisionId);
    setDivisionCityId("");
    setBlockId("");
    setBlocks([]);
    if (!newDivisionId) {
      setCities([]);
      return;
    }
    try {
      const list = await fetchCitiesForDivision(newDivisionId, student?.token);
      setCities(list);
    } catch {
      setCities([]);
    }
  };

  const handleCityChange = async (newCityRecordId) => {
    setDivisionCityId(newCityRecordId);
    setBlockId("");
    if (!newCityRecordId) {
      setBlocks([]);
      return;
    }
    try {
      const list = await fetchBlocksForCity(cities, newCityRecordId, student?.token);
      setBlocks(list);
    } catch {
      setBlocks([]);
    }
  };

  const pageContent = (
    <FormCard title="Career Counselling Details"  >
      <div className="flex items-center justify-between rounded-xl border border-career-purple/30 bg-career-lavender px-3.5 py-3">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="h-5 w-5 text-career-purple" />
          <div>
            <p className="text-[10px] text-[#9E9E9E]">Selected Service</p>
            <p className="text-[14px] font-bold text-career-purple">
              Career Counselling
            </p>
          </div>
        </div>
        <Lock className="h-4 w-4 text-[#9E9E9E]" />
      </div>

      {loading ? (
        <p className="mt-2 text-center text-[12px] text-[#757575]">
          Loading division details...
        </p>
      ) : (
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-[13px] font-medium text-[#757575]">
              Student Name
            </label>
            <input
              type="text"
              readOnly
              value={student?.name || ""}
              className="mt-1.5 w-full rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] px-3 py-2.5 text-[14px] text-[#212121]"
            />
          </div>
          <div>
            <label className="text-[13px] font-medium text-[#757575]">
              Contact Number
            </label>
            <input
              type="tel"
              readOnly={!isMobileEditable}
              value={
                student?.mobile ||
                student?.mobileNo ||
                session?.mobileNo ||
                ""
              }
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
              placeholder="Enter contact number"
              className={`mt-1.5 w-full rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-[14px] text-[#212121] focus:border-career-purple focus:outline-none ${isMobileEditable ? "bg-white" : "bg-[#FAFAFA]"
                }`}
            />
          </div>

          <CounsellingSelect
            label="Division"
            value={divisionId}
            onChange={handleDivisionChange}
            placeholder="Select Division"
            options={divisions}
            getValue={divisionOptionValue}
            getLabel={divisionOptionLabel}
          />

          <CounsellingSelect
            label="Division City"
            value={divisionCityId}
            onChange={handleCityChange}
            placeholder="Select Division City"
            options={cities}
            getValue={cityOptionValue}
            getLabel={cityOptionLabel}
          />

          <div className="sm:col-span-2">
            <CounsellingSelect
              label="Block / Landmark"
              value={blockId}
              onChange={setBlockId}
              placeholder="Select Block"
              options={blocks}
              getValue={blockOptionValue}
              getLabel={blockOptionLabel}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[13px] font-medium text-[#757575]">
              Complete Address
            </label>
            <textarea
              rows={compact ? 2 : 3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full residential address"
              className="mt-1.5 w-full resize-none rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-[14px] placeholder:text-[#BDBDBD] focus:border-career-purple focus:outline-none"
            />
          </div>
        </div>
      )}


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
