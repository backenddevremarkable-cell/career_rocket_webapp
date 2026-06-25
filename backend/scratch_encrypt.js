const crypto = require('crypto');
const CORRECT_ENCRYPTION_KEY = 'E-m!tr@2016';

function getKeyAndIV(password) {
    const hash = crypto.createHash("sha256").update(password, "utf8").digest();
    const key = hash.slice(0, 16);
    const iv = hash.slice(0, 16);
    return { key, iv };
}

function encrypt(textToEncrypt, password) {
    const { key, iv } = getKeyAndIV(password);
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encrypted = cipher.update(textToEncrypt, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

const mockPayload = {
    SSOID: "PRACHEE.GAUR",
    SERVICEID: "14112", // Scholarship Test
    EMSESSIONID: "f64bcb11-e039-48f2-821a-992eec06645e",
    KIOSKCODE: "K11000142",
    OLDKIOSKCODE: "D97K0003",
    DISTRICTCD: "110",
    TEHSILCD: "00560",
    RETURNURL: "https://emitraapp.rajasthan.gov.in/emitra-rhocp/emitra/kiosk/availService?jsessionid=f64bcb11-e039-48f2-821a-992eec06645e&",
    EMITRATIMESTAMP: "20260606112509184",
    SSOTOKEN: "bE5PdTRuRFpXNEFVdWxuYXBNTnZXQWJiM21oV3VITGE3M3VhK1dpZEtGNzhyNkFYcjZWczhSNW1jNXJhQjZVMFVOSjQ4bFdPVmZSaVREWjRzazhFQndxZXUrVHduZm5IU0ZJZ2YvSSs5Q3BCYkNOdkt6c2pmeU9VdjdSWHJHdFdWVXJtdTlxZkdVYVFNYVhHQkpicUIrcEFyZ3FYcmdPZS8raEJHYjhhci83bVBaLzlmYUFjMHpPTHhOQXVPb1VO",
    CHECKSUM: "e6c057cb17dc7155d0eccfdeeb4ae0b1"
};

const jsonStr = JSON.stringify(mockPayload);
const encStr = encrypt(jsonStr, CORRECT_ENCRYPTION_KEY);
console.log("Encrypted payload:");
console.log(encodeURIComponent(encStr));
