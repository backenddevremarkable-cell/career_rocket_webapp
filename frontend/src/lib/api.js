import { getVerifiedUser } from "./session";

const EMITRA_API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_API_URL ||
  ""
).replace(/\/$/, "");

function apiUrl(path) {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${EMITRA_API_BASE_URL}/api/${normalizedPath}`;
}

export async function fetchCourses(params = {}) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.courseName) search.set("courseName", params.courseName);
  if (params.courseId) search.set("courseId", params.courseId);
  if (params.type) search.set("type", params.type);

  const queryString = search.toString();
  const res = await fetch(
    `${apiUrl("courses")}${queryString ? `?${queryString}` : ""}`
  );
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function studentLogin(mobileNo) {
  const res = await fetch(apiUrl("studentlogin"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobileNo }),
  });
  if (!res.ok) throw new Error("Failed to login/verify student");
  return res.json();
}

export async function processPayment(data) {
  const res = await fetch(apiUrl("payment"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Payment failed");
  return res.json();
}

function authHeaders(token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function createCounsellingSession(payload, token) {
  const res = await fetch(apiUrl("createCounsellingSession"), {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create counselling session");
  return res.json();
}

export async function getDivisionByStateId(stateId, token) {
  const res = await fetch(apiUrl("getDivisionByStateId"), {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ stateId }),
  });
  if (!res.ok) throw new Error("Failed to get divisions");
  return res.json();
}

export async function getDivisionCitiesByDivisionId(divisionId, token) {
  const res = await fetch(apiUrl("getDivisionCitiesByDivisionId"), {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ divisionId }),
  });
  if (!res.ok) throw new Error("Failed to get division cities");
  return res.json();
}

export async function getBlocksByCityId(id, token) {
  const res = await fetch(apiUrl("getBlocksByCityId"), {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to get blocks");
  return res.json();
}
async function postNextApi(path, payload) {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
  
  const headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  
  // Inject JWT authorization token from active session if present
  try {
    const user = getVerifiedUser();
    if (user?.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }
  } catch (err) {
    console.error("Failed to read token from session storage", err);
  }

  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers,
    body: isFormData ? payload : JSON.stringify(payload ?? {}),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Failed to call ${path}`);
  }
  return data;
}

export function generateEmitraAuthorizationToken(payload) {
  return postNextApi("generateAuthorizationToken", payload);
}

export function regenerateEmitraAuthorizationToken(refreshToken) {
  return postNextApi("regenerateAuthorizationToken", { refreshToken });
}

export function decryptEmitraEncData(encData) {
  if (typeof FormData !== "undefined" && encData instanceof FormData) {
    return postNextApi("decryptEncData", encData);
  }
  return postNextApi("decryptEncData", { encData });
}
export function decryptEmitraEndData(formData) {
  return postNextApi("decryptEndData", formData);
}
export function verifyEmitraSsoToken(ssoToken) {
  return postNextApi("verifySSOToken", { ssoToken });
}

export function fetchEmitraKioskDetails(payload) {
  return postNextApi("fetchKioskDetails", payload);
}

export function callEmitraBackToBackTransaction(payload) {
  return postNextApi("callBackToBackTransaction", payload);
}

export function verifyEmitraTransaction(payload) {
  return postNextApi("verifyTransaction", payload);
}

export function cancelEmitraTransaction(payload) {
  return postNextApi("cancelTransaction", payload);
}

export function updateEmitraApplicationId(payload) {
  return postNextApi("updateApplicationId", payload);
}
