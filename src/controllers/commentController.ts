import { Request, Response } from "express";
import * as commentService from "../services/commentService";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { postId, content } = req.body;
        const authorId = (req as any).user.id;
        const comment = await commentService.createComment(Number(postId), authorId, content);
        res.status(201).json(comment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const data = await commentService.getCommentsByPostId(Number(postId), skip, Number(limit));
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await commentService.updateComment(Number(id), content);
        res.json(comment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await commentService.deleteComment(Number(id));
        res.json({ message: "Comment deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
