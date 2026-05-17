import FooterDashboard from "../../components/FooterDashboard";
import NavDashboard from "../../components/NavDashboard";
import { useDataStore } from "@/store/useDataStore";
import { RE_API } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  myCourse
} from "@/services/authService";

export default function myTest() {

      const { users, myTest, setMytest } = useDataStore((state) => state);
      const [data, setData] = useState(myTest);
      const [activeTab, setActiveTab] = useState("free");

      const tabs = [
        { id: "free", label: "Free Courses" },
        { id: "paid", label: "Paid Courses" },
        { id: "live", label: "Live Classes" },
      ]

     
    const renderContent = () => {
      switch (activeTab) {
        case "free":
          return <div className="p-4">🎓 Free Courses Content</div>;
        case "paid":
          return <div className="p-4">💰 Paid Courses Content</div>;
        case "live":
          return <div className="p-4">📡 Live Classes Content</div>;
        default:
          return null;
      }
    };
  
     
    const fetchData = async ()=>{
        const res = await myCourse();
        setData(res?.data)
    }
    
    useEffect(() => {
       fetchData()
    }, []) 

  return (
  <main className="min-h-screen bg-[#f7f5f8]">
    <NavDashboard/>

   <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">       
     <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Course
      </h2>


    {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm md:text-base font-medium rounded-xl transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6 bg-white border rounded-xl shadow-sm">
        {renderContent()}
      </div>
     
    </div>
   </section> 

        {/* Footer */}
      <FooterDashboard/>
    </main>
  );
}
