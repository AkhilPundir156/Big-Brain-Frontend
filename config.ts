import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/contactdb";

export const EMAIL_SERVICE_USER = process.env.EMAIL_SERVICE_USER || "";
export const EMAIL_SERVICE_PASS = process.env.EMAIL_SERVICE_PASS || "";

export const PORT = process.env.PORT || 5000;
