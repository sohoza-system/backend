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

// Get all contact messages with pagination
export const getAllContactMessages = async (skip: number = 0, take: number = 10) => {
    try {
        const [messages, total] = await Promise.all([
            prisma.contactMessage.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.contactMessage.count()
        ]);
        return { messages, total };
    } catch (error: any) {
        console.error('ORIGINAL PRISMA ERROR in getAllContactMessages:', error);
        throw new Error(`Error fetching contact messages: ${error}`);
    }
};
