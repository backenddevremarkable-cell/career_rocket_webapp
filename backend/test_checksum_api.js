const crypto = require('crypto');

const password = "E-m!tr@2016";
const text = "Hello e-Mitra!";

// Frontend implementation
function getAesKeyFrontend(password) {
  return Buffer.from(
    crypto.createHash("sha256").update(password).digest("hex").slice(0, 32),
    "hex"
  );
}

function encryptFrontend(text, password) {
  const key = getAesKeyFrontend(password);
  const cipher = crypto.createCipheriv("aes-128-cbc", key, key);
  return Buffer.concat([cipher.update(String(text), "utf8"), cipher.final()]).toString("base64");
}

// Backend implementation
function getKeyAndIVBackend(password) {
    const hash = crypto.createHash("sha256").update(password, "utf8").digest();
    const key = hash.slice(0, 16);
    const iv = hash.slice(0, 16);
    return { key, iv };
}

function decryptBackend(textToDecrypt, password) {
    const { key, iv } = getKeyAndIVBackend(password);
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decrypted = decipher.update(textToDecrypt, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

function encryptBackend(textToEncrypt, password) {
    const { key, iv } = getKeyAndIVBackend(password);
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encrypted = cipher.update(textToEncrypt, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

try {
    const encFront = encryptFrontend(text, password);
    console.log("Encrypted with Frontend:", encFront);

    const decBack = decryptBackend(encFront, password);
    console.log("Decrypted with Backend:", decBack);

    const encBack = encryptBackend(text, password);
    console.log("Encrypted with Backend:", encBack);

    console.log("Frontend Encrypted equals Backend Encrypted?", encFront === encBack);
} catch (e) {
    console.error("Encryption mismatch error:", e.message);
}
