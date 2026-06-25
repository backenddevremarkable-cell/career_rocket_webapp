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

async function testFormula(index, fields, secretKey) {
    const tokenResponse = await authorizeToken();
    const accessToken = tokenResponse?.data?.access_token;
    if (!accessToken) return;

    const payload = {
        "MERCHANTCODE": "REMARKEDU24",
        "REQUESTID": "CR" + Date.now() + index,
        "REQTIMESTAMP": "20260606135418768",
        "SERVICEID": "14111",
        "SUBSERVICEID": "1111",
        "REVENUEHEAD": "6382-999.0016383-100.00",
        "CONSUMERKEY": "9521466932",
        "CONSUMERNAME": "Gayatri", // Trimmed
        "COMMTYPE": "3",
        "SSOID": "PRACHEE.GAUR",
        "OFFICECODE": "REMARKEDUHQ",
        "SSOTOKEN": "bE5PdTRuRFpXNEFVdWxuYXBNTnZXQWJiM21oV3VITGE3M3VhK1dpZEtGNzhyNkFYcjZWczhSNW1jNXJhQjZVMFVOSjQ4bFdPVmZSaVREWjRzazhFQndxZXUrVHduZm5IU0ZJZ2YvSSs5Q3BCYkNOdkt6c2pmeU9VdjdSWHJHdFdWVXJtdTlxZkdVYVFNYVhHQkpicUIrcEFyZ3FYcmdPZS8raEJHYjhhci83bVBaLzlmYUFjMHpPTHhOQXVPb1VO"
    };

    // Calculate checksum
    const concatenatedStr = fields.map(f => payload[f] || '').join('') + secretKey;
    payload.CHECKSUM = crypto.createHash('md5').update(concatenatedStr).digest('hex');

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
            const parsed = JSON.parse(decResponse);
            console.log(`Formula ${index}: [${fields.join(' + ') + (secretKey ? ' + Key' : '')}] -> MSG: "${parsed.MSG}", Status: "${parsed.TRANSACTIONSTATUS}"`);
            if (parsed.MSG !== "Invalid Checksum") {
                console.log("==> FOUND CORRECT CHECKSUM FORMULA!");
                console.log(JSON.stringify(parsed, null, 2));
            }
        }
    } catch (err) {
        console.log(`Formula ${index} Failed:`, err.message);
    }
}

async function run() {
    const formulas = [
        // 1
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'], key: CORRECT_ENCRYPTION_KEY },
        // 2
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'SSOTOKEN'], key: CORRECT_ENCRYPTION_KEY },
        // 3
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME'], key: CORRECT_ENCRYPTION_KEY },
        // 4
        { fields: ['MERCHANTCODE', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'], key: CORRECT_ENCRYPTION_KEY },
        // 5
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID', 'SSOTOKEN'], key: CORRECT_ENCRYPTION_KEY },
        // 6
        { fields: ['MERCHANTCODE', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'SSOTOKEN'], key: CORRECT_ENCRYPTION_KEY },
        // 7
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID'], key: CORRECT_ENCRYPTION_KEY },
        // 8
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY'], key: CORRECT_ENCRYPTION_KEY },
        // 9
        { fields: ['MERCHANTCODE', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY'], key: CORRECT_ENCRYPTION_KEY },
        // 10
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'], key: "" },
        // 11
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'], key: EMITRA_CLIENT_SECRET },
        // 12
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'SSOTOKEN'], key: EMITRA_CLIENT_SECRET },
        // 13
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME'], key: EMITRA_CLIENT_SECRET },
        // 14
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY'], key: EMITRA_CLIENT_SECRET },
        // 15
        { fields: ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOID', 'SSOTOKEN'], key: EMITRA_CLIENT_SECRET }
    ];

    for (let i = 0; i < formulas.length; i++) {
        await testFormula(i + 1, formulas[i].fields, formulas[i].key);
        // Throttle slightly to prevent spamming
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

run();
