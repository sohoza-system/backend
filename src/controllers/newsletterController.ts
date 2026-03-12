import { Request, Response } from "express";
import * as newsletterService from "../services/newsletterService";
import { getPagination } from "../utils/pagination";

export const subscribe = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });
        
        // Simple regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        await newsletterService.subscribe(email);
        res.status(200).json({ 
            message: "Subscription pending. Please check your email to verify your subscription." 
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifySubscription = async (req: Request, res: Response) => {
    try {
        const token = req.params.token as string;
        if (!token) return res.status(400).json({ message: "Token is required" });
        
        await newsletterService.verifySubscription(token);
        res.status(200).json({ message: "Email verified successfully. You are now subscribed." });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const unsubscribe = async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
        if (!token) return res.status(400).json({ message: "Unsubscribe token is required" });
        
        await newsletterService.unsubscribeByToken(token);
        res.status(200).json({ message: "Successfully unsubscribed from our newsletter." });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllSubscribers = async (req: Request, res: Response) => {
    try {
        const { skip, take } = getPagination(req.query);
        const { subscribers, total } = await newsletterService.getAllSubscribers(skip, take);
        res.json({
            data: subscribers,
            total,
            page: Number(req.query.page) || 1,
            totalPages: Math.ceil(total / take)
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const broadcast = async (req: Request, res: Response) => {
    try {
        const { subject, content } = req.body;
        if (!subject || !content) {
            return res.status(400).json({ message: "Subject and content are required" });
        }

        const results = await newsletterService.broadcastNewsletter(subject, content);
        res.status(200).json({ 
            message: "Newsletter broadcast completed",
            results 
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
