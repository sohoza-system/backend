import express from "express";
import * as analyticsController from "../controllers/analyticsController";

const router = express.Router();

router.get("/dashboard", analyticsController.getDashboardAnalytics);
router.get("/general", analyticsController.getGeneralAnalytics);
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
