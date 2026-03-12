import { Request, Response } from "express";
import * as userService from "../services/userService";

import { getPagination } from "../utils/pagination";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userService.createUser(email, name, password, role);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { skip, take } = getPagination(req.query);
    const { search } = req.query;

    const { users, total } = await userService.getAllUsers(skip, take, search as string);

    res.status(200).json({
      data: users,
      total,
      page: Number(req.query.page) || 1,
      totalPages: Math.ceil(total / take)
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Get user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userService.getUserByEmail(email as string);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.profileImage = req.file.path; // Cloudinary URL
    }

    const user = await userService.updateUser(Number(id), data);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get users by role
export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const users = await userService.getUsersByRole(role as any);
    res
      .status(200)
      .json({ message: "Users fetched successfully by role", users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete user
export const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.softDeleteUser(Number(id));
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Hard delete user
export const hardDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.hardDeleteUser(Number(id));
    res
      .status(200)
      .json({ message: "User permanently deleted successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { currentPassword, newPassword } = req.body;
        await userService.changePassword(userId, currentPassword, newPassword);
        res.json({ message: "Password changed successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        await userService.verifyEmail(token as string);
        res.json({ message: "Email verified successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
