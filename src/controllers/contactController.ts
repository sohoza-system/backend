import { Request, Response } from "express";
import * as contactService from "../services/contactService";

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
        const messages = await contactService.getAllContactMessages();
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
