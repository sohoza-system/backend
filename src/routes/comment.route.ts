import express from "express";
import * as commentController from "../controllers/commentController";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/post/:postId", commentController.getCommentsByPostId);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, commentController.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, commentController.deleteComment);

export default router;
