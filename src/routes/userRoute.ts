import express from "express";
import * as userController from "../controllers/userController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         role:
 *           type: string
 *           enum: [USER, ADMIN, SUPERADMIN]
 *           description: The role of the user
 *         isActive:
 *           type: boolean
 *         profileImage:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

// router.post("/", userController.createUser); // Removed - handled in authRoute.ts


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.getAllUsers);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/email/:email", authenticate, userController.getUserByEmail);

/**
 * @swagger
 * /users/role/list:
 *   get:
 *     summary: Get users by role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users with the given role
 */
router.get("/role/list", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.getUsersByRole);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", authenticate, userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", authenticate, upload.single("profileImage"), userController.updateUser);

/**
 * @swagger
 * /users/{id}/soft:
 *   delete:
 *     summary: Soft delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User soft deleted
 */
router.delete("/:id/soft", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.softDeleteUser);

/**
 * @swagger
 * /users/{id}/hard:
 *   delete:
 *     summary: Hard delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User permanently deleted
 */
router.delete("/:id/hard", authenticate, authorize(["SUPERADMIN"]), userController.hardDeleteUser);

export default router;
