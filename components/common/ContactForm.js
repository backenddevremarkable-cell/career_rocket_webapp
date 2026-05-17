"use client";
import { useState } from "react";
import { FiInfo  } from "react-icons/fi";
import { ERROR_MSG, SUCCESS_MSG } from "@/utils";
import { contactUs } from "@/services/publicService";
import SubmitButton from "../../components/common/SubmitButton";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
  const [active, setActive] = useState("jodhpur");
  

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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First + Last */}
            <div className="grid grid-cols-2 gap-4">
              <div className="my-form">
                <label for="firstName">First name <span>*</span></label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-contact"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm text-left">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="my-form">
                <label for="lastName">Last name </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-contact"
                />
              </div>
            </div>

            {/* Email */}
            <div className="my-form">
              <label for="Email">Email Id <span>*</span></label>
              <input
                type="email"
                name="email"
                placeholder="student@example.com"
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-contact"
              />
              {errors.email && (
                <p className="text-red-500 text-sm text-left">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="my-form">
              <label for="phone">Phone Number <span>*</span></label>
              <input
                type="number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                maxLength={10}
                inputMode="numeric"
                className="w-full border p-2 rounded bg-gray-contact"
            />
              {errors.phone && (
                <p className="text-red-500 text-sm text-left">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="my-form">
              <label for="message">Message <span>*</span>
             <FiInfo
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Maximum 500 words allow!"
                className="inline-block"
              />
              <Tooltip id="my-tooltip" />
            </label>
              <textarea
                name="message"
                placeholder="Leave us a message..."
                onChange={handleChange}
                maxLength={500}
                className="w-full p-2 rounded h-28 bg-gray-contact"
              />
              {errors.message && (
                <p className="text-red-500 text-sm text-left">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Button */}
            <SubmitButton loading={loading} text={'Send Message'} />
          </form>
    );
    }