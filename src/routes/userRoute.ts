import express from "express";
import * as userController from "../controllers/userController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = express.Router();

// Create a new user
router.post("/", userController.createUser); // Public for registration, or protected? Keeping public for now.

// Get all users
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.getAllUsers);

// Get user by email (Specific path)
router.get("/email/:email", authenticate, userController.getUserByEmail);

// Get users by role (Specific path)
router.get("/role/list", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.getUsersByRole);

// Get user by ID (Generic path - must be after specific paths)
router.get("/:id", authenticate, userController.getUserById);

// Update user
router.put("/:id", authenticate, upload.single("profileImage"), userController.updateUser);

// Soft delete user
router.delete("/:id/soft", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.softDeleteUser);

// Hard delete user
router.delete("/:id/hard", authenticate, authorize(["SUPERADMIN"]), userController.hardDeleteUser);

export default router;
