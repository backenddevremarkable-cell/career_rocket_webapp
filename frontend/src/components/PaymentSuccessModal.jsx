"use client";

import { useState, useEffect } from "react";
import { Check, Download, Phone } from "lucide-react";

const STATUS_CODE_MAPPING = {
  "200": "Success (सफलता)",
  "300": "System Failure (सिस्टम विफलता)",
  "301": "Invalid Merchant Code (अमान्य मर्चेंट कोड)",
  "302": "Invalid Service ID (अमान्य सेवा आईडी)",
  "303": "Invalid Office Code (अमान्य कार्यालय कोड)",
  "304": "Commission Mismatch (कमीशन विसंगति)",
  "305": "Invalid SSOID or SSO Token (अमान्य SSOID या SSO टोकन)"
};

function getEmitraRedirectUrl(returnUrl, transactionDetails) {
  if (!returnUrl) return "";
  let url = String(returnUrl);
  const params = new URLSearchParams();
  if (transactionDetails) {
    Object.entries(transactionDetails).forEach(([key, val]) => {
      if (val !== null && typeof val !== "object" && typeof val !== "function") {
        params.set(key, String(val));
      }
    });
  }
  const paramsStr = params.toString();
  if (!paramsStr) return url;

  if (url.endsWith("&") || url.endsWith("?")) {
    return url + paramsStr;
  } else if (url.includes("?")) {
    return url + "&" + paramsStr;
  } else {
    return url + "?" + paramsStr;
  }
}

export default function PaymentSuccessModal({ onClose, transactionDetails, user }) {
  const statusCode = transactionDetails?.TRANSACTIONSTATUSCODE || transactionDetails?.transactionStatusCode;
  const receiptNo = transactionDetails?.RECEIPTNO || transactionDetails?.receiptNo || transactionDetails?.receiptNumber;
  const transactionId = transactionDetails?.TRANSACTIONID || transactionDetails?.transactionId;

  const isFailed = transactionDetails?.error ||
    transactionDetails?.status === "FAILED" ||
    transactionDetails?.statusCode === 500 ||
    transactionDetails?.status === 500 ||
    (statusCode && String(statusCode) !== "200") ||
    (receiptNo && String(receiptNo) === "0") ||
    (transactionId && String(transactionId) === "0") ||
    (transactionDetails?.statusMessage && transactionDetails?.statusMessage !== "Success");

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (user?.emitraSSOID && user?.emitraReturnUrl && !isFailed) {
      if (countdown <= 0) {
        window.location.href = getEmitraRedirectUrl(user.emitraReturnUrl, transactionDetails);
        return;
      }
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, user, isFailed, transactionDetails]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[460px] rounded-2xl bg-white px-8 py-8 shadow-modal max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center">
          <div className="relative">
            <div className={`absolute inset-0 scale-150 rounded-full opacity-60 ${isFailed ? "bg-red-100" : "bg-career-lavender"}`} />
            <div className={`relative flex h-16 w-16 items-center justify-center rounded-full ${isFailed ? "bg-red-500" : "bg-career-purple"}`}>
              {isFailed ? (
                <span className="text-white text-2xl font-bold">!</span>
              ) : (
                <Check className="h-8 w-8 text-white" strokeWidth={3} />
              )}
            </div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-[22px] font-bold text-[#212121]">
          {isFailed ? "Transaction Result" : "Payment Successful"}
        </h2>
        <p className="mt-4 text-center text-[14px] leading-relaxed text-[#616161]">
          {isFailed
            ? "भुगतान पूरा नहीं हो सका। कृपया पुनः प्रयास करें या अपने ई-मित्र वॉलेट बैलेंस की जाँच करें। (Payment could not be completed. Please try again.)"
            : "आपका पेमेंट सफलतापूर्वक मिल गया है । हमारा एक्सपर्ट कैरियर काउंसलर 24 घंटे के अंदर आपसे संपर्क करेगा और आगे की पूरी जानकारी देगा ।"}
        </p>
        {user?.emitraSSOID && !isFailed && (
          <p className="mt-2 text-center text-[12px] font-semibold text-career-purple animate-pulse">
            Redirecting to e-Mitra in {countdown} seconds...
          </p>
        )}

        {transactionDetails && (() => {
          console.log("💳 [E-Mitra Transaction Details]:", transactionDetails);

          const amount = transactionDetails.TRANSACTIONAMOUNT || transactionDetails.transactionAmount || transactionDetails.amount;
          const requestId = transactionDetails.REQUESTID || transactionDetails.requestId;
          const errorMessage = transactionDetails.error || transactionDetails.statusMessage || transactionDetails.message;

          if (isFailed) {
            return (
              <div className="mt-5 rounded-xl border border-red-100 bg-red-50/50 p-4 text-[13px] text-red-700 text-left">
                <p className="font-bold text-red-800 mb-1.5">Transaction Failed Details / विफलता विवरण:</p>
                <div className="space-y-1.5 text-[12px]">
                  {statusCode && (
                    <p>
                      <span className="font-medium text-red-900">Status Code:</span> {statusCode} ({STATUS_CODE_MAPPING[statusCode] || "Unknown Error"})
                    </p>
                  )}
                  {requestId && <p><span className="font-medium text-red-900">Request ID:</span> {requestId}</p>}
                  <p><span className="font-medium text-red-900">Error:</span> {errorMessage || "Payment declined or insufficient merchant wallet balance."}</p>
                </div>
              </div>
            );
          }

          return (
            <div className="mt-5 rounded-xl border border-career-purple/10 bg-career-lavender-light p-4 text-[13px] text-[#424242] text-left">
              <p className="font-bold text-career-purple mb-3 text-[14px] border-b border-career-purple/10 pb-1.5">Receipt Details / रसीद विवरण</p>
              <div className="space-y-2 text-[12px]">
                {statusCode && (
                  <div className="flex justify-between">
                    <span className="text-[#757575]">Status:</span>
                    <span className="font-semibold text-career-purple">{statusCode} - {STATUS_CODE_MAPPING[statusCode]}</span>
                  </div>
                )}
                {receiptNo && (
                  <div className="flex justify-between">
                    <span className="text-[#757575]">Receipt Number:</span>
                    <span className="font-semibold text-[#212121]">{receiptNo}</span>
                  </div>
                )}
                {transactionId && (
                  <div className="flex justify-between">
                    <span className="text-[#757575]">Transaction ID:</span>
                    <span className="font-semibold text-[#212121]">{transactionId}</span>
                  </div>
                )}
                {requestId && (
                  <div className="flex justify-between">
                    <span className="text-[#757575]">Request ID:</span>
                    <span className="font-semibold text-[#212121]">{requestId}</span>
                  </div>
                )}
                {(() => {
                  const appIdVal = transactionDetails?.applicationId || transactionDetails?.APPLICATIONID;
                  return appIdVal && (
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Application ID:</span>
                      <span className="font-semibold text-[#212121]">{appIdVal}</span>
                    </div>
                  );
                })()}
                {amount && (
                  <div className="flex justify-between border-t border-dashed border-[#E0E0E0] pt-2 mt-1">
                    <span className="text-[#757575]">Amount:</span>
                    <span className="font-bold text-career-purple">₹{amount}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-career-lavender px-4 py-3">
          <Phone className="h-4 w-4 text-career-purple" />
          <p className="text-[13px] font-medium text-career-purple">
            अधिक जानकारी के लिए कॉल करें: 7301023501
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (user?.emitraSSOID && user?.emitraReturnUrl) {
              window.location.href = getEmitraRedirectUrl(user.emitraReturnUrl, transactionDetails);
            } else {
              onClose();
            }
          }}
          className="mt-6 w-full rounded-xl bg-career-purple py-3.5 text-[15px] font-semibold text-white transition hover:bg-career-purple-dark"
        >
          {user?.emitraSSOID ? "Return to e-Mitra" : "Done"}
        </button>
        {!user?.emitraSSOID && (
          <button
            type="button"
            className="mt-3 w-full rounded-xl border-2 border-career-purple bg-white py-3.5 text-[15px] font-semibold text-career-purple transition hover:bg-career-lavender"
          >
            Go to Dashboard
          </button>
        )}
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 text-[13px] text-[#757575] transition hover:text-[#424242]"
        >
          <Download className="h-4 w-4" />
          Download Receipt
        </button>
      </div>
    </div>
  );
}
