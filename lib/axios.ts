import axios from "axios";
import { getTokenCookie, removeTokenCookie } from "@/utils";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenCookie();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeTokenCookie();
      localStorage.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/sign-up";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;