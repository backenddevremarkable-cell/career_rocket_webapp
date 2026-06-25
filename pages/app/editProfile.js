"use client";
import { withAuth } from '../../utils/withAuth';
import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  getCountries,
  getStates,
  getCities,
} from "@/services/authService";
import { ERROR_MSG, SUCCESS_MSG } from "@/utils";
import axios from "axios";
import { getFromStorage } from "@/utils/index";
import { useRouter } from "next/router";


const initialForm = {
  name: "",
  mail: "",
  stateId: "",
  cityId: "",
  countryId: "",
  educationLevel: "",
  stream: "",
  other: "",
  schoolId: "",
  referralCode: "",
  rewardPoints: "",
  profilePhoto: "",
};

function EditProfileForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [mobile, setMobile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const router = useRouter();

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mail.trim()) newErrors.mail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.mail))
      newErrors.mail = "Enter a valid email";

    if (!formData.countryId) newErrors.countryId = "Country is required";
    if (!formData.stateId) newErrors.stateId = "State is required";
    if (!formData.cityId) newErrors.cityId = "City is required";
    if (!formData.educationLevel)
      newErrors.educationLevel = "Education level is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // COUNTRY CHANGE
  // =========================
  const handleCountryChange = async (e) => {
    const countryId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      countryId,
      stateId: "",
      cityId: "",
    }));

    setErrors((prev) => ({
      ...prev,
      countryId: "",
      stateId: "",
      cityId: "",
    }));

    setStates([]);
    setCities([]);

    if (countryId) {
      await fetchStates(countryId);
    }
  };

  // =========================
  // STATE CHANGE
  // =========================
  const handleStateChange = async (e) => {
    const stateId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      stateId,
      cityId: "",
    }));

    setErrors((prev) => ({
      ...prev,
      stateId: "",
      cityId: "",
    }));

    setCities([]);

    if (stateId) {
      await fetchCities(stateId);
    }
  };

  // =========================
  // FETCH API DATA
  // =========================
  const fetchCountries = async () => {
    try {
      const res = await getCountries();
      setCountries(res?.data || res?.result || []);
    } catch (error) {
      console.error("Country fetch error:", error);
    }
  };

  // const fetchEducationLevels = async () => {
  //   try {
  //     const res = await getEducationLevels();
  //     setEducationLevels(res?.data || res?.result || []);
  //   } catch (error) {
  //     console.error("Education fetch error:", error);
  //   }
  // };

  const fetchStates = async (countryId) => {
    try {
      const res = await getStates(countryId);
      setStates(res?.data || res?.result || []);
    } catch (error) {
      console.error("State fetch error:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await getCities(stateId);
      setCities(res?.data || res?.result || []);
    } catch (error) {
      console.error("City fetch error:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const profile = res?.data?.response || res?.result || {};

      const updatedData = {
        name: profile?.name || "",
        mail: profile?.mail || "",
        stateId: profile?.stateId ? String(profile.stateId) : "",
        cityId: profile?.cityId ? String(profile.cityId) : "",
        countryId: profile?.countryId ? String(profile.countryId) : "",
        educationLevel: profile?.educationLevel
          ? String(profile.educationLevel)
          : "",
        stream: profile?.stream ? String(profile.stream) : "",
        other: profile?.other || "",
        schoolId: profile?.schoolId ? String(profile.schoolId) : "",
        referralCode: profile?.referralCode || "",
        rewardPoints: profile?.rewardPoints
          ? String(profile.rewardPoints)
          : "",
        profilePhoto: profile?.profilePhoto || "",
      };

      setMobile(profile?.mobileNo || null);
      setFormData(updatedData);
      if (updatedData.countryId) {
        await fetchStates(updatedData.countryId);
      }

      if (updatedData.stateId) {
        await fetchCities(updatedData.stateId);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setPageLoading(true);
      await Promise.all([fetchCountries()]);
      await fetchProfile();
    };

    const classMap = [
      { id: 1, name: '8th' },
      { id: 2, name: '10th' },
      { id: 3, name: '11th' },
      { id: 4, name: '12th' },
      { id: 5, name: 'Graduate Degree' },
      { id: 6, name: 'Diploma' },
      { id: 7, name: 'Postgraduate Degree' },
      { id: 8, name: 'Working Professional' },
      { id: 9, name: '9th' }
    ]
    setEducationLevels(classMap)
    init();
  }, []);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        ...formData,
        stateId: Number(formData.stateId),
        cityId: Number(formData.cityId),
        countryId: Number(formData.countryId),
        educationLevel: Number(formData.educationLevel),
        stream: formData.stream ? Number(formData.stream) : 0,
        schoolId: formData.schoolId ? Number(formData.schoolId) : 0,
        rewardPoints: formData.rewardPoints
          ? Number(formData.rewardPoints)
          : 0,
      };

      await updateProfile(payload);

      if (getFromStorage('re')) {
        const updatePayload = {
          student_name: payload?.name,
          student_email: payload?.mail,
          mobile: mobile,
          student_education_level: payload?.educationLevel,
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_RE_BASE_URL}edit-profile`,
          updatePayload
        )
      }

      if (getFromStorage('re') == 1) router.push('/attempt-ideal-career-test');
      SUCCESS_MSG("Profile updated successfully!");
      //
    } catch (error) {
      console.error("Update error:", error);
      ERROR_MSG(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200
    ${error
      ? "border-red-500 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    }`;

  if (pageLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center lg:ml-[255px]">
        <div className="text-gray-600 text-lg font-medium animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <div className="border-b border-gray-100  from-indigo-600 to-purple-600 px-6 py-5 md:px-10 bg-primary-color">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Edit Profile
              </h2>
              <p className="mt-1 text-sm text-indigo-100">
                Update your personal and education details
              </p>
            </div>

            {/* Form */}
            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={inputClass(errors.name)}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="mail"
                      className={inputClass(errors.mail)}
                      value={formData.mail}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {errors.mail && (
                      <p className="mt-1 text-sm text-red-500">{errors.mail}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="countryId"
                      className={`${inputClass(errors.countryId)} text-black bg-white`}
                      value={formData.countryId}
                      onChange={handleCountryChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name_en}
                        </option>
                      ))}
                    </select>
                    {errors.countryId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.countryId}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="stateId"
                      className={`${inputClass(errors.stateId)} text-black bg-white ${!formData.countryId ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      value={formData.stateId}
                      onChange={handleStateChange}
                      disabled={!formData.countryId}
                    >
                      <option value="">Select State</option>
                      {states.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name_en}
                        </option>
                      ))}
                    </select>
                    {errors.stateId && (
                      <p className="mt-1 text-sm text-red-500">{errors.stateId}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="cityId"
                      className={`${inputClass(errors.cityId)} text-black bg-white ${!formData.stateId ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      value={formData.cityId}
                      onChange={handleChange}
                      disabled={!formData.stateId}
                    >
                      <option value="">Select City</option>
                      {cities.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name_en}
                        </option>
                      ))}
                    </select>
                    {errors.cityId && (
                      <p className="mt-1 text-sm text-red-500">{errors.cityId}</p>
                    )}
                  </div>

                  {/* Education Level */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Education Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="educationLevel"
                      className={`${inputClass(errors.educationLevel)} text-black bg-white`}
                      value={formData.educationLevel}
                      onChange={handleChange}
                    >
                      <option value="">Select Education Level</option>
                      {educationLevels.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.educationLevel && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.educationLevel}
                      </p>
                    )}
                  </div>

                  {/* Stream */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Stream
                    </label>
                    <input
                      type="text"
                      name="stream"
                      className={inputClass()}
                      value={formData.stream}
                      onChange={handleChange}
                      placeholder="Enter stream"
                    />
                  </div>

                  {/* Other */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Other
                    </label>
                    <input
                      type="text"
                      name="other"
                      className={inputClass()}
                      value={formData.other}
                      onChange={handleChange}
                      placeholder="Enter other"
                    />
                  </div>

                  {/* School ID */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      School ID
                    </label>
                    <input
                      type="text"
                      name="schoolId"
                      className={inputClass()}
                      value={formData.schoolId}
                      onChange={handleChange}
                      placeholder="Enter school ID"
                    />
                  </div>

                  {/* Referral Code */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Referral Code
                    </label>
                    <input
                      type="text"
                      name="referralCode"
                      className={inputClass()}
                      value={formData.referralCode}
                      onChange={handleChange}
                      placeholder="Enter referral code"
                    />
                  </div>

                  {/* Reward Points */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Reward Points
                    </label>
                    <input
                      type="number"
                      name="rewardPoints"
                      className={inputClass()}
                      value={formData.rewardPoints}
                      onChange={handleChange}
                      placeholder="Enter reward points"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-12" style={{ textAlign: 'right' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 bg-primary-color
                    ${loading
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                      }`}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default withAuth(EditProfileForm);