const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

function getGitBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .trim()
      .toLowerCase();
  } catch {
    return null;
  }
}

const gitBranch = getGitBranch();
let env = process.env.BACKEND_ENV || process.env.NODE_ENV || gitBranch || 'development';
if (env === 'main' || env === 'master') env = 'production';
if (env === 'stg') env = 'staging';
if (!['development', 'production', 'staging'].includes(env)) env = 'development';

const envFile = process.env.BACKEND_ENV
  ? `.env.${process.env.BACKEND_ENV}`
  : env === 'production'
    ? '.env.production'
    : env === 'staging'
      ? '.env.staging'
      : '.env.development';

dotenv.config({ path: path.resolve(__dirname, envFile) });
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('Backend config environment:', env);

const DEFAULTS = {
  development: {
    DB_HOST: '43.204.120.15',
    DB_USER: 'utausr',
    DB_PASSWORD: 'uTa@!k:RQU@*7^',
    DB_NAME: 'onlineCareerRocket',
    PORT: 3001,
    BASE_URL: 'https://api.careerrocketstaging.online/api/',
    RAZORPAY_ACCESS_KEY: 'rzp_test_RsCWlHp21YiGPH',
    RAZORPAY_SECRET_KEY: 'E122KEiLC5wxtw2edTeV33Au',
    RAZORPAY_WEBHOOK_SECRET: '_BYytJuT7Th4rSF',
    OLLAMA_BASE_URL: 'http://localhost:11435',
    OLLAMA_MODEL: 'llama3.2:1b',
  },
  staging: {
    DB_HOST: '43.204.120.15',
    DB_USER: 'utausr',
    DB_PASSWORD: 'uTa@!k:RQU@*7^',
    DB_NAME: 'onlineCareerRocket',
    PORT: 3011,
    BASE_URL: 'https://api.careerrocketstaging.online/api/',
    RAZORPAY_ACCESS_KEY: 'rzp_test_RsCWlHp21YiGPH',
    RAZORPAY_SECRET_KEY: 'E122KEiLC5wxtw2edTeV33Au',
    RAZORPAY_WEBHOOK_SECRET: '_BYytJuT7Th4rSF',
    OLLAMA_BASE_URL: 'http://localhost:11435',
    OLLAMA_MODEL: 'llama3.2:1b',
  },
  production: {
    DB_HOST: '43.204.120.15',
    DB_USER: 'utausr',
    DB_PASSWORD: 'uTa@!k:RQU@*7^',
    DB_NAME: 'liveCareerRocket',
    PORT: 3010,
    BASE_URL: 'https://api.careerrocket.online/api/',
    RAZORPAY_ACCESS_KEY: 'rzp_live_RyxWMX4MZ1HCUy',
    RAZORPAY_SECRET_KEY: '5W7Vm7Cqn1sKZw389U2jMCkq',
    OLLAMA_BASE_URL: 'http://localhost:11434',
    OLLAMA_MODEL: 'llama3.2:1b',
  },
};

const config = {
  DB_HOST: process.env.DB_HOST || DEFAULTS[env].DB_HOST,
  DB_USER: process.env.DB_USER || DEFAULTS[env].DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD || DEFAULTS[env].DB_PASSWORD,
  DB_NAME: process.env.DB_NAME || DEFAULTS[env].DB_NAME,
  PORT: Number(process.env.PORT || DEFAULTS[env].PORT),
  BASE_URL: process.env.BASE_URL || DEFAULTS[env].BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'mysecretkey123',
  RAZORPAY_ACCESS_KEY:
    process.env.RAZORPAY_ACCESS_KEY || DEFAULTS[env].RAZORPAY_ACCESS_KEY,
  RAZORPAY_SECRET_KEY:
    process.env.RAZORPAY_SECRET_KEY || DEFAULTS[env].RAZORPAY_SECRET_KEY,
  RAZORPAY_WEBHOOK_SECRET:
    process.env.RAZORPAY_WEBHOOK_SECRET || DEFAULTS[env].RAZORPAY_WEBHOOK_SECRET,
  OLLAMA_BASE_URL:
    process.env.OLLAMA_BASE_URL || DEFAULTS[env].OLLAMA_BASE_URL,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || DEFAULTS[env].OLLAMA_MODEL,
  EMITRA_CLIENT_ID: 'REMARKEDU24',
  EMITRA_CLIENT_SECRET:

    '94d483b2f18f735f33b08dbbeb22a527c8767114f978129623189948405e0315',
  GPT_SECRET_KEY: process.env.GPT_SECRET_KEY || '',
};

module.exports = config;
