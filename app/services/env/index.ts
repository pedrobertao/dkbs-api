const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const JWT_EXPIRES_IN = process.env.JWT_SECRET || "1h";
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "DKBS";
const APP_STAGE = process.env.APP_STAGE || "DEV";

export { APP_NAME, APP_STAGE, JWT_SECRET, JWT_EXPIRES_IN, PORT };
