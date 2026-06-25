const SECRET_KEY = "12345678901234567890123456789012";

function uint8ArrayToBase64(uint8Array) {
  let binary = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function customEncrypt(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(String(text));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET_KEY),
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(16));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    data
  );

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  let base64 = uint8ArrayToBase64(combined);

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function customDecrypt(payload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";

  const binary = base64ToUint8Array(b64);

  const iv = binary.slice(0, 16);
  const data = binary.slice(16);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET_KEY),
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    data
  );

  return decoder.decode(decrypted);
}