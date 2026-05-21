import toast from "react-hot-toast";

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userInfo");
  }
  return null;
};


export const truncateWords = (text : string, limit: number) => {
  if (!text) return "";
  
  const words = text.split(" ");

  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text;
};

export const saveToStorage = (key : string, value: number) => {
  localStorage.setItem(key, JSON.stringify(value));
};


export const getSlug = (e: string) => {
  return e ? e.toLowerCase().replace(/\s+/g, "-") : ""; // 1 day
}
export const getFromStorage = (key :string) => {  
 const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setTokenCookie = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
}

export const getTokenCookie = (): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

// export const getTokenCookie = () => {
//   if (typeof document !== "undefined") {
//     const match = document.cookie.match(/(^| )token=([^;]+)/);
//     return match ? match[2] : null;
//   }
//   return null;
// }

export const removeTokenCookie = () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export const setuserInfo = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userInfo", token);
  }
};

export const removeuserInfo = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userInfo");
  }
};

export const ERROR_MSG = (msg : string) => {
  return toast.error(msg, { duration: 2000 });
}


export const SUCCESS_MSG = (msg : string) => {
  return toast.success(msg, { duration: 2000 });
}


export const encrypt = (text : string) => {
  return btoa(text);
};

export const decrypt = (encodedText : string) => {
  return atob(encodedText);
};