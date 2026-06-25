const axios = require('axios');

async function run() {
    const ssoToken = "MzlmU215bmVHOXJiaFVtS1Y1Njh6L29zZXlBcUJpcmpVSGpDLzRLT28rWkR4UjlKTUdya0VnOU1odVZCbDZoZWFhejRqNnhUWE43bVY0MHZ4OUlFZ1JhZ0Y1MWN0YU5Nb29kcHhEeTladzJhTGhjMGs1YXpvbXhKTTVuUXdoSUxHV2piWXdwYkpjbnNWNjNzVmFUdzg0SDhyWHdDOWZZeVE0VmZhbWJCejVTaE1CVVR4ZjBGRGJyVzI4YS82THFX";
    
    console.log("Verifying SSO token against RajSSO API...");
    try {
        const response = await axios.get(`https://sso.rajasthan.gov.in:4443/SSOREST/GetTokenDetailJSON/${encodeURIComponent(ssoToken)}`);
        console.log("SSO Token Verification Success!");
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log("SSO Token Verification Failed:", error.response?.data || error.message);
    }
}

run();
