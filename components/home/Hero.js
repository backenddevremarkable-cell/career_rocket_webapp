import { FiSearch } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import Search from "../common/Search";
import Link from "next/link";
import { suffleCategory } from "@/services/publicService";
import { useDataStore } from "@/store/useDataStore";
import { useState,useEffect } from "react";

export default function Hero() {

      const career = ['pink','green','orange','purple','blue']
      const { setHomeCareer, homeCareer } = useDataStore((state) => state);
      const [data, setData] = useState(homeCareer);
      const [loading, setLoading] = useState(false);
    
         const fetchData = async () => {
          try {
            setLoading(true);
            const res = await suffleCategory();
            const responseData = res?.data || [];
            setData(responseData);
            setHomeCareer(responseData);
          } catch (error) {
            console.error("Error fetching stories:", error);
          } finally {
            setLoading(false);
          }
        }
      
        useEffect(() => {
          if(!data) fetchData()
        }, [])

    //suffleCategory
  
  return (
    <section id="hero" className="hero-bg relative pt-32 pb-36 text-center">
    <div className="max-w-5xl mx-auto px-6">
        <Search isPopup={true}  placeholder={`Search for careers, skills, or industries...`} heading={`Find the career you were`} Badge={'SCIENCE + HUMAN INTELLIGENCE'} textSlide={true} />
        
       { data ? 
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          <Link href={`/career-library`}>
            <span className={`pill gray`}>ALL</span>
          </Link>
              {data && data.map((item, i) => {
                  return <Link href={`/career-library${`?search=${item.name_en}`}`}>
                      <span key={i} className={`pill ${career[i]}`}>{item.name_en}</span>
                   </Link>
               })
             } 
        </div> : null }
      </div>
    </section>
  );
}