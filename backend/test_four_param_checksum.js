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

// Generate permutations of an array
function permute(arr) {
    let result = [];
    function helper(m = []) {
        if (m.length === arr.length) {
            result.push(m);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (m.includes(arr[i])) continue;
            helper(m.concat(arr[i]));
        }
    }
    helper();
    return result;
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
    
    // Constant request params
    const MERCHANTCODE = "REMARKEDU24";
    const SERVICEID = "14111";
    const SUBSERVICEID = "1111";
    const REVENUEHEAD = "6382-999.0016383-100.00";
    const CONSUMERKEY = "7014151588";
    const CONSUMERNAME = "Poonam Chand ";
    const COMMTYPE = "3";
    const OFFICECODE = "REMARKEDUHQ";

    // Dynamic but constant for calculation
    const REQUESTID = "CR" + Date.now();
    const REQTIMESTAMP = "20260607183114357";

    const paramValues = {
        SSOID,
        REQUESTID,
        REQTIMESTAMP,
        SSOTOKEN
    };

    const keysToPermute = ['SSOID', 'REQUESTID', 'REQTIMESTAMP', 'SSOTOKEN'];
    const permutations = permute(keysToPermute);

    const keyCandidates = [
        { label: "No Key", val: "" },
        { label: "Encryption Key", val: CORRECT_ENCRYPTION_KEY },
        { label: "Client Secret", val: EMITRA_CLIENT_SECRET }
    ];

    console.log(`Starting execution for ${permutations.length} permutations...`);

    let index = 0;
    for (const p of permutations) {
        for (const keyCand of keyCandidates) {
            // Formula 1: Direct concatenation
            const concatStr = p.map(k => paramValues[k]).join('') + keyCand.val;
            const md5_1 = crypto.createHash('md5').update(concatStr).digest('hex');

            // Formula 2: Pipe separated with trailing key
            const pipeStrTrailing = p.map(k => paramValues[k]).join('|') + '|' + keyCand.val;
            const md5_2 = crypto.createHash('md5').update(pipeStrTrailing).digest('hex');

            // Formula 3: Pipe separated, key directly appended
            const pipeStrDirect = p.map(k => paramValues[k]).join('|') + keyCand.val;
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
                    CONSUMERNAME,
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
                        if (parsed.MSG !== "Invalid Checksum") {
                            console.log("\n=============================================");
                            console.log("SUCCESS! FOUND CORRECT CHECKSUM FORMULA!");
                            console.log("Permutation:", p.join(' + '));
                            console.log("Key Variant:", keyCand.label);
                            console.log("Type:", f.type);
                            console.log("Concatenated String:", f.str);
                            console.log("Checksum:", f.checksum);
                            console.log("Response:", JSON.stringify(parsed, null, 2));
                            console.log("=============================================\n");
                            return;
                        } else {
                            // Print progress
                            if (index % 20 === 0) {
                                console.log(`Tested ${index} formulas... Still invalid.`);
                            }
                        }
                    }
                } catch (err) {
                    console.log(`Error testing formula ${index}:`, err.message);
                }

                // Throttle slightly to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 150));
            }
        }
    }
    console.log("Completed search. No correct checksum formula found among these variations.");
}

run();
