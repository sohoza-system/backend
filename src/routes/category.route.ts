import express from "express";
import * as categoryController from "../controllers/categoryController";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), categoryController.deleteCategory);

export default router;
