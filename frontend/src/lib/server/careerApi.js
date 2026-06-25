
const BACKEND_BASE = (process.env.BACKEND_API_URL || "http://localhost:4000").replace(
  /\/$/,
  ""
);
export function apiJson(data, status = 200) {
  return Response.json(data, { status });
}

export async function readRequestJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

async function forwardToBackend(path, request) {
  const url = new URL(request.url);
  const queryString = request.method === "GET" ? url.searchParams.toString() : "";
  const backendUrl = `${BACKEND_BASE}/api/${path}${queryString ? `?${queryString}` : ""}`;

  const headers = { "Content-Type": "application/json" };
  const authorization = request.headers.get("authorization");
  if (authorization) headers.Authorization = authorization;

  const body =
    request.method !== "GET" ? JSON.stringify(await readRequestJson(request)) : undefined;

  const upstream = await fetch(backendUrl, {
    method: request.method,
    headers,
    body,
  });

  const text = await upstream.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    return apiJson({ status: 502, message: "Invalid JSON from backend API" }, 502);
  }

  return apiJson(data, upstream.status);
}

export function forwardToBackendRoute(path, request) {
  return forwardToBackend(path, request);
}

export async function handleCourses(request) {
  return forwardToBackend("courses", request);
}

export async function handleStudentLogin(request) {
  return forwardToBackend("studentlogin", request);
}

export async function handlePayment(request) {
  return forwardToBackend("payment", request);
}