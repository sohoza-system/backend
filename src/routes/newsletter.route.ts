import express from "express";
import * as newsletterController from "../controllers/newsletterController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { subscribeSchema } from "../validations/schemas";

const router = express.Router();

/**
 * @swagger
 * /newsletter/subscribe:
 *   post:
 *     summary: Subscribe to newsletter (initiates double opt-in)
 *     tags: [Newsletter]
 */
router.post("/subscribe", validate(subscribeSchema), newsletterController.subscribe);

/**
 * @swagger
 * /newsletter/verify/{token}:
 *   get:
 *     summary: Verify newsletter subscription
 *     tags: [Newsletter]
 */
router.get("/verify/:token", newsletterController.verifySubscription);

/**
 * @swagger
 * /newsletter/unsubscribe:
 *   get:
 *     summary: Unsubscribe from newsletter using token
 *     tags: [Newsletter]
 */
router.get("/unsubscribe", newsletterController.unsubscribe);

/**
 * @swagger
 * /newsletter/subscribers:
 *   get:
 *     summary: Get all subscribers (Admin only)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 */
router.get("/subscribers", authenticate, authorize(["ADMIN", "SUPERADMIN"]), newsletterController.getAllSubscribers);

/**
 * @swagger
 * /newsletter/broadcast:
 *   post:
 *     summary: Send newsletter to all verified subscribers (Admin only)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 */
router.post("/broadcast", authenticate, authorize(["ADMIN", "SUPERADMIN"]), newsletterController.broadcast);

export default router;
