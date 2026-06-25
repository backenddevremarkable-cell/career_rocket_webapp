const axios = require('axios');

async function testLocalApi() {
    const payload = {
        SERVICEID: "14111",
        CONSUMERKEY: "7014151588",
        CONSUMERNAME: "Poonam Chand",
        SSOID: "PRACHEE.GAUR",
        SSOTOKEN: "Z3Jsam5ManlIdjZGaTlTRFlzbFc0eVZON3pxZVJEMm8wMnRQOXlXaHczelc5a1FNczQ3VTd6ZHcxOVg4WjhkOFFnUFhsbXc4bHMwTmh4MXRqTFpLM2hGNm5ERXdwNS9tWmFLM2N3UTRSWStkUkpBbUpWTzFmbS9iaUhldVhOYVYrTEdKdGhVT3dNcnFGd0JIWlRQYmxQTVJselJMVm5UNHo1WGxKZWs5VVlyY0dmOG9hckMrU094OVRBK29OdTVP"
    };

    console.log("Calling local api/callBackToBackTransaction...");
    try {
        const response = await axios.post("http://localhost:3010/api/callBackToBackTransaction", payload);
        console.log("Response Status:", response.status);
        console.log("Response Data:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
    }
}

testLocalApi();
