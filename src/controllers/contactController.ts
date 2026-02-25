import { Request, Response } from "express";
import * as contactService from "../services/contactService";

import { getPagination } from "../utils/pagination";

// Create a new contact message
export const createContactMessage = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const message = await contactService.createContactMessage(data);
        res.status(201).json({ message: "Message sent successfully", contact: message });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all contact messages
export const getAllContactMessages = async (req: Request, res: Response) => {
    try {
        const { skip, take } = getPagination(req.query);
        const { messages, total } = await contactService.getAllContactMessages(skip, take);

        res.status(200).json({
            data: messages,
            total,
            page: Number(req.query.page) || 1,
            totalPages: Math.ceil(total / take)
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
