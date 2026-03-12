import express from "express";
import * as mediaController from "../controllers/mediaController";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Get all uploaded media (Admin only)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), mediaController.getAllMedia);

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete media (Admin only)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), mediaController.deleteMedia);

export default router;
