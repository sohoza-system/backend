import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { sendWelcomeEmail, sendPasswordChangedNotification, sendEmail } from "./emailService";
import * as templates from '../utils/emailTemplates';
import { ENV } from '../config/env';

type Role = "USER" | "ADMIN" | "SUPERADMIN";

// Create a new user
export const createUser = async (
  email: string,
  name: string,
  password: string,
  role: Role = "USER"
) => {
  try {
    // Generate a secure email verification token
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
        role,
        emailVerifyToken,
        emailVerified: false,
      },
    });

    // Send the verification email
    const verifyUrl = `${ENV.API_BASE_URL}/api/users/verify-email/${emailVerifyToken}`;
    const emailContent = `
      <h2>Verify Your Email Address</h2>
      <p>Hi ${name || 'there'},</p>
      <p>Thanks for signing up to Sohoza System! Please click the button below to verify your email address and activate your account.</p>
      <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#6c63ff;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Verify My Email</a>
      <p style="margin-top:16px;color:#888;">If you didn't create this account, you can safely ignore this email.</p>
      <p style="color:#888;font-size:12px;">Link expires in 24 hours.</p>
    `;
    await sendEmail(email, '✅ Verify Your Sohoza Account', templates.baseLayout(emailContent));

    return user;
  } catch (error: any) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

// Get all users with pagination and search
export const getAllUsers = async (skip: number = 0, take: number = 10, search?: string) => {
  try {
    const where: any = {
      deletedAt: null,
      OR: search ? [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ] : undefined
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);
    return { users, total };
  } catch (error: any) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error: any) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (id: number, data: any) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return user;
  } catch (error: any) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};

// Update last login
export const updateLastLogin = async (id: number) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    });
  } catch (error: any) {
    console.error("Error in updateLastLogin:", error);
    throw error;
  }
};

export const softDeleteUser = async (id: number) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false
      },
    });
  } catch (error: any) {
    console.error("Error in softDeleteUser:", error);
    throw error;
  }
};

export const hardDeleteUser = async (id: number) => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error in hardDeleteUser:", error);
    throw error;
  }
};

// Get users by role
export const getUsersByRole = async (role: Role) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role,
        deletedAt: null,
      },
    });
    return users;
  } catch (error: any) {
    console.error("Error in getUsersByRole:", error);
    throw error;
  }
};

export const changePassword = async (id: number, currentPassword: string, newPassword: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    if (!user.password) {
      throw new Error("You are logged in with a third-party provider and do not have a password set.");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });

    // Send security notification
    if (updated.email) {
        await sendPasswordChangedNotification(updated.email);
    }

    return updated;
  } catch (error: any) {
    console.error("Error in changePassword:", error);
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
        where: { emailVerifyToken: token }
    });

    if (!user) throw new Error("Invalid verification token");

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifyToken: null
      }
    });

    // Send Welcome Email
    if (updatedUser.email) {
        await sendWelcomeEmail(updatedUser.email, updatedUser.name || 'New User');
    }

    return updatedUser;
  } catch (error: any) {
    console.error("Error in verifyEmail:", error);
    throw error;
  }
};