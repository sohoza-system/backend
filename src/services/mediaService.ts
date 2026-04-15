import prisma from "../lib/prisma";

export const getAllMedia = async (skip: number = 0, take: number = 20) => {
    const [media, total] = await Promise.all([
        prisma.media.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.media.count()
    ]);
    return { media, total };
};

export const deleteMedia = async (id: number) => {
    return await prisma.media.delete({
        where: { id }
    });
};

export const recordMedia = async (data: { url: string; publicId?: string; fileName?: string; fileType?: string; fileSize?: number; userId?: number }) => {
    return await prisma.media.create({
        data
    });
};
