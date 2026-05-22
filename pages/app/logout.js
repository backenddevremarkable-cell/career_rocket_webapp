import { useRouter } from "next/router";
import { useEffect } from "react";
import { removeTokenCookie, removeuserInfo } from "@/utils";
import { useDataStore } from "@/store/useDataStore";

export default function LogoutPage() {
  const router = useRouter();
  const { setUsers, setMytest } = useDataStore((state) => state);

  useEffect(() => {
    // 1. Remove cookies and user details
    removeTokenCookie();
    removeuserInfo();

    // 2. Reset Zustand store state
    setUsers(null);
    setMytest(null);

    // 3. Clean up other localStorage variables
    localStorage.removeItem("buycourse");
    localStorage.removeItem("csid");
    localStorage.removeItem("myCourseId");

    // 4. Redirect to Sign Up / Sign In
    router.push("/sign-up");
  }, [router, setUsers, setMytest]);

  return (
    <main className="min-h-screen bg-[#f7f5f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="flex h-screen items-center justify-center bg-[#f7f5f8]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Logging out...</p>
          </div>
        </div>
      </section>
    </main>
  );
}
