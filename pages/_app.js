import { Toaster } from "react-hot-toast";
import "../assets/styles/globals.css";
import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { getProfile } from "@/services/authService";
import { getTokenCookie } from "@/utils";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "./app/component/Sidebar";
import Header from "./app/component/Header";

export default function MyApp({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { setUsers, users } = useDataStore((state) => state);
  const router = useRouter();

  const isSignUp = router.pathname.includes("sign-up");
  const isDashboard = router.pathname.includes("app");

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUsers(res?.data?.response);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const isBrowser = typeof window !== "undefined";
  const token = isBrowser ? getTokenCookie() : null;

  useEffect(() => {
    if (token && !users) {
      fetchProfile();
    }

    if (isDashboard && !token) {
      router.replace('/sign-up');
    } else if (isSignUp && token) {
      router.replace('/dashboard');
    }
  }, [router.pathname, token, users]);

  // Prevent UI flashing synchronously
  if (isBrowser) {
    if ((isDashboard && !token) || (isSignUp && token)) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#F6F4F8]">
          <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />

      {isSignUp ? <Component {...pageProps} /> : isDashboard ?
        <>
          <div className="bg-[#F6F4F8]">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Header setSidebarOpen={setSidebarOpen} />
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