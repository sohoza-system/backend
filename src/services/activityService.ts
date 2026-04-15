import prisma from "../lib/prisma";

export const logActivity = async (type: string, description: string, userId?: number) => {
    return await prisma.activity.create({
        data: {
            type,
            description,
            userId
        }
    });
};

export const getActivities = async (skip: number = 0, take: number = 20) => {
    const [activities, total] = await Promise.all([
        prisma.activity.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.activity.count()
    ]);
    return { activities, total };
};

export const getUserActivities = async (userId: number, skip: number = 0, take: number = 20) => {
    const [activities, total] = await Promise.all([
        prisma.activity.findMany({
            where: { userId },
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.activity.count({ where: { userId } })
    ]);
    return { activities, total };
};
