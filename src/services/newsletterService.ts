import prisma from "../lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail, sendEmail, sendNewsletterConfirmation } from "./emailService";

export const subscribe = async (email: string) => {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');

    const subscription = await prisma.newsletterSubscription.upsert({
        where: { email },
        update: { 
            isActive: true, 
            verificationToken,
            isVerified: false
        },
        create: { 
            email, 
            verificationToken,
            unsubscribeToken,
            isActive: true,
            isVerified: false
        }
    });

    // Send the real verification email
    await sendVerificationEmail(email, verificationToken);
    
    return subscription;
};

export const verifySubscription = async (token: string) => {
    const subscription = await prisma.newsletterSubscription.findFirst({
        where: { verificationToken: token }
    });

    if (!subscription) {
        throw new Error("Invalid or expired verification token");
    }

    const updated = await prisma.newsletterSubscription.update({
        where: { id: subscription.id },
        data: {
            isVerified: true,
            verifiedAt: new Date(),
            verificationToken: null
        }
    });

    // Send the "You're subscribed" confirmation email
    if (updated.unsubscribeToken) {
        await sendNewsletterConfirmation(updated.email, updated.unsubscribeToken);
    }

    return updated;
};

export const unsubscribeByToken = async (token: string) => {
    const subscription = await prisma.newsletterSubscription.findFirst({
        where: { unsubscribeToken: token }
    });

    if (!subscription) {
        throw new Error("Invalid unsubscribe token");
    }

    return await prisma.newsletterSubscription.update({
        where: { id: subscription.id },
        data: { isActive: false }
    });
};

export const getAllSubscribers = async (skip: number = 0, take: number = 50) => {
    const [subscribers, total] = await Promise.all([
        prisma.newsletterSubscription.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.newsletterSubscription.count()
    ]);
    return { subscribers, total };
};

export const broadcastNewsletter = async (subject: string, content: string) => {
    const verifiedSubscribers = await prisma.newsletterSubscription.findMany({
        where: { isVerified: true, isActive: true }
    });

    const sendPromises = verifiedSubscribers.map((sub: any) => {
        const html = `
            <div style="font-family: sans-serif; line-height: 1.6;">
                ${content}
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #666;">
                    You are receiving this because you subscribed to Sohoza System. 
                    <a href="${process.env.API_BASE_URL}/api/newsletter/unsubscribe?token=${sub.unsubscribeToken}">Unsubscribe here</a>
                </p>
            </div>
        `;
        return sendEmail(sub.email, subject, html);
    });

    const results = await Promise.all(sendPromises);
    return {
        total: verifiedSubscribers.length,
        sent: results.filter((r: any) => r !== null).length,
        failed: results.filter((r: any) => r === null).length
    };
};
