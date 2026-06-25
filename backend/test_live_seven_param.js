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
    const SSOTOKEN = "Z3Jzam5ManlIdjZGaTlTRFlzbFc0eVZON3pxZVJEMm8wMnRQOXlXaHczelc5a1FNczQ3VTd6ZHcxOVg4WjhkOFFnUFhsbXc4bHMwTmh4MXRqTFpLM2hGNm5ERXdwNS9tWmFLM2N3UTRSWStkUkpBbUpWTzFmbS9iaUhldVhOYVYrTEdKdGhVT3dNcnFGd0JIWlRQYmxQTVJselJMVm5UNHo1WGxKZWs5VVlyY0dmOG9hckMrU094OVRBK29OdTVP";
    
    const MERCHANTCODE = "REMARKEDU24";
    const SERVICEID = "14111";
    const SUBSERVICEID = "1111";
    const REVENUEHEAD = "6382-999.006383-100.00";
    const CONSUMERKEY = "7014151588";
    const CONSUMERNAME = "Poonam Chand ";
    const COMMTYPE = "3";
    const OFFICECODE = "REMARKEDUHQ";

    const REQUESTID = "CR" + Date.now();
    const REQTIMESTAMP = "20260607183114357";

    const payloadValues = {
        MERCHANTCODE,
        SERVICEID,
        REQUESTID,
        REVENUEHEAD,
        CONSUMERKEY,
        CONSUMERNAME,
        SSOTOKEN
    };

    // Common 7-parameter orderings
    const orderings = [
        // 1. MerchantCode + ServiceID + RequestID + RevenueHead + ConsumerKey + ConsumerName + SsoToken
        ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'],
        // 2. MerchantCode + RequestID + ServiceID + RevenueHead + ConsumerKey + ConsumerName + SsoToken
        ['MERCHANTCODE', 'REQUESTID', 'SERVICEID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'],
        // 3. Alphabetical order of the 7 parameters
        ['CONSUMERKEY', 'CONSUMERNAME', 'MERCHANTCODE', 'REQUESTID', 'REVENUEHEAD', 'SERVICEID', 'SSOTOKEN'],
        // 4. Insertion order of the 7 parameters
        ['MERCHANTCODE', 'REQUESTID', 'SERVICEID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'],
        // 5. Without RevenueHead
        ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'CONSUMERKEY', 'CONSUMERNAME', 'SSOTOKEN'],
        // 6. Without ConsumerName
        ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'SSOTOKEN'],
        // 7. MerchantCode + ServiceID + RequestID + RevenueHead + ConsumerKey + ConsumerName (no token)
        ['MERCHANTCODE', 'SERVICEID', 'REQUESTID', 'REVENUEHEAD', 'CONSUMERKEY', 'CONSUMERNAME']
    ];

    const keyCandidates = [
        { label: "No Key", val: "" },
        { label: "Encryption Key", val: CORRECT_ENCRYPTION_KEY },
        { label: "Client Secret", val: EMITRA_CLIENT_SECRET },
        { label: "Merchant Code", val: MERCHANTCODE }
    ];

    console.log(`Starting live execution for 7-param variants...`);

    let index = 0;
    for (const fields of orderings) {
        for (const keyCand of keyCandidates) {
            // Test combinations with CONSUMERNAME as is and trimmed (since it has a trailing space)
            const nameVariants = ["Poonam Chand", "Poonam Chand"];

            for (const nameVal of nameVariants) {
                const vals = { ...payloadValues, CONSUMERNAME: nameVal };

                // Direct concat
                const concatStr = fields.map(k => vals[k]).join('') + keyCand.val;
                const md5_1 = crypto.createHash('md5').update(concatStr).digest('hex');

                // Pipe joined trailing
                const pipeStrTrailing = fields.map(k => vals[k]).join('|') + '|' + keyCand.val;
                const md5_2 = crypto.createHash('md5').update(pipeStrTrailing).digest('hex');

                // Pipe joined direct
                const pipeStrDirect = fields.map(k => vals[k]).join('|') + keyCand.val;
                const md5_3 = crypto.createHash('md5').update(pipeStrDirect).digest('hex');

                const formulas = [
                    { type: "direct", str: concatStr, checksum: md5_1 },
                    { type: "pipe-trailing", str: pipeStrTrailing, checksum: md5_2 },
                    { type: "pipe-direct", str: pipeStrDirect, checksum: md5_3 }
                ];

                for (const f of formulas) {
                    index++;
                    const payload = {
                        MERCHANTCODE,
                        REQUESTID,
                        REQTIMESTAMP,
                        SERVICEID,
                        SUBSERVICEID,
                        REVENUEHEAD,
                        CONSUMERKEY,
                        CONSUMERNAME: nameVal, // Try matching variant
                        COMMTYPE,
                        SSOID,
                        OFFICECODE,
                        SSOTOKEN,
                        CHECKSUM: f.checksum
                    };

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
                            const parsed = JSON.parse(decrypted);
                            if (parsed.MSG !== "Invalid Checksum" && parsed.TRANSACTIONSTATUSCODE !== "310") {
                                console.log("\n=============================================");
                                console.log("SUCCESS! FOUND CORRECT CHECKSUM FORMULA!");
                                console.log("Fields order:", fields.join(' + '));
                                console.log("ConsumerName used:", `"${nameVal}"`);
                                console.log("Key Variant:", keyCand.label);
                                console.log("Type:", f.type);
                                console.log("Concatenated String:", f.str);
                                console.log("Checksum:", f.checksum);
                                console.log("Response:", JSON.stringify(parsed, null, 2));
                                console.log("=============================================\n");
                                return;
                            }
                        }
                    } catch (err) {
                        // Ignore
                    }
                    
                    if (index % 50 === 0) {
                        console.log(`Tested ${index} 7-param live permutations...`);
                    }

                    await new Promise(resolve => setTimeout(resolve, 80));
                }
            }
        }
    }
    console.log("Completed. No 7-param formula succeeded.");
}

run();
