import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/permissions";
import { OAuth2Client } from 'google-auth-library';
import { ENV } from '../config/env';

const googleClient = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);

export const login = async (email: string, password: string, reqData?: { ipAddress?: string, userAgent?: string }) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.password) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "10h" } // Main token
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "7d" } // Refresh token
    );

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });

    await prisma.activity.create({
        data: {
            userId: user.id,
            type: "LOGIN",
            description: "User logged in via email/password",
            ipAddress: reqData?.ipAddress,
            userAgent: reqData?.userAgent,
        }
    });

    return { user, token, refreshToken };
};

export const googleLogin = async (idToken: string, reqData?: { ipAddress?: string, userAgent?: string }) => {
    // 1. Verify Google token
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: ENV.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        throw new Error("Invalid Google token");
    }

    const { email, name, picture, sub: googleId } = payload;

    // 2. Find or create user
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                name: name || '',
                provider: 'google',
                providerId: googleId,
                emailVerified: true,
                profileImage: picture,
            }
        });
    } else if (user.provider !== 'google') {
        // Link google account to existing local account
        user = await prisma.user.update({
            where: { email },
            data: {
                provider: 'google',
                providerId: googleId,
                emailVerified: true, // Google verifies emails
                profileImage: user.profileImage || picture, // update picture if not exists
            }
        });
    }

    // 3. Generate tokens
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "10h" } // Main token
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "7d" } // Refresh token
    );

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });

    await prisma.activity.create({
        data: {
            userId: user.id,
            type: "LOGIN_GOOGLE",
            description: "User logged in via Google Authentication",
            ipAddress: reqData?.ipAddress,
            userAgent: reqData?.userAgent,
        }
    });

    return { user, token, refreshToken };
};

export const refreshAccessToken = async (token: string) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: { token },
        include: { user: true }
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error("Invalid or expired refresh token");
    }

    const newToken = jwt.sign(
        { id: storedToken.user.id, email: storedToken.user.email, role: storedToken.user.role },
        JWT_SECRET,
        { expiresIn: "10h" }
    );

    return { token: newToken };
};

export const validateToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

import { sendPasswordResetEmail } from "./emailService";
import crypto from "crypto";

export const forgotPassword = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: expires
        }
    });

    // Send the real password reset email
    await sendPasswordResetEmail(email, token);

    return token;
};

export const resetPassword = async (token: string, newPassword: string) => {
    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: { gte: new Date() }
        }
    });

    if (!user) throw new Error("Invalid or expired reset token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }
    });

    return { message: "Password reset successful" };
};
