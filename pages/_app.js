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
 //router.pathname.includes("sign-up")
  const isDashboard = router.pathname.includes("app");
 
  return (
    <>
    <Toaster position="bottom-center" />
      
    { isDashboard ?
      <>
        <Sidebar/>
        <Header />
      </> 
      :
      <Navbar />
    }

      <Component {...pageProps} />
      {!isDashboard && <Footer />}
    </>
  );
}