import crypto from "crypto";

export const EMITRA_SERVICE_URLS = {
  tokenUat: "https://emitrauat.rajasthan.gov.in/sso/oauth/token",
  tokenProduction: "https://emitra.rajasthan.gov.in/sso/oauth/token",
  merchantToken: "https://emitraapp.rajasthan.gov.in/emgt/oauth/merchant/token",
  merchantRefresh: "https://emitraapp.rajasthan.gov.in/emgt/oauth/merchant/genaccess",
  verifySsoToken: "https://sso.rajasthan.gov.in:4443/SSOREST/GetTokenDetailJSON",
  kioskDetailsUat:
    "https://emitrauat.rajasthan.gov.in/webServicesRepositoryUat/getKioskDetailsJSON",
  kioskDetailsProduction:
    "https://emitraapp.rajasthan.gov.in/webServicesRepository/getKioskDetailsJSON",
  backToBackProduction:
    "https://emitraapp.rajasthan.gov.in/webServicesRepository/backtobackTransactionWithEncryptionA",
  backToBackUat:
    "https://emitrauat.rajasthan.gov.in/emuatsso/ets/services/v3/transaction/backtobackTransactionWithEncryptionA",
  updateApplicationProduction:
    "https://emitraapp.rajasthan.gov.in/webServicesRepository/updateApplicationIdWithEncryption",
  updateApplicationUat:
    "https://emitrauat.rajasthan.gov.in/emuatsso/ets/services/v3/transaction/updateApplicationIdWithEncryption",
  verifyTransactionProduction:
    "https://emitraapp.rajasthan.gov.in/webServicesRepository/getTokenVerifyNewProcessByRequestIdWithEncryption",
  verifyTransactionUat:
    "https://emitrauat.rajasthan.gov.in/emuatsso/ets/services/v3/transaction/getTokenVerifyNewProcessByRequestIdWithEncryption",
  cancelTransactionProduction:
    "https://emitraapp.rajasthan.gov.in/webServicesRepository/backendTransCancelByDepartmentWithEncryption",
  cancelTransactionUat:
    "https://emitrauat.rajasthan.gov.in/emuatsso/ets/services/v3/transaction/backendTransCancelByDepartmentWithEncryption",
};

const EMITRA_ENV = process.env.EMITRA_ENV === "uat" ? "uat" : "production";
const EMITRA_ENCRYPTION_KEY =
  process.env.EMITRA_ENCRYPTION_KEY || "E-m!tr@2016";
const EMITRA_CLIENT_ID = process.env.EMITRA_CLIENT_ID;
const EMITRA_CLIENT_SECRET = process.env.EMITRA_CLIENT_SECRET;

function getAesKey(password = EMITRA_ENCRYPTION_KEY) {
  return Buffer.from(
    crypto.createHash("sha256").update(password).digest("hex").slice(0, 32),
    "hex"
  );
}

export function encryptEmitraPayload(text, password = EMITRA_ENCRYPTION_KEY) {
  const key = getAesKey(password);
  const cipher = crypto.createCipheriv("aes-128-cbc", key, key);
  return Buffer.concat([cipher.update(String(text), "utf8"), cipher.final()]).toString(
    "base64"
  );
}

export function decryptEmitraPayload(
  encryptedText,
  password = EMITRA_ENCRYPTION_KEY
) {
  const key = getAesKey(password);
  const cleanText = String(encryptedText || "").replace(/ /g, "+");
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, key);
  return Buffer.concat([
    decipher.update(cleanText, "base64"),
    decipher.final(),
  ]).toString("utf8");
}

export function parseDecryptedEmitraData(encData) {
  const decryptedText = decryptEmitraPayload(encData);
  try {
    return JSON.parse(decryptedText);
  } catch {
    return decryptedText;
  }
}

export function buildChecksumString(payload, fields, secret = "") {
  return `${fields.map((key) => payload?.[key] || "").join("")}${secret}`;
}

export function calculateChecksum(payload, fields, secret = "") {
  return crypto
    .createHash("md5")
    .update(buildChecksumString(payload, fields, secret))
    .digest("hex");
}

export function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

async function readUpstreamJson(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload ?? {}),
  });
  const data = await readUpstreamJson(response);
  return { ok: response.ok, status: response.status, data };
}

async function postForm(url, formData, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers },
    body: formData.toString(),
  });
  const data = await readUpstreamJson(response);
  return { ok: response.ok, status: response.status, data };
}

export async function authorizeToken() {
  if (!EMITRA_CLIENT_ID || !EMITRA_CLIENT_SECRET) {
    throw new Error("EMITRA_CLIENT_ID and EMITRA_CLIENT_SECRET are required");
  }

  const response = await postJson(EMITRA_SERVICE_URLS.merchantToken, {
    cleintId: EMITRA_CLIENT_ID,
    clientSecret: EMITRA_CLIENT_SECRET,
  });

  if (!response.ok) {
    throw new Error(
      `Token generation failed with status ${response.status}: ${JSON.stringify(
        response.data
      )}`
    );
  }

  return response.data;
}

export function extractAccessToken(tokenResponse) {
  return (
    tokenResponse?.data?.access_token ||
    tokenResponse?.data?.accessToken ||
    tokenResponse?.access_token ||
    tokenResponse?.accessToken ||
    null
  );
}

export async function generateAuthorizationToken(payload) {
  return postJson(EMITRA_SERVICE_URLS.merchantToken, payload);
}

export async function regenerateAuthorizationToken(refreshToken) {
  return postJson(EMITRA_SERVICE_URLS.merchantRefresh, {
    refresh_token: refreshToken,
  });
}

export async function fetchKioskDetails(payload) {
  const formData = new URLSearchParams();
  formData.append("MERCHANTCODE", encodeURIComponent(payload.MERCHANTCODE));
  formData.append("SSOID", encodeURIComponent(payload.SSOID));

  return postForm(
    EMITRA_ENV === "uat"
      ? EMITRA_SERVICE_URLS.kioskDetailsUat
      : EMITRA_SERVICE_URLS.kioskDetailsProduction,
    formData
  );
}

export async function verifySsoToken(ssoToken) {
  const response = await fetch(
    `${EMITRA_SERVICE_URLS.verifySsoToken}/${encodeURIComponent(ssoToken)}`
  );
  const data = await readUpstreamJson(response);
  return { ok: response.ok, status: response.status, data };
}

export async function callEncryptedTransaction(url, payload) {
  const tokenResponse = await authorizeToken();
  const accessToken = extractAccessToken(tokenResponse);

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const formData = new URLSearchParams();
  formData.append("encData", encryptEmitraPayload(JSON.stringify(payload)));

  return postForm(url, formData, { Authorization: `Bearer ${accessToken}` });
}

export function getTransactionUrl(type) {
  const urls = {
    backToBack:
      EMITRA_ENV === "uat"
        ? EMITRA_SERVICE_URLS.backToBackUat
        : EMITRA_SERVICE_URLS.backToBackProduction,
    updateApplication:
      EMITRA_ENV === "uat"
        ? EMITRA_SERVICE_URLS.updateApplicationUat
        : EMITRA_SERVICE_URLS.updateApplicationProduction,
    verifyTransaction:
      EMITRA_ENV === "uat"
        ? EMITRA_SERVICE_URLS.verifyTransactionUat
        : EMITRA_SERVICE_URLS.verifyTransactionProduction,
    cancelTransaction:
      EMITRA_ENV === "uat"
        ? EMITRA_SERVICE_URLS.cancelTransactionUat
        : EMITRA_SERVICE_URLS.cancelTransactionProduction,
  };

  return urls[type];
}
