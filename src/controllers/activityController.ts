import { Request, Response } from "express";
import * as activityService from "../services/activityService";

export const getActivities = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const data = await activityService.getActivities(skip, Number(limit));
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserActivities = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId) || (req as any).user.id;
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const data = await activityService.getUserActivities(userId, skip, Number(limit));
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
