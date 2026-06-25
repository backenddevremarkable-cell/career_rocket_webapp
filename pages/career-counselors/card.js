import { FaPhoneAlt, FaStar } from "react-icons/fa";
import CustomImage from "../../components/common/ImageMedia";
import { useDataStore } from "@/store/useDataStore";
export default function CounselorCard({ item }) {

    const { setCounselorPopup } = useDataStore((state) => state);
    const totalYears = item ? item.experience.match(/\d+/)?.[0] : "10";
    const skillList = item && item.skills ? item.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
    const displaySkills = skillList.slice(0, 3);
    const extraSkills = skillList.slice(3);

    return (
        item ?
            <div className="bg-white rounded-2xl p-6 text-center shadow-md transition">
                {/* avatar */}
                <div className="relative w-fit mx-auto">
                    <div className="w-20 h-20">
                        <CustomImage img={item.profilePic} className={`rounded-full object-cover custom-img mx-auto border border-purple-200 p-2`} alt={item.name} />
                    </div>

                    {item.avgRating ?
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 counselor-rating">
                            <FaStar size={10} /> {item.avgRating}
                        </span> : null}
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                    {item.name}
                    {item.isVerified ? <span></span> : null}
                </h3>
                <p className="text-sm text-gray-500">{item.role}</p>

                <p className="text-xs text-gray-400 mt-2">
                    • {`${totalYears} ${totalYears > 1 ? '+ Yrs' : 'Year'}`}  Experience
                </p>

                {/* tags */}
                <div className="h-[50px] flex items-center justify-center  mt-6 mb-6">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                        {displaySkills.map((skill, index) => (
                            <span key={index} className="text-[10px] bg-purple-50 text-purple-600 font-medium px-2 py-1 rounded-md border border-purple-100">
                                {skill}
                            </span>
                        ))}
                        {extraSkills.length > 0 && (
                            <span className="relative group cursor-pointer text-[10px] bg-purple-100 text-purple-700 font-semibold px-2 py-1 rounded-md border border-purple-200 transition-all hover:bg-purple-200">
                                +{extraSkills.length} more

                                {/* SaaS Tooltip */}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] hidden group-hover:flex flex-col bg-slate-900 text-white text-[10px] rounded-lg py-2 px-3 shadow-xl z-20 transition-all duration-200 pointer-events-none">
                                    <span className="font-semibold text-slate-300 border-b border-slate-700 pb-1 mb-1.5 block">
                                        More Skills
                                    </span>
                                    <span className="flex flex-wrap gap-1 justify-center max-w-[180px]">
                                        {extraSkills.map((skill, idx) => (
                                            <span key={idx} className="bg-slate-800 text-purple-300 px-2 py-0.5 rounded text-[9px] font-medium border border-slate-700">
                                                {skill}
                                            </span>
                                        ))}
                                    </span>
                                    {/* Tooltip Arrow */}
                                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></span>
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                {/* buttons */}
                <div className="flex gap-3 mt-5">
                    {/* <a
                        href={`tel:${item.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FaPhoneAlt size={14} />
                        Call
                    </a> */}

                    <button
                        onClick={() => setCounselorPopup(true)}
                        // href={`https://wa.me/${item.whatsapp}`}
                        // target="_blank"
                        className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
                    >
                        <FaPhoneAlt size={16} />
                        Call
                    </button>
                </div>
            </div> : null
    );
}