import express from "express";
import * as activityController from "../controllers/activityController";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all system activities (Admin only)
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), activityController.getActivities);

/**
 * @swagger
 * /activities/user/{userId}:
 *   get:
 *     summary: Get user-specific activities
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 */
router.get("/user/:userId?", authenticate, activityController.getUserActivities);

export default router;
