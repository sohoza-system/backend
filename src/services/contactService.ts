import prisma from "../lib/prisma";

export interface CreateContactInput {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

// Create a new contact message
export const createContactMessage = async (data: CreateContactInput) => {
    try {
        const newMessage = await prisma.contactMessage.create({
            data
        });
        return newMessage;
    } catch (error) {
        console.error('ORIGINAL PRISMA ERROR in createContactMessage:', error);
        throw new Error(`Error creating contact message: ${error}`);
    }
};

// Get all contact messages
export const getAllContactMessages = async () => {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return messages;
    } catch (error) {
        console.error('ORIGINAL PRISMA ERROR in getAllContactMessages:', error);
        throw new Error(`Error fetching contact messages: ${error}`);
    }
};
