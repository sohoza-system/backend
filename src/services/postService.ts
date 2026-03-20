import prisma from "../lib/prisma";

export interface CreatePostInput {
    title: string;
    description?: string;
    content: string;
    authorId: number;
    imageUrl?: string | null;
}

export interface UpdatePostInput {
    title?: string;
    description?: string;
    content?: string;
    published?: boolean;
}

// Create a new post
export const createPost = async (data: CreatePostInput) => {
    try {
        const post = await prisma.post.create({
            data: {
                ...data,
                authorId: Number(data.authorId)
            },
        });
        return post;
    } catch (error) {
        console.error('Error in createPost:', error);
        throw error; // Re-throw the original error to be handled by middleware
    }
};

// Get all posts with pagination, search, and category filtering
export const getAllPosts = async (skip: number = 0, take: number = 10, search?: string, category?: string) => {
    try {
        const where: any = {
            OR: search ? [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ] : undefined,
            categories: category ? {
                some: {
                    name: { contains: category, mode: 'insensitive' }
                }
            } : undefined
        };

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: true,
                    comments: true,
                    categories: true
                }
            }),
            prisma.post.count({ where })
        ]);
        return { posts, total };
    } catch (error: any) {
        console.error("Error in getAllPosts:", error);
        throw error;
    }
};

// Recommendation Algorithm: Get related posts based on shared categories
export const getRelatedPosts = async (postId: number, limit: number = 3) => {
    try {
        const sourcePost = await prisma.post.findUnique({
            where: { id: postId },
            include: { categories: true }
        });

        if (!sourcePost) throw new Error("Source post not found");

        const categoryIds = sourcePost.categories.map(c => c.categoryId);

        if (categoryIds.length === 0) {
            // Fallback: Get latest posts if no categories
            return await prisma.post.findMany({
                where: { id: { not: postId } },
                take: limit,
                orderBy: { createdAt: 'desc' }
            });
        }

        // Find posts with the most common categories
        const relatedPosts = await prisma.post.findMany({
            where: {
                id: { not: postId },
                categories: {
                    some: {
                        categoryId: { in: categoryIds }
                    }
                }
            },
            take: limit,
            include: {
                categories: true,
                author: true
            },
            orderBy: {
                createdAt: 'desc' // Secondary sort by date
            }
        });

        return relatedPosts;
    } catch (error) {
        console.error("Error in getRelatedPosts:", error);
        throw error;
    }
};

// Get post by ID
export const getPostById = async (id: number) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                comments: true,
            },
        });
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    } catch (error) {
        console.error("Error in getPostById:", error);
        throw error;
    }
};

// Update post
export const updatePost = async (id: number, data: UpdatePostInput) => {
    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });
        return post;
    } catch (error) {
        console.error("Error in updatePost:", error);
        throw error;
    }
};

// Toggle post status (draft/published)
export const togglePostStatus = async (id: number, status: string) => {
    try {
        return await prisma.post.update({
            where: { id },
            data: { status, updatedAt: new Date() }
        });
    } catch (error) {
        console.error("Error in togglePostStatus:", error);
        throw error;
    }
};

// Like a post
export const likePost = async (postId: number, userId: number) => {
    try {
        return await prisma.postLike.create({
            data: {
                postId,
                userId
            }
        });
    } catch (error) {
        console.error("Error in likePost:", error);
        throw error;
    }
};

// Unlike a post
export const unlikePost = async (postId: number, userId: number) => {
    try {
        return await prisma.postLike.delete({
            where: {
                postId_userId: {
                    postId,
                    userId
                }
            }
        });
    } catch (error) {
        console.error("Error in unlikePost:", error);
        throw error;
    }
};

// Delete post
export const deletePost = async (id: number) => {
    try {
        const post = await prisma.post.delete({
            where: { id },
        });
        return post;
    } catch (error) {
        console.error("Error in deletePost:", error);
        throw error;
    }
};
