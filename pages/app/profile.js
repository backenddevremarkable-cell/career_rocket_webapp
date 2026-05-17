"use client";

import { useDataStore } from "@/store/useDataStore";
import NavDashboard from "../../components/NavDashboard";
import Link from "next/link";
export default function profile() {
  const { users } = useDataStore((state) => state);

  if (!users) {
    return (
     <main className="min-h-screen">
      <NavDashboard/> 
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading profile...
        </div>
      </div>
     </main> 
    );
  }



  return (
  <main className="min-h-screen">
    <NavDashboard/>
   
   { users ?
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Top Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r  to-indigo-600 h-40 relative bg-primary-color">
            <div className="absolute -bottom-16 left-8">
              <img
                src={
                  users?.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              />
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {users?.name || "N/A"}
                </h1>
                <p className="text-gray-500 mt-1">
                  {users?.mail || "No email available"}
                </p>
              </div>

              <Link href="/edit-profile" className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition w-fit">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>

            <div className="space-y-4">
              <ProfileField label="Full Name" value={users?.name} />
              <ProfileField label="Email" value={users?.mail} />
              <ProfileField label="Phone" value={users?.mobileNo} />
              {/* <ProfileField label="Gender" value={profile?.gender} /> */}
              {/* <ProfileField label="Date of Birth" value={profile?.dob} /> */}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Academic / Professional Details
            </h2>

            <div className="space-y-4">
              <ProfileField label="Education Level" value={users?.educationLevel} />
              <ProfileField label="Class" value={users?.className} />
              <ProfileField label="College / School" value={users?.institution} />
              {/* <ProfileField label="Occupation" value={profile?.occupation} />
              <ProfileField label="Experience" value={profile?.experience} /> */}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProfileField label="Country" value={users?.country?.name_en} />
            <ProfileField label="State" value={users?.state?.name_en} />
            <ProfileField label="City" value={users?.city?.name_en} />
          </div>
        </div>
      </div>
    </div> : null }
   </main> 
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800 mt-1">
        {value || "N/A"}
      </p>
    </div>
  );
}