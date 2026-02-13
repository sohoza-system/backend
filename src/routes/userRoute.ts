import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Get user by email
router.get("/email/:email", userController.getUserByEmail);

// Get users by role
router.get("/role/list", userController.getUsersByRole);

// Update user
router.put("/:id", userController.updateUser);

// Soft delete user
router.delete("/:id/soft", userController.softDeleteUser);

// Hard delete user
router.delete("/:id/hard", userController.hardDeleteUser);

export default router;
