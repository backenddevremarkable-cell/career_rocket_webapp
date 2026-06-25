import Image from "next/image";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage, getSlug } from "@/utils/index";

import {
  careerById
} from "@/services/authService";
import Link from "next/link";

const Career = () => {

    const [dataObj, setdataObj] = useState(null);
    const [loading,setLoading] = useState(true);
    const careerId = useDataStore((state) => state?.careerDetail);

    const fetchData = async () => {
        try {
          const res = await careerById({ id : careerId || getFromStorage('cdid')})
          console.log("Career Category Response:", res);
          setdataObj(res?.data || {});
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }  
  
       useEffect(() => {
           fetchData ();
        }, []);

  return (<>
    { loading ?    
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg font-medium">
            Loading...
          </p>
        </div>
      :
     (<>    
     
     {dataObj?.bannerImage ? 
      <section className="relative w-full h-[300px] md:h-[350px]">
          <Image
            src={dataObj?.bannerImage}
            alt="Career Library"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          {/* <h1 className="text-white text-2xl md:text-4xl font-semibold">
              Career Library
          </h1> */}
          </div>
      </section> : null }
                
     <section className="bg-[#f5f7fb] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
      

       { dataObj ? (
            <div
               className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-2">

                   <h2 className="text-2xl md:text-2xl font-bold text-gray-900 uppercase leading-tight">
                      {dataObj?.advantage_en}
                     {dataObj?.avgSalary}
                        {dataObj?.carCatName_en}
                      {dataObj?.demand}
                      {dataObj?.description_en}
                      {dataObj?.disadvantage_en}
                      {dataObj?.eligibility_en}
                      {dataObj?.entryLevelSalary}
                      {dataObj?.famousPersonalities_en}
                      {dataObj?.icon}
                      {dataObj?.jobAndSalaryInfo_en}
                    {dataObj?.midLevelSalary}
                      {dataObj?.name_en}
                      {dataObj?.rolesAndResponsibilities_en}
                        {dataObj?.seo_description_en}
                      {dataObj?.seo_keywords}
                      {dataObj?.seo_tags}
                      {dataObj?.seo_title_en}
                      {dataObj?.skills}
                      {dataObj?.seo_title_en}
                 {/*     {dataObj?.streams}*/}
                      {dataObj?.summary_en} 
                  </h2>
              </div>
            </div>
            </div> 
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg font-medium">
              No career data found.
            </p>
          </div>
        )}
      </div>
    </section>
    </>)
   }
  </>)
}

export default Career;