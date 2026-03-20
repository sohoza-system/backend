import prisma from "../lib/prisma";

export const getAllCategories = async () => {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });
};

export const createCategory = async (name: string) => {
    return await prisma.category.create({
        data: { name }
    });
};

export const updateCategory = async (id: number, name: string) => {
    return await prisma.category.update({
        where: { id },
        data: { name }
    });
};

export const deleteCategory = async (id: number) => {
    return await prisma.category.delete({
        where: { id }
    });
};
