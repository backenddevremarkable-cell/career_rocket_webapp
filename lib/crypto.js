import crypto from "crypto";

const SECRET_KEY = Buffer.from("12345678901234567890123456789012");

export const customEncrypt = (text) => {
  const input = String(text);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);
  let encrypted = cipher.update(input, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const payload = Buffer.concat([iv, encrypted]).toString("base64");

  return payload.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const customDecrypt = (payload) => {
  try {
    if (!payload || typeof payload !== "string") {
      throw new Error("Invalid encrypted payload");
    }

    let b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) {
      b64 += "=";
    }

    const data = Buffer.from(b64, "base64");

    // Minimum 17 bytes hone chahiye:
    // 16 IV + at least 1 encrypted byte
    if (data.length < 17) {
      throw new Error("Encrypted payload too short");
    }

    const iv = data.slice(0, 16);
    const ciphertext = data.slice(16);

    if (iv.length !== 16) {
      throw new Error(`Invalid IV length: ${iv.length}`);
    }

    const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
    let decrypted = decipher.update(ciphertext);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Decrypt Error:", error.message);
    return null; // ya throw error kar sakte ho
  }
};