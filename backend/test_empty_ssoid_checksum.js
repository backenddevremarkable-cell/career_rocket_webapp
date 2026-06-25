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

async function run() {
    const tokenResponse = await authorizeToken();
    const accessToken = tokenResponse?.data?.access_token;
    if (!accessToken) {
        console.error("No access token!");
        return;
    }

    const SSOID = "PRACHEE.GAUR";
    const SSOTOKEN = "Z3Jsam5ManlIdjZGaTlTRFlzbFc0eVZON3pxZVJEMm8wMnRQOXlXaHczelc5a1FNczQ3VTd6ZHcxOVg4WjhkOFFnUFhsbXc4bHMwTmh4MXRqTFpLM2hGNm5ERXdwNS9tWmFLM2N3UTRSWStkUkpBbUpWTzFmbS9iaUhldVhOYVYrTEdKdGhVT3dNcnFGd0JIWlRQYmxQTVJselJMVm5UNHo1WGxKZWs5VVlyY0dmOG9hckMrU094OVRBK29OdTVP";
    
    const MERCHANTCODE = "REMARKEDU24";
    const SERVICEID = "14111";
    const SUBSERVICEID = "1111";
    const REVENUEHEAD = "6382-999.0016383-100.00";
    const CONSUMERKEY = "7014151588";
    const CONSUMERNAME = "Poonam Chand ";
    const COMMTYPE = "3";
    const OFFICECODE = "REMARKEDUHQ";

    const REQUESTID = "CR" + Date.now();
    const REQTIMESTAMP = "20260607183114357";

    // Build the payload
    const payload = {
        MERCHANTCODE,
        REQUESTID,
        REQTIMESTAMP,
        SERVICEID,
        SUBSERVICEID,
        REVENUEHEAD,
        CONSUMERKEY,
        CONSUMERNAME,
        COMMTYPE,
        SSOID,
        OFFICECODE,
        SSOTOKEN
    };

    // Calculate checksum using empty string for SSOID
    const checksumPayload = { ...payload, SSOID: "" };
    const checksumStr = `${checksumPayload.SSOID}${checksumPayload.REQUESTID}${checksumPayload.REQTIMESTAMP}${checksumPayload.SSOTOKEN}${CORRECT_ENCRYPTION_KEY}`;
    const CHECKSUM = crypto.createHash('md5').update(checksumStr).digest('hex');
    payload.CHECKSUM = CHECKSUM;

    const encPayload = encrypt(JSON.stringify(payload), CORRECT_ENCRYPTION_KEY);
    const formData = new URLSearchParams();
    formData.append("encData", encPayload);

    try {
        const res = await axios.post(
            "https://emitraapp.rajasthan.gov.in/webServicesRepository/backtobackTransactionWithEncryptionA",
            formData.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        );
        
        if (typeof res.data === "string" && res.data.trim()) {
            const decrypted = decrypt(res.data.trim(), CORRECT_ENCRYPTION_KEY);
            console.log("Response with empty SSOID in checksum:", JSON.stringify(JSON.parse(decrypted), null, 2));
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

run();
