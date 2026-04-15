import prisma from "../lib/prisma";

export const createComment = async (postId: number, authorId: number, content: string) => {
    return await prisma.comment.create({
        data: {
            content,
            postId,
            authorId
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true
                }
            }
        }
    });
};

export const getCommentsByPostId = async (postId: number, skip: number = 0, take: number = 20) => {
    const [comments, total] = await Promise.all([
        prisma.comment.findMany({
            where: { postId },
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true
                    }
                }
            }
        }),
        prisma.comment.count({ where: { postId } })
    ]);
    return { comments, total };
};

export const deleteComment = async (id: number) => {
    return await prisma.comment.delete({
        where: { id }
    });
};

export const updateComment = async (id: number, content: string) => {
    return await prisma.comment.update({
        where: { id },
        data: { content, updatedAt: new Date() }
    });
};
