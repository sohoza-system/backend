import express from "express";
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";
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

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth, Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth, Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /users/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth, Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Request password reset token
 *     tags: [Auth, Users]
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth, Users]
 */
router.post("/reset-password", authController.resetPassword);

/**
 * @swagger
 * /users/verify-email/{token}:
 *   get:
 *     summary: Verify email address
 *     tags: [Auth, Users]
 */
router.get("/verify-email/:token", userController.verifyEmail);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword to search in name or email
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), userController.getAllUsers);

/**
 * @swagger
 * /users/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.post("/change-password", authenticate, userController.changePassword);

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
