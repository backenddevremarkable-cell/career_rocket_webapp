import { termsCondition } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState,useEffect } from "react";

export default function PrivicyPolicy() {

   const { setPoliocy, policy } = useDataStore((state) => state);
   const [data, setData] = useState(policy);
    
      const fetchData = async ()=>{
          const payload = {
              id:3
           }
          const res = await termsCondition(payload);
          setData(res?.data || null)
          setPoliocy(res?.data || null)
      }
      
      useEffect(() => {
        if(!data) fetchData()
      }, [])

  return (<>
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {
                data?.title
              }
          </h1>
          <p className="text-gray-500">
            Your privacy is important to us. This policy explains how we handle your data.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8 content-page" dangerouslySetInnerHTML={{ __html: data?.description || "" }}>
        </div>
      </div>
    </div>
     </>
  )
}
