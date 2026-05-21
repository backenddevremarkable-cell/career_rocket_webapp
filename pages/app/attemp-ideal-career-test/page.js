import { useDataStore } from "@/store/useDataStore";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { saveToStorage } from "@/utils/index";
import axios from "axios";
import { SUCCESS_MSG } from "@/utils";
import NavDashboard from "../../../components/NavDashboard";
import LoadingScreen from "../../../components/common/Loading";

export default function idealCareerTest() {

  const [url, setUrl] = useState('');
  const router = useRouter();
  const iframeRef = useRef();
  const { users } = useDataStore((state) => state);
  
  const profile = async () => {
    try {
      const wlocation = window.location.href
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RE_BASE_URL}get-profile`,
        { mobile: users?.mobileNo, url: wlocation.includes('psychometric-test/') ? 'pt' :'sra' }
      );
  
      const { url } = response.data;
      console.log(response,'sdfsdfjsdklfjkl')
        if(!url){
          router.push('/edit-profile'); 
          saveToStorage('re',1);     
          }else{
          document.body.style.overflow = "hidden";
          setUrl(url) 
        }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    if(users?.mobileNo){
      profile();
    }
  }, [users?.mobileNo])


    useEffect(() => {
      const handleRouteChange = () => { 
        iframeRef.current?.contentWindow.postMessage(
          { type: "LOGOUT" }, process.env.NEXT_PUBLIC_RE_IFRAME_URL
        )
      }
      router.events.on("routeChangeStart", handleRouteChange);
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      }
    }, []);
    
    useEffect(() => {
    const handleMessage = (event) => {
      // Security check (IMPORTANT)
      const { type, payload } = event.data;

      if (type === "SUBMIT_TEST") {
        console.log("Data from iframe:", payload);

        // 👉 Yaha tum apna Next.js function call kar sakte ho
        updateProfile(payload);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      document.body.style.overflow = "auto"; // cleanup
    };
  }, []);

  const updateProfile = (data) => {
    SUCCESS_MSG("Test Attempt successfully!");
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[#f7f5f8]">
      <section className="ml-[255px] pt-[78px]">
       { url ?  
        <div style={{ width: "100%", height: "100vh", margin: 0 }}>
            <iframe
                ref={iframeRef}
                src={url}
                title="Full Page Iframe"
                width="100%"
                height="100%"
                style={{ border: "none", display: "block" }}
                allowFullScreen
            />
            </div> : <LoadingScreen/> }
        
      {/* Footer */}
      </section>
    </main>
  );
}
