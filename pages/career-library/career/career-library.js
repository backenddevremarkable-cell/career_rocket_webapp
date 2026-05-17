import Header from "../../../assets/images/header-pic/career.svg";
import Image from "next/image";
import Search from "../../../components/common/Search";
import { useEffect, useState } from "react";
import {
  careerCategory
} from "@/services/authService";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore";
import { saveToStorage } from "@/utils/index";
import NoRecordFound from "../../../components/common/NoRecordFound";
import SkeletonCareerLib from "../../../components/home/skeleton/SkeletonCareerLib";
import Card from "./components/card";

const CareerLibrary = () => {

    const [page, setPage] = useState(1);
    const [limit,setLimit] = useState(50);
    const { setCaree, setCareerList, careerList, searchCareer } = useDataStore();
    const [data, setdata] = useState(careerList);
    const [loading,setLoading] = useState(careerList ? false : true);

    const fetchData = async () => {
        try {
          const res = await careerCategory({ page, limit });
          console.log("Career Category Response:", res);
          setdata(res?.data || {});
          setCareerList(res?.data)
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      };  
  
       useEffect(() => {
           if(!careerList) fetchData ();
        }, []);


      const filterData =()=>{}

    return (<>
      <div className="min-h-screen bg-[#f6f5f8] pb-16">
        <div className="mx-auto">

        <div className="relative overflow-hidden border border-white/40 bg-gradient-to-br from-[#fcfbff] via-[#fdf7ff] to-[#fffaf5] px-6 py-16  md:px-14 ">
          {/* background blur */}
          <div className="absolute left-[-80px] top-[-80px] h-[240px] w-[240px] rounded-full bg-[#f6f5f8] blur-3xl"></div>
          <div className="absolute bottom-[-100px] right-[-100px] h-[260px] w-[260px] rounded-full bg-violet-200/30 blur-3xl"></div>
          <div className="relative z-10 text-center">
            <Search 
              loading={loading}
              filterData={(e)=>filterData(e)}
              placeholder={`Search from 200+ careers to match your passion...`} 
              Badge={'Choose your career goal'}
              heading={
                    <div className="mb-14">
                     What’s your{" "}
                     <span className="text-purple-700">
                        dream career?
                     </span>
                    </div>
                } />
          </div>
        </div>

            {/* CARD SECTION */}
  { loading || data && data?.records.length ?
      <section className="max-w-6xl mx-auto px-4 mt-16">


      {
        searchCareer ?
        <div className="max-w-6xl mx-auto mb-10 pb-10 border-b border-[#eaeaea]">
          <h1 className="text-[20px] font-semibold text-gray-800 mb-6">Showing Search Result </h1>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card key={searchCareer?.id}  {...searchCareer} />
          </div>
       </div> 
        :
        null
    }
    
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
    
    {loading ? (
      <SkeletonCareerLib />
    ) : (
      data?.records.map((item, index) => (
         <Card key={index} {...item} />
      ))
    )}
  </div>
</section>
 : <NoRecordFound/>  }
                </div>
              </div>  
                
        </>)
}

export default CareerLibrary;