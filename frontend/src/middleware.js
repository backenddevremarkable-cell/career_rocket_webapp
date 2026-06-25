import { NextResponse } from "next/server";

const EMITRA_CALLBACK_PATHS = new Set(["/", "/emitra"]);
// const CALLBACK_FIELDS = ["encData", "logId", "agCode", "agKey"];
const CALLBACK_FIELDS = ["encData", "data", "logId", "agCode", "agKey"];

function copyCallbackFields(source) {
  const params = new URLSearchParams();

  for (const key of CALLBACK_FIELDS) {
    const value = source.get(key);
    if (typeof value === "string" && value.trim()) {
      params.set(key === "data" ? "encData" : key, value);
    }
  }

  return params;
}
async function readCallbackParams(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    // const formData = await request.formData();
    // const params = new URLSearchParams();

    // for (const key of CALLBACK_FIELDS) {
    //   const value = formData.get(key);
    //   if (typeof value === "string" && value.trim()) {
    //     params.set(key, value);
    //   }
    // }
    return copyCallbackFields(await request.formData());
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return copyCallbackFields(new URLSearchParams(await request.text()));
  }
    // return params;
    if (contentType.includes("application/json")) {
    try {
      const body = await request.json();
      return copyCallbackFields({
        get: (key) => body?.[key],
      });
    } catch {
      return new URLSearchParams();
    }
  }

  // const body = await request.text();
  // return new URLSearchParams(body);

    return new URLSearchParams();
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (request.method !== "POST" || !EMITRA_CALLBACK_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const callbackParams = await readCallbackParams(request);

  if (!callbackParams.get("encData")) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  // redirectUrl.search = "";

  // for (const key of CALLBACK_FIELDS) {
  //   const value = callbackParams.get(key);
  //   if (value?.trim()) {
  //     redirectUrl.searchParams.set(key, value);
  //   }
  // }
   redirectUrl.pathname = "/emitra";
  redirectUrl.search = callbackParams.toString();
  return NextResponse.redirect(redirectUrl, 303);
}

export const config = {
  matcher: ["/", "/emitra"],
};
