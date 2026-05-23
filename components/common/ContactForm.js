"use client";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { User, Mail, Phone, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ERROR_MSG, SUCCESS_MSG } from "@/utils";
import { contactUs } from "@/services/publicService";
import SubmitButton from "../../components/common/SubmitButton";
import { Tooltip } from "react-tooltip";
import { useDataStore } from "@/store/useDataStore";
import "react-tooltip/dist/react-tooltip.css";
import { FaTimes } from "react-icons/fa";

export default function ContactForm() {

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setCounselorPopup } = useDataStore((state) => state);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    let errorMsg = "";

    if (name === "firstName" && !value) {
      errorMsg = "First Required";
    }

    if (name === "email") {
      if (!value) errorMsg = "Email Required";
      else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Invalid email";
    }

    if (name === "phone" && !value) {
      errorMsg = "Phone no Required";
    }

    if (name === "message" && !value) {
      errorMsg = "Message Required";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!form.firstName) newErrors.firstName = "First Required";
    if (!form.email) {
      newErrors.email = "Email Required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.phone) newErrors.phone = "Phone no Required";
    if (!form.message) newErrors.message = "Message Required";

    return newErrors;
  };

  // Submitp
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setLoading(true);
        //LOGIN_OTP
        const payload = {
          name: `${form?.firstName} ${form?.lastName}`,
          mobileNo: form?.phone,
          email: form?.email,
          message: form?.message
        };

        const res = await contactUs(payload);
        const { data } = res
        e.target.reset();
        setForm(initialState);
        SUCCESS_MSG(res?.message);
      }
    } catch (error) {
      ERROR_MSG(error?.response?.data?.message || error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-4">
      {/* Popup Box */}
      <div className="relative w-full max-w-2xl rounded-[12px] bg-white border border-slate-200/80 shadow-2xl overflow-hidden animate-popup flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setCounselorPopup(false)}
          className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FaTimes className="text-base" />
        </button>

        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-purple-50/10">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 pr-10">
            Talk to a Counselor
          </h2>

          <p className="mt-1.5 text-sm text-slate-500">
            Fill out the form and our team will contact you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="max-h-[75vh] overflow-y-auto px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First + Last Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-xs font-bold tracking-wider text-slate-700 uppercase mb-2 flex items-center gap-1">
                  First Name <span className="text-rose-500 font-bold">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors pointer-events-none">
                    <User size={18} className="stroke-[2.2]" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    placeholder="First name"
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:border-slate-350 transition-all duration-200"
                  />
                </div>
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-xs font-semibold mt-1 text-left flex items-center gap-1"
                  >
                    <AlertCircle size={13} className="stroke-[2.5]" />
                    {errors.firstName}
                  </motion.p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-xs font-bold tracking-wider text-slate-700 uppercase mb-2">
                  Last Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors pointer-events-none">
                    <User size={18} className="stroke-[2.2]" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    placeholder="Last name"
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:border-slate-350 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs font-bold tracking-wider text-slate-700 uppercase mb-2 flex items-center gap-1">
                Email Address <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors pointer-events-none">
                  <Mail size={18} className="stroke-[2.2]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:border-slate-350 transition-all duration-200"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-xs font-semibold mt-1 text-left flex items-center gap-1"
                >
                  <AlertCircle size={13} className="stroke-[2.5]" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xs font-bold tracking-wider text-slate-700 uppercase mb-2 flex items-center gap-1">
                Phone Number <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors pointer-events-none">
                  <Phone size={18} className="stroke-[2.2]" />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  placeholder="Phone Number"
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:border-slate-350 transition-all duration-200"
                />
              </div>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-xs font-semibold mt-1 text-left flex items-center gap-1"
                >
                  <AlertCircle size={13} className="stroke-[2.5]" />
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label htmlFor="message" className="text-xs font-bold tracking-wider text-slate-700 uppercase mb-2 flex items-center gap-2">
                <span>Message <span className="text-rose-500 font-bold">*</span></span>
                <FiInfo
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Maximum 500 characters allowed!"
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                />
                <Tooltip id="my-tooltip" />
              </label>
              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  placeholder="Leave us a message..."
                  onChange={handleChange}
                  maxLength={500}
                  className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:border-slate-350 transition-all duration-200 h-32 resize-none"
                />
              </div>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-xs font-semibold mt-1 text-left flex items-center gap-1"
                >
                  <AlertCircle size={13} className="stroke-[2.5]" />
                  {errors.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <SubmitButton loading={loading} text={'Send Message'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}