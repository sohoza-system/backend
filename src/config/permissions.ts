import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const PERMISSIONS = {
    SUPERADMIN: ["*"],
    ADMIN: ["read:users", "create:users", "update:users", "delete:users"],
    USER: ["read:profile", "update:profile"],
};
