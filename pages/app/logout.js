import { useRouter } from "next/router";
import { use, useEffect } from "react";

export default function useLogout() {
    const router = useRouter();
   
    const logout = () => { 
    // removeTokenCookie();
     router.push("/sign-up");
   // router.refresh();
  }

  useEffect(() => {
    logout();
  }, [])

  return logout;
}
            