import express from "express";
import * as settingsController from "../controllers/settingsController";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get site settings
 *     tags: [Settings]
 */
router.get("/", settingsController.getSettings);

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update site settings (Superadmin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
import { validate } from "../middleware/validate.middleware";
import { settingsSchema } from "../validations/schemas";

router.put("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(settingsSchema), settingsController.updateSettings);

export default router;
