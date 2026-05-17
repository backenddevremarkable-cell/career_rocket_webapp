import HeroSection from "./course-detail/HeroSection";
import FeaturesSection from "./course-detail/FeaturesSection";
import AboutSection from "./course-detail/AboutSection";
import LearnSection from "./course-detail/LearnSection";
import FaqSection from "./course-detail/FaqSection";
import AudienceSection from "./course-detail/AudienceSection";
import CertificationSection from "./course-detail/CertificationSection";
import TakeAwaySection from "./course-detail/TakeAwaySection";
import CTASection from "./course-detail/CTASection";
import { useEffect, useState } from "react";
import { getCoursesDetail } from "@/services/authService";
import { useDataStore } from "@/store/useDataStore";
import { getFromStorage } from "@/utils/index";
import { useRouter } from "next/router";
import LoadingScreen from "../../components/common/Loading";

const Career = () => {

    const { courseId } = useDataStore((state) => state);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const fetchData = async ()=>{

       try {
        const payload = {
            id : courseId || getFromStorage('csid')
        }

        if(!payload?.id){
             router.push("/courses")
             return
        }
        setLoading(true)
        const res = await getCoursesDetail(payload);
        setData(res?.data || [])
         } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
       } 
    }
    
    useEffect(() => {
       fetchData()
    }, [])

  return (  loading ?
      <div className="relative min-h-[500px]">
        <LoadingScreen/>
      </div> :
   <>
    <HeroSection {...data}/>
    <FeaturesSection/>
    <AboutSection />
    {/* <LearnSection /> */}
    {/* <FaqSection /> */}
    {/* <AudienceSection /> */}
    <CertificationSection />
    {/* <TakeAwaySection /> */}
    <CTASection />
  </>)
}

export default Career;