import prisma from "../lib/prisma";
import crypto from "crypto";

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

    // In a real scenario, you would call an email service here
    console.log(`[NEWSLETTER] Verification email would be sent to ${email} with token ${verificationToken}`);
    
    return subscription;
};

export const verifySubscription = async (token: string) => {
    const subscription = await prisma.newsletterSubscription.findFirst({
        where: { verificationToken: token }
    });

    if (!subscription) {
        throw new Error("Invalid or expired verification token");
    }

    return await prisma.newsletterSubscription.update({
        where: { id: subscription.id },
        data: {
            isVerified: true,
            verifiedAt: new Date(),
            verificationToken: null
        }
    });
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
