import express from "express";
import * as analyticsController from "../controllers/analyticsController";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get("/dashboard", authenticate, authorize(["ADMIN", "SUPERADMIN"]), analyticsController.getDashboardAnalytics);

/**
 * @swagger
 * /analytics/general:
 *   get:
 *     summary: Get general system analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: General analytics data
 */
router.get("/general", authenticate, authorize(["ADMIN", "SUPERADMIN"]), analyticsController.getGeneralAnalytics);

/**
 * @swagger
 * /analytics/track:
 *   post:
 *     summary: Track a page visit
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pagePath
 *             properties:
 *               pagePath:
 *                 type: string
 *               source:
 *                 type: string
 *     responses:
 *       204:
 *         description: Tracked successfully
 */
router.post("/track", analyticsController.trackVisit);
router.get("/debug-tables", async (req, res) => {
    try {
        const prisma = (await import("../lib/prisma")).default;
        const tables: any[] = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        res.json({ tables: tables.map(t => t.table_name) });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
