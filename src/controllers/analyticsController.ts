import { Request, Response } from "express";
import * as analyticsService from "../services/analyticsService";

// Fetch dashboard analytics
export const getDashboardAnalytics = async (req: Request, res: Response) => {
    try {
        const analytics = await analyticsService.getDashboardAnalytics();
        res.status(200).json({
            message: "Dashboard analytics fetched successfully",
            analytics
        });
    } catch (error: any) {
        console.error("Dashboard Analytics Error:", error.message, error.code, error.meta);
        require('fs').appendFileSync('prisma_error.log', `\n\n--- Dashboard Error ---\n${new Date().toISOString()}\nMessage: ${error.message}\nCode: ${error.code}\nStack: ${error.stack}\nMeta: ${JSON.stringify(error.meta)}`);
        res.status(500).json({ message: error.message, code: error.code });
    }
};

// Fetch general analytics
export const getGeneralAnalytics = async (req: Request, res: Response) => {
    try {
        const analytics = await analyticsService.getGeneralAnalytics();
        res.status(200).json({
            message: "General analytics fetched successfully",
            analytics
        });
    } catch (error: any) {
        console.error("General Analytics Error:", error.message, error.code, error.meta);
        require('fs').appendFileSync('prisma_error.log', `\n\n--- General Error ---\n${new Date().toISOString()}\nMessage: ${error.message}\nCode: ${error.code}\nStack: ${error.stack}\nMeta: ${JSON.stringify(error.meta)}`);
        res.status(500).json({ message: error.message, code: error.code });
    }
};

export const trackVisit = async (req: Request, res: Response) => {
    try {
        const { pagePath, source, visitorId } = req.body;
        const deviceType = req.headers['user-agent']?.includes('Mobile') ? 'Mobile' : 'Desktop';
        const ipAddress = req.ip || req.get('x-forwarded-for');

        await analyticsService.trackVisit({
            pagePath,
            deviceType,
            source,
            ipAddress: String(ipAddress),
            visitorId
        });

        res.status(204).send(); // No content for tracking
    } catch (error: any) {
        // Silently fail for tracking to avoid UX impact
        res.status(204).send();
    }
};
