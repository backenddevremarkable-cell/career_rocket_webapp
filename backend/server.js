const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const apiController = require('./controllers/apiController');

const app = express();
const PORT = config.PORT || process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "https://careerrocket.online",
      "https://www.careerrocket.online",
      "http://localhost:3010",
      "http://localhost:3000",
      "http://127.0.0.1:3010",
      "http://localhost:3001",
    ],
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Career Rocket API" });
});

app.get("/api/courses", apiController.getCourses);
app.post('/api/studentlogin', apiController.studentLogin);
app.post('/api/createCounsellingSession', apiController.createCounsellingSession);
app.post('/api/getDivisionByStateId', apiController.getDivisionByStateId);

app.post('/api/getDivisionCitiesByDivisionId', apiController.getDivisionCitiesByDivisionId);

app.post('/api/getBlocksByCityId', apiController.getBlocksByCityId);

app.post('/api/decryptEncData', apiController.decryptEncData);
app.post('/api/generateAuthorizationToken', apiController.generateAuthorizationToken);
app.post('/api/regenerateAuthorizationToken', apiController.regenerateAuthorizationToken);
app.post('/api/verifySSOToken', apiController.verifySSOToken);
app.post('/api/fetchKioskDetails', apiController.fetchKioskDetails);
app.post('/api/callBackToBackTransaction', apiController.callBackToBackTransaction);
app.post('/api/verifyTransaction', apiController.verifyTransaction);
app.post('/api/cancelTransaction', apiController.cancelTransaction);
app.post('/api/updateApplicationId', apiController.updateApplicationId);
app.post('/api/emitraCallback', apiController.emitraCallback);

app.post('/api/verify-mobile', apiController.verifyMobile);

app.post("/api/student-details", (req, res) => {
  res.json({ success: true, data: req.body });
});

app.post("/api/payment", (req, res) => {
  const { upiId, amount, courseId, mobile } = req.body;
  res.json({
    success: true,
    transactionId: `TXN${Date.now()}`,
    amount: amount || 0,
    courseId,
    mobile,
    upiId: upiId || "example@upi",
    status: "completed",
  });
});

app.listen(PORT, () => {
  console.log(`Career Rocket API running on http://localhost:${PORT}`);
});
