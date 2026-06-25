const USER_KEY = "careerRocketVerifiedUser";
const COUNSELLING_KEY = "careerRocketCounsellingContext";

export function saveVerifiedUser(user) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getVerifiedUser() {
  if (typeof window === "undefined") return null;
  try {
    const data = sessionStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearVerifiedUser() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(USER_KEY);
  }
}

export function saveCounsellingContext(ctx) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(COUNSELLING_KEY, JSON.stringify(ctx));
  }
}

export function getCounsellingContext() {
  if (typeof window === "undefined") return null;
  try {
    const data = sessionStorage.getItem(COUNSELLING_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearCounsellingContext() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(COUNSELLING_KEY);
  }
}
