import { Toaster } from "react-hot-toast";
import "../assets/styles/globals.css";
import { useEffect } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getProfile } from "@/services/authService";
import { getTokenCookie } from "@/utils";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "./app/component/Sidebar";
import Header from "./app/component/Header";

export default function MyApp({ Component, pageProps }) {

  const { setUsers, users } = useDataStore((state) => state);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUsers(res?.data?.response);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    const token = getTokenCookie();

    if (token && !users) {
      fetchProfile();
    }
  }, [users]);
  const isSignUp = router.pathname.includes("sign-up")
  const isDashboard = router.pathname.includes("app");
 
  return (
    <>
    <Toaster position="bottom-center" />
      
    { isSignUp ? <Component {...pageProps} /> : isDashboard ?
      <>
        <div className="bg-[#F6F4F8]">
          <Sidebar/>
        <Header />
        <div className="max-w-7xl mx-auto p-4">
          <Component {...pageProps} />
        </div>
        </div>
      </> 
      :
      <>
      <Navbar />
       <Component {...pageProps} />
       {!isDashboard && <Footer />}
      </>
    }
    </>
  );
}