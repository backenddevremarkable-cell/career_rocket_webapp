const jwt = require('jsonwebtoken');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const dbModels = require('../models');
const { Op } = require('sequelize');
const stringConstant = require('../config/stringConstant');
const appContants = require('../config/config');

const { Student, Division, DivisionCity, Block, DeviceInfo, Services, CounsellingSession } = dbModels;

const CORRECT_ENCRYPTION_KEY = 'E-m!tr@2016';

function getKeyAndIV(password) {
    // SHA256 hash
    const hash = crypto
        .createHash("sha256")
        .update(password, "utf8")
        .digest();

    // First 16 bytes only
    const key = hash.slice(0, 16);
    const iv = hash.slice(0, 16);

    return { key, iv };
}

function encrypt(textToEncrypt, password) {
    const { key, iv } = getKeyAndIV(password);

    const cipher = crypto.createCipheriv(
        "aes-128-cbc",
        key,
        iv
    );

    let encrypted = cipher.update(textToEncrypt, "utf8", "base64");
    encrypted += cipher.final("base64");

    return encrypted;
}

function decrypt(textToDecrypt, password) {
    const { key, iv } = getKeyAndIV(password);
    const cleanText = String(textToDecrypt || "").replace(/ /g, "+");

    const decipher = crypto.createDecipheriv(
        "aes-128-cbc",
        key,
        iv
    );

    let decrypted = decipher.update(
        cleanText,
        "base64",
        "utf8"
    );
    decrypted += decipher.final("utf8");

    return decrypted;
}

function buildChecksumString(payload, fields, secret = '') {
    return `${fields.map((k) => payload[k] || '').join('')}${secret}`;
}

function calculateChecksum(payload, fields, secret = '') {
    const str = buildChecksumString(payload, fields, secret);
    return crypto.createHash('md5').update(str).digest('hex');
}

async function authorizeToken() {
    try {
        const payload = { cleintId: appContants.EMITRA_CLIENT_ID, clientSecret: appContants.EMITRA_CLIENT_SECRET };
        const response = await axios.post("https://emitraapp.rajasthan.gov.in/emgt/oauth/merchant/token", payload,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Token Generation Error:", error.response?.data || error.message);
        return null;
    }
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;

exports.studentLogin = async (req, res) => {
    try {
        let mobileNo = req.body.mobileNo || req.body.mobile;
        let exists = await Student.findOne({ where: { mobileNo } });
        if (!exists) return res.status(400).json({ status: 400, message: stringConstant.REGISTER_MSG });
        const payload = {
            id: exists.id,
            userType: "student",
            jwtVersion: (exists.jwtVersion || 0) + 1,
            isAuthenticate: true
        };
        const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey123";
        const TOKEN_EXPIRY = "2d";
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
        exists.jwtVersion = (exists.jwtVersion || 0) + 1;
        await exists.save();
        if (DeviceInfo) {
            await DeviceInfo.destroy({ where: { userId: exists.id, userType: 'student' } });
        }
        return res.status(200).json({ message: stringConstant.COMMON_SUCCESS_MSG, token, response: exists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
}

exports.getDivisionByStateId = async (req, res) => {
    try {
        const divisions = await Division.findAll({ where: { stateId: req.body.stateId, status: true, isDeleted: false } });
        if (!divisions || divisions.length === 0) return res.status(400).json({ status: 400, message: stringConstant.RECORD_NOT_FOUND });
        res.status(200).json({ status: 200, message: stringConstant.COMMON_SUCCESS_MSG, data: divisions });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

exports.getDivisionCitiesByDivisionId = async (req, res) => {
    try {
        const { divisionId } = req.body;
        const list = await DivisionCity.findAll({ where: { divisionId: divisionId, isDeleted: false }, order: [['id', 'ASC']] });
        if (!list || list.length === 0) return res.status(400).json({ status: 400, message: stringConstant.RECORD_NOT_FOUND });
        res.status(200).json({ status: 200, message: stringConstant.COMMON_SUCCESS_MSG, data: list });
    } catch (error) {
        res.status(500).json({ status: 500, message: stringConstant.INTERNAL_SERVER_ERROR });
    }
};

exports.getBlocksByCityId = async (req, res) => {
    try {
        let Blocks;
        let userType = req.decoded?.userType;
        if (userType === 'counsellor') {
            Blocks = await Block.findAll({ where: { divisionCityId: req.body.id, status: true, isDeleted: false } });
        } else {
            Blocks = await Block.findAll({ where: { cityId: req.body.id, isDeleted: false } });
        }
        if (userType === undefined) {
            Blocks = await Block.findAll({ where: { divisionCityId: req.body.id, status: true, isDeleted: false } });
        }
        if (!Blocks || Blocks.length === 0) return res.status(400).json({ status: 400, message: stringConstant.RECORD_NOT_FOUND });
        res.status(200).json({ status: 200, message: stringConstant.COMMON_SUCCESS_MSG, data: Blocks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const { category, courseName, courseId, type } = req.query;
        const where = { isDeleted: false };
        if (courseId) where.id = courseId;
        if (courseName) where.serviceName = { [Op.substring]: courseName };
        if (category) where.description = { [Op.substring]: category };

        if (type) {
            where[Op.or] = [
                { serviceName: { [Op.substring]: type } },
                { description: { [Op.substring]: type } },
            ];
        }

        const courses = await Services.findAll({ where, order: [['id', 'ASC']] });
        return res.status(200).json({ success: true, courses });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

exports.verifyMobile = async (req, res) => {
    try {
        const mobile = String(req.body.mobile || req.body.mobileNo || '').replace(/\D/g, '');
        if (mobile.length < 10) {
            return res.status(400).json({ status: 400, message: 'Invalid mobile number' });
        }

        const student = await Student.findOne({ where: { mobileNo: mobile } });
        return res.status(200).json({
            success: true,
            registered: !!student,
            message: student ? stringConstant.COMMON_SUCCESS_MSG : stringConstant.REGISTER_MSG,
            student: student || { verified: false, mobileNo: mobile },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

exports.createCounsellingSession = async (req, res) => {
    try {
        let {
            studentId,
            name,
            mobileNo,
            mail,
            countryId = 101,
            stateId = 33,
            divisionId,
            divisionCityId,
            blockId,
            serviceId = 1,
            address,
        } = req.body;

        const mobile = String(mobileNo || req.body.mobile || '').replace(/\D/g, '');

        let studentData;
        if (mobile) {
            studentData = await Student.findOne({ where: { mobileNo: mobile, isDeleted: false } });
        }

        if (studentData) {
            studentId = studentData.id;
            name = studentData.name;
            mail = studentData.email;
            mobileNo = studentData.mobileNo;
        }

        const serviceData = await Services.findOne({ where: { id: serviceId, isDeleted: false } });
        const serviceName = serviceData ? serviceData.serviceName : '';

        const payload = {
            sessionName: serviceName || 'Counselling Session',
            studentName: name,
            studentMobile: mobileNo,
            studentEmail: mail,
            address,
            countryId,
            stateId,
            divisionId,
            divisionCityId,
            blockId,
            serviceId,
            studentId: studentId || 0,
        };

        const session = await CounsellingSession.create(payload);
        return res.status(200).json({ status: 200, message: stringConstant.COMMON_SUCCESS_MSG, data: session });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Server error', error: error.message });
    }
};

exports.updateApplicationId = async (req, res) => {
    try {
        const { MERCHANTCODE, REQUESTID } = req.body;
        if (!MERCHANTCODE || !REQUESTID) {
            return res.status(400).json({ status: 400, message: 'MERCHANTCODE and REQUESTID are required' });
        }

        const tokenResponse = await authorizeToken();
        if (!tokenResponse) {
            return res.status(500).json({ status: 500, message: 'Failed to generate access token' });
        }

        const accessToken = tokenResponse?.data?.access_token;
        if (!accessToken) {
            return res.status(500).json({ status: 500, message: 'Access token not found' });
        }

        const encryptedData = encrypt(JSON.stringify(req.body), CORRECT_ENCRYPTION_KEY);
        const formData = new URLSearchParams();
        formData.append('encData', encryptedData);

        const response = await axios.post(
            'https://emitraapp.rajasthan.gov.in/webServicesRepository/updateApplicationIdWithEncryption',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return res.status(200).json({ status: 200, message: 'Success', data: response.data });
    } catch (error) {
        console.log('Update Application API Error:', error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: error.response?.data || error.message });
    }
};

exports.generateAuthorizationToken = async (req, res) => {
    try {
        const { cleintId, clientSecret } = req.body;
        if (!cleintId || !clientSecret) return res.status(400).json({ status: 400, message: 'cleintId and clientSecret are required' });
        let response = await axios.post('https://emitraapp.rajasthan.gov.in/emgt/oauth/merchant/token', { cleintId, clientSecret });
        return res.status(200).json({ status: 200, message: 'Success', data: response.data.data });
    } catch (error) {
        console.log(error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

exports.regenerateAuthorizationToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ status: 400, message: 'refreshToken is required' });
        let response = await axios.post('https://emitraapp.rajasthan.gov.in/emgt/oauth/merchant/genaccess', { refresh_token: refreshToken });
        return res.status(200).json({ status: 200, message: 'Success', data: response.data.data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

exports.decryptEncData = async (req, res) => {
    try {
        const encData = req.body.enc || req.body.encData;
        if (!encData) return res.status(400).json({ status: 400, message: 'enc or encData is required' });
        let decrypted = decrypt(encData, CORRECT_ENCRYPTION_KEY);
        decrypted = JSON.parse(decrypted);
        return res.status(200).json({ status: 200, message: 'Success', data: decrypted });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    }
};

exports.verifySSOToken = async (req, res) => {
    try {
        const { ssoToken } = req.body;
        if (!ssoToken) return res.status(400).json({ status: 400, message: 'ssoToken is required' });
        let response = await axios.get(`https://sso.rajasthan.gov.in:4443/SSOREST/GetTokenDetailJSON/${encodeURIComponent(ssoToken)}`);
        return res.status(200).json({ status: 200, message: 'Success', data: response.data });
    } catch (error) {
        console.log(error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

exports.fetchKioskDetails = async (req, res) => {
    try {
        const { MERCHANTCODE, SSOID } = req.body;
        const formData = new URLSearchParams();
        formData.append("MERCHANTCODE", MERCHANTCODE);
        formData.append("SSOID", SSOID);
        let response = await axios.post("https://emitraapp.rajasthan.gov.in/webServicesRepository/getKioskDetailsJSON", formData.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        return res.status(200).json({ status: 200, message: "Success", data: response.data });
    } catch (error) {
        console.log(error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
};


async function generateChecksum(payload) {
    try {
        //const payload = { "SSOID": "SSOTESTKIOSK", "REQUESTID": "1228", "REQTIMESTAMP": "20160617165442681", "SSOTOKEN": "158442" }

        const toBeCheckSumString = JSON.stringify(payload);

        const response = await axios.post(
            "https://emitraapp.rajasthan.gov.in/webServicesRepository/emitraMD5Checksum",
            new URLSearchParams({
                toBeCheckSumString,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const checksum = response.data;

        console.log("MD5 Checksum:", checksum);

        return checksum;
    } catch (error) {
        console.error(
            "Checksum Error:",
            error.response?.data || error.message
        );
    }
}

exports.callBackToBackTransaction = async (req, res) => {
    try {
        const {
            SERVICEID,
            CONSUMERKEY,
            CONSUMERNAME,
            SSOID,
            SSOTOKEN
        } = req.body;

        if (!SSOID || !SSOTOKEN) {
            return res.status(400).json({ status: 400, message: "SSOID and SSOTOKEN are required" });
        }

        const tokenResponse = await authorizeToken();
        if (!tokenResponse) return res.status(500).json({ status: 500, message: "Failed to generate access token" });
        const accessToken = tokenResponse?.data?.access_token;
        if (!accessToken) return res.status(500).json({ status: 500, message: "Access token not found" });

        // Generate dynamic request ID and timestamp
        const REQUESTID = req.body.REQUESTID || "CR" + Date.now() + Math.floor(Math.random() * 1000);

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ms = String(now.getMilliseconds()).padStart(3, '0');
        const REQTIMESTAMP = `${year}${month}${day}${hours}${minutes}${seconds}${ms}`;

        // Map service-specific fields
        const MERCHANTCODE = "REMARKEDU24";
        const OFFICECODE = "REMARKEDUHQ";
        const COMMTYPE = "3";
        const SUBSERVICEID = req.body.SUBSERVICEID || "1111";

        let REVENUEHEAD = "";
        if (String(SERVICEID) === "14111") {
            REVENUEHEAD = "6382-999.0016383-100.00";
        } else if (String(SERVICEID) === "14112") {
            REVENUEHEAD = "6382-99.0016383-25.00";
        } else {
            REVENUEHEAD = req.body.REVENUEHEAD || "6382-99.0016383-25.00";
        }

        const payload = {
            MERCHANTCODE,
            REQUESTID,
            REQTIMESTAMP,
            SERVICEID: SERVICEID || "",
            SUBSERVICEID,
            REVENUEHEAD,
            CONSUMERKEY: CONSUMERKEY || "",
            CONSUMERNAME: CONSUMERNAME || "",
            COMMTYPE,
            SSOID,
            OFFICECODE,
            SSOTOKEN
        };

        // CHECKSUM = MD5( SSOID + REQUESTID + REQTIMESTAMP + SSOTOKEN )
        // const checksumInputStr = buildChecksumString(payload, ['SSOID', 'REQUESTID', 'REQTIMESTAMP', 'SSOTOKEN'], '');
        // const CHECKSUM = calculateChecksum(payload, ['SSOID', 'REQUESTID', 'REQTIMESTAMP', 'SSOTOKEN'], '');

        const crypto = require("crypto");

        // const checksumData = {
        //     "SSOID": SSOID,
        //     "REQUESTID": REQUESTID,
        //     // "MERCHANTCODE": "REMARKEDU24",
        //     "REQTIMESTAMP": REQTIMESTAMP,
        //     "SSOTOKEN": SSOTOKEN
        // };

        const checksumData = await generateChecksum({ "SSOID": String(SSOID), "REQUESTID": String(REQUESTID), "REQTIMESTAMP": String(REQTIMESTAMP), "SSOTOKEN": String(SSOTOKEN) });

        // Join the values with a pipe character


        // This will now output: 2c5970121d7e576c82baaf32d85da5db
        // const CHECKSUM = crypto
        //     .createHash("md5")
        //     .update(JSON.stringify(checksumData), "utf8")
        //     .digest("hex");

        // console.log(CHECKSUM);

        const CHECKSUM = checksumData;
        payload.CHECKSUM = CHECKSUM;

        if (process.env.NODE_ENV === "development") {
            console.log("═══════════════════════════════════════════════════");
            console.log("eMitra Checksum Details:");
            console.log("═══════════════════════════════════════════════════");
            console.log("Unencrypted Checksum Input String:", `"${JSON.stringify(checksumData)}"`);
            console.log("MD5 Checksum Hash:                ", `"${CHECKSUM}"`);
            console.log("═══════════════════════════════════════════════════");

            console.log("═══════════════════════════════════════════════════");
            console.log("eMitra Back-to-Back Transaction Request Payload (Unencrypted):");
            console.log("═══════════════════════════════════════════════════");
            console.log(JSON.stringify(payload, null, 2));
            console.log('backtobackpayload', payload)
            console.log("═══════════════════════════════════════════════════");
        }

        // const formData = new URLSearchParams();
        // formData.append("data", JSON.stringify(payload));

        // const response = await axios.post(
        //     "https://emitraapp.rajasthan.gov.in/webServicesRepository/backtobackTransactionWithEncryptionA",
        //     formData.toString(),
        //     {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //             "Authorization": `Bearer ${accessToken}`
        //         }
        //     }
        // );

        // Encrypt payload
        const encryptedPayload = encrypt(
            JSON.stringify(payload),
            CORRECT_ENCRYPTION_KEY
        );

        console.log("Encrypted Payload:");
        console.log(encryptedPayload);

        // eMitra expects encData
        const formData = new URLSearchParams();
        formData.append(
            "encData",
            encryptedPayload
        );

        const response = await axios.post(
            "https://emitraapp.rajasthan.gov.in/webServicesRepository/backtobackTransactionWithEncryptionA",
            formData.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${accessToken}`
                }
            }

        );

        let responseData = response.data;
        if (typeof responseData === "string" && responseData.trim()) {
            try {
                const decryptedStr = decrypt(responseData.trim(), CORRECT_ENCRYPTION_KEY);
                responseData = JSON.parse(decryptedStr);
            } catch (decErr) {
                console.error("Failed to decrypt back-to-back response", decErr);
            }
        }

        if (process.env.NODE_ENV === "development") {
            console.log("═══════════════════════════════════════════════════");
            console.log("eMitra Back-to-Back Transaction Response (Decrypted):");
            console.log("═══════════════════════════════════════════════════");
            console.log(JSON.stringify(responseData, null, 2));
            console.log("═══════════════════════════════════════════════════");
        }

        return res.status(200).json({ status: 200, message: "Success", data: responseData });
    } catch (error) {
        console.log("BackToBack API Error:", error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: "Internal server error", error: error.response?.data || error.message });
    }
};

exports.verifyTransaction = async (req, res) => {
    try {
        const tokenResponse = await authorizeToken();
        if (!tokenResponse) return res.status(500).json({ status: 500, message: "Failed to generate access token" });
        const accessToken = tokenResponse?.data?.access_token;
        if (!accessToken) return res.status(500).json({ status: 500, message: "Access token not found" });
        const encryptedData = encrypt(JSON.stringify(req.body), CORRECT_ENCRYPTION_KEY);
        const formData = new URLSearchParams();
        formData.append("encData", encryptedData);
        const response = await axios.post("https://emitraapp.rajasthan.gov.in/webServicesRepository/getTokenVerifyNewProcessByRequestIdWithEncryption", formData.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${accessToken}` } });
        return res.status(200).json({ status: 200, message: "Success", data: response.data });
    } catch (error) {
        console.log("Update Application API Error:", error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: "Internal server error", error: error.response?.data || error.message });
    }
};

exports.cancelTransaction = async (req, res) => {
    try {
        const tokenResponse = await authorizeToken();
        if (!tokenResponse) return res.status(500).json({ status: 500, message: "Failed to generate access token" });
        const accessToken = tokenResponse?.data?.access_token;
        if (!accessToken) return res.status(500).json({ status: 500, message: "Access token not found" });
        const encryptedData = encrypt(JSON.stringify(req.body), CORRECT_ENCRYPTION_KEY);
        const formData = new URLSearchParams();
        formData.append("encData", encryptedData);
        const response = await axios.post("https://emitraapp.rajasthan.gov.in/webServicesRepository/backendTransCancelByDepartmentWithEncryption", formData.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${accessToken}` } });
        return res.status(200).json({ status: 200, message: "Success", data: response.data });
    } catch (error) {
        console.log("Update Application API Error:", error.response?.data || error.message);
        return res.status(500).json({ status: 500, message: "Internal server error", error: error.response?.data || error.message });
    }
};

exports.emitraCallback = async (req, res) => {
    try {
        let encData = req.body.encData || req.body.data;

        if (!encData) {
            return res.status(400).json({ status: 400, message: "encData is required" });
        }

        const decryptedData = decrypt(encData, CORRECT_ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);

        // Console log the decrypted data on the server
        if (process.env.NODE_ENV === "development") {
            console.log("═══════════════════════════════════════════════════");
            console.log("eMitra Callback Decrypted Data:");
            console.log("═══════════════════════════════════════════════════");
            console.log(JSON.stringify(parsedData, null, 2));
            console.log("═══════════════════════════════════════════════════");
        }

        return res.status(200).json({
            status: 200,
            message: "Callback decrypted and logged",
            data: parsedData,
        });
    } catch (error) {
        console.log("eMitra Callback Error:", error.message);
        return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
    }
};
