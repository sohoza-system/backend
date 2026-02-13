import prisma from "../lib/prisma";
import { Role } from "@prisma/client";

// Create a new user
export const createUser = async (
  email: string,
  name: string,
  password: string,
  role: Role = "USER"
) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password, // In production, hash this password!
        role,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null, // Exclude soft deleted users
      },
    });
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

// Get user by ID
export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};

// Update user
export const updateUser = async (
  id: number,
  data: {
    email?: string;
    name?: string;
    role?: Role;
    isActive?: boolean;
    emailVerified?: boolean;
    phone?: string;
    profileImage?: string;
    bio?: string;
  }
) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};

// Update last login
export const updateLastLogin = async (id: number) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error updating last login: ${error}`);
  }
};

// Soft delete user
export const softDeleteUser = async (id: number) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};

// Hard delete user
export const hardDeleteUser = async (id: number) => {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error(`Error permanently deleting user: ${error}`);
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
  } catch (error) {
    throw new Error(`Error fetching users by role: ${error}`);
  }
};
