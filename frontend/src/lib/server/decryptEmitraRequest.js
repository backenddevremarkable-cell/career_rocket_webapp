import { parseDecryptedEmitraData } from "@/lib/server/emitra";
import { apiJson } from "@/lib/server/careerApi";

const CALLBACK_FIELDS = ["encData", "data", "logId", "agCode", "agKey"];

async function readDecryptRequest(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries(
      CALLBACK_FIELDS.map((key) => [key, formData.get(key)]).filter(
        ([, value]) => typeof value === "string" && value.trim()
      )
    );
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(await request.text());
    return Object.fromEntries(
      CALLBACK_FIELDS.map((key) => [key, params.get(key)]).filter(
        ([, value]) => typeof value === "string" && value.trim()
      )
    );
  }

  try {
    return await request.json();
  } catch {
    return {};
  }
}

export async function handleDecryptEncData(request) {
  try {
    const payload = await readDecryptRequest(request);
    const encData = payload?.encData || payload?.data;

    if (!encData) {
      return apiJson({ status: 400, message: "encData is required" }, 400);
    }

    return apiJson({
      status: 200,
      message: "Success",
      data: parseDecryptedEmitraData(encData),
      request: payload,
    });
  } catch (error) {
    console.error("decryptEncData failed", error);
    return apiJson(
      { status: 500, message: error.message || "Internal server error" },
      500
    );
  }
}
