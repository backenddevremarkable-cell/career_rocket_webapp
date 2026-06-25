"use client";
export default function useLogout(router) {
  document.cookie = "token=; path=/; max-age=0";
  localStorage.clear();
  router.push("/");
}