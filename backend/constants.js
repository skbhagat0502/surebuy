import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_MAIL = process.env.SMTP_MAIL;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_SERVICE = process.env.SMTP_SERVICE;

export const NODE_ENV = process.env.NODE_ENV;

export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const JWT_SECRET = process.env.JWT_SECRET;
