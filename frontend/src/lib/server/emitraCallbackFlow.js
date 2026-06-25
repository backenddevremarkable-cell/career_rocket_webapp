import { parseDecryptedEmitraData } from "./emitra";

const BACKEND_BASE = (process.env.BACKEND_API_URL || "http://localhost:3010").replace(
  /\/$/,
  ""
);

function safeJson(value) {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function findSsoToken(value) {
  const parsedValue = safeJson(value);

  if (!parsedValue || typeof parsedValue !== "object") return null;

  const tokenVal = parsedValue.ssoToken || parsedValue.SSOTOKEN || parsedValue.ssotoken || parsedValue.ssoidToken || parsedValue.ssoidtoken;
  if (typeof tokenVal === "string" && tokenVal.trim()) {
    return tokenVal.trim();
  }

  for (const nestedValue of Object.values(parsedValue)) {
    const token = findSsoToken(nestedValue);
    if (token) return token;
  }

  return null;
}

async function postBackendJson(path, payload) {
  const response = await fetch(`${BACKEND_BASE}/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload ?? {}),
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? safeJson(text) : {};

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

export async function processEmitraCallbackOnServer(callbackParams) {
  if (!callbackParams?.encData) return null;

  try {
    let decryptedData;
    let decryptResponse;
    try {
      decryptedData = parseDecryptedEmitraData(callbackParams.encData);
      decryptResponse = {
        ok: true,
        status: 200,
        data: {
          status: 200,
          message: "Success",
          data: decryptedData
        }
      };
      console.log("Local decryption successful");
    } catch (decErr) {
      console.error("Local decryption failed:", decErr);
      return {
        error: decErr.message || "Decryption failed",
      };
    }

    const ssoToken = findSsoToken(decryptedData);

    // Fetch kiosk details using decrypted credentials (fallback to defaults if missing)
    const merchantCode = decryptedData.MERCHANTCODE || "REMARKEDU24";
    const ssoId = decryptedData.SSOID || decryptedData.ssoId || decryptedData.ssoid || "PRACHEE.GAUR";

    let kioskResponse = null;
    try {
      kioskResponse = await postBackendJson("fetchKioskDetails", {
        MERCHANTCODE: merchantCode,
        SSOID: ssoId,
      });
      if (process.env.NODE_ENV === "development") {
        console.log("fetchKioskDetails response", JSON.stringify(kioskResponse, null, 2));
      }
    } catch (kioskErr) {
      console.error("fetchKioskDetails call failed", kioskErr);
    }

    // Fetch merchant token
    let tokenResponse = null;
    try {
      tokenResponse = await postBackendJson("generateAuthorizationToken", {
        cleintId: "REMARKEDU24",
        clientSecret: "94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315",
      });
      if (process.env.NODE_ENV === "development") {
        console.log("generateAuthorizationToken response", JSON.stringify(tokenResponse, null, 2));
      }
    } catch (tokenErr) {
      console.error("generateAuthorizationToken call failed", tokenErr);
    }

    if (!ssoToken) {
      if (process.env.NODE_ENV === "development") {
        console.log("verifySSOToken skipped: ssoToken key not found in decrypted response");
      }
      return { decryptResponse, ssoToken: null, verifyResponse: null, kioskResponse, tokenResponse };
    }

    const verifyResponse = await postBackendJson("verifySSOToken", { ssoToken });
    if (process.env.NODE_ENV === "development") {
      console.log("verifySSOToken response", JSON.stringify(verifyResponse, null, 2));
    }

    return { decryptResponse, ssoToken, verifyResponse, kioskResponse, tokenResponse };
  } catch (error) {
    console.error("E-Mitra server callback processing failed", error);
    return {
      error: error.message || "E-Mitra server callback processing failed",
    };
  }
}
