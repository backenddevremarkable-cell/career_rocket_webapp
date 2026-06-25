const env = process.env.NODE_ENV || "development";
const isDev = env === "development";

const config = {
  DB_HOST: process.env.DB_HOST || "43.204.120.15",
  DB_USER: process.env.DB_USER || "utausr",
  DB_PASSWORD: process.env.DB_PASSWORD || "uTa@!k:RQU@*7^",
  DB_NAME: process.env.DB_NAME || (isDev ? "onlineCareerRocket" : "liveCareerRocket"),
  PORT: Number(process.env.PORT || (isDev ? 3001 : 3010)),
  BASE_URL: "https://emitra.careerrocket.in/api/",
  JWT_SECRET: process.env.JWT_SECRET || "mysecretkey123",
  RAZORPAY_ACCESS_KEY:
    process.env.RAZORPAY_ACCESS_KEY ||
    (isDev ? "rzp_test_RsCWlHp21YiGPH" : "rzp_live_RyxWMX4MZ1HCUy"),
  RAZORPAY_SECRET_KEY:
    process.env.RAZORPAY_SECRET_KEY ||
    (isDev ? "E122KEiLC5wxtw2edTeV33Au" : "5W7Vm7Cqn1sKZw389U2jMCkq"),
  RAZORPAY_WEBHOOK_SECRET:
    process.env.RAZORPAY_WEBHOOK_SECRET || "_BYytJuT7Th4rSF",
  OLLAMA_BASE_URL:
    process.env.OLLAMA_BASE_URL ||
    (isDev ? "http://localhost:11435" : "http://localhost:11434"),
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || "llama3.2:1b",
  EMITRA_CLIENT_ID: process.env.EMITRA_CLIENT_ID || "REMARKEDU24",
  EMITRA_CLIENT_SECRET:
    process.env.EMITRA_CLIENT_SECRET ||
    "94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315",
  STAGING_API_URL:
    (process.env.STAGING_API_URL || "https://api.careerrocketstaging.online").replace(/\/$/, ""),
};

export default config;
