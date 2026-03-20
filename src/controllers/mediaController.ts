import { Request, Response } from "express";
import * as mediaService from "../services/mediaService";
import { getPagination } from "../utils/pagination";

export const getAllMedia = async (req: Request, res: Response) => {
    try {
        const { skip, take } = getPagination(req.query);
        const { media, total } = await mediaService.getAllMedia(skip, take);
        res.json({
            data: media,
            total,
            page: Number(req.query.page) || 1,
            totalPages: Math.ceil(total / take)
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMedia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await mediaService.deleteMedia(Number(id));
        res.json({ message: "Media deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
