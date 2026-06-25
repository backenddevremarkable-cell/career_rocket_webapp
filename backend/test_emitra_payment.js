const axios = require('axios');
const crypto = require('crypto');

const EMITRA_CLIENT_ID = 'REMARKEDU24';
const EMITRA_CLIENT_SECRET = '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315';
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

function decrypt(textToDecrypt, password) {
    const { key, iv } = getKeyAndIV(password);
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decrypted = decipher.update(textToDecrypt, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

async function authorizeToken() {
    try {
        const payload = { cleintId: EMITRA_CLIENT_ID, clientSecret: EMITRA_CLIENT_SECRET };
        const response = await axios.post("https://emitraapp.rajasthan.gov.in/emgt/oauth/merchant/token", payload, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.log("Token Generation Error:", error.response?.data || error.message);
        return null;
    }
}

async function testChecksumKey(secretKey, label) {
    const tokenResponse = await authorizeToken();
    const accessToken = tokenResponse?.data?.access_token;
    if (!accessToken) {
        console.error("No access token generated!");
        return;
    }

    const payload = {
        "MERCHANTCODE": "REMARKEDU24",
        "REQUESTID": "CR" + Date.now(),
        "REQTIMESTAMP": "20260606135418768",
        "SERVICEID": "14111",
        "SUBSERVICEID": "1111",
        "REVENUEHEAD": "6382-999.0016383-100.00",
        "CONSUMERKEY": "9521466932",
        "CONSUMERNAME": "Gayatri",
        "COMMTYPE": "3",
        "SSOID": "PRACHEE.GAUR",
        "OFFICECODE": "REMARKEDUHQ",
        "SSOTOKEN": "bE5PdTRuRFpXNEFVdWxuYXBNTnZXQWJiM21oV3VITGE3M3VhK1dpZEtGNzhyNkFYcjZWczhSNW1jNXJhQjZVMFVOSjQ4bFdPVmZSaVREWjRzazhFQndxZXUrVHduZm5IU0ZJZ2YvSSs5Q3BCYkNOdkt6c2pmeU9VdjdSWHJHdFdWVXJtdTlxZkdVYVFNYVhHQkpicUIrcEFyZ3FYcmdPZS8raEJHYjhhci83bVBaLzlmYUFjMHpPTHhOQXVPb1VO"
    };

    // Calculate checksum
    const checksumStr = `${payload.MERCHANTCODE}${payload.SERVICEID}${payload.REQUESTID}${payload.REVENUEHEAD}${payload.CONSUMERKEY}${payload.CONSUMERNAME}${payload.SSOTOKEN}${secretKey}`;
    payload.CHECKSUM = crypto.createHash('md5').update(checksumStr).digest('hex');

    const jsonStr = JSON.stringify(payload);
    const encStr = encrypt(jsonStr, CORRECT_ENCRYPTION_KEY);

    const url = "https://emitraapp.rajasthan.gov.in/webServicesRepository/backtobackTransactionWithEncryptionA";
    const formData = new URLSearchParams();
    formData.append("encData", encStr);

    try {
        const res = await axios.post(url, formData.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (typeof res.data === "string" && res.data.trim()) {
            const decResponse = decrypt(res.data, CORRECT_ENCRYPTION_KEY);
            console.log(`\nChecksum Key [${label}]:`);
            console.log(JSON.stringify(JSON.parse(decResponse), null, 2));
        } else {
            console.log(`\nChecksum Key [${label}]: empty response`);
        }
    } catch (err) {
        console.log(`Failed on [${label}]:`, err.message);
    }
}

async function run() {
    await testChecksumKey(CORRECT_ENCRYPTION_KEY, "Encryption Key (E-m!tr@2016)");
    await testChecksumKey(EMITRA_CLIENT_SECRET, "Client Secret Key");
    await testChecksumKey("", "No Secret Key");
}

run();
