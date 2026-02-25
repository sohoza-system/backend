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
        console.error('ORIGINAL PRISMA ERROR in createPost:', error);
        throw new Error(`Error creating post: ${error}`);
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
        console.error("PRISMA ERROR in getAllPosts:", error);
        throw new Error("Failed to fetch posts");
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
        throw new Error(`Error fetching related posts: ${error}`);
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
        throw new Error(`Error fetching post: ${error}`);
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
        throw new Error(`Error updating post: ${error}`);
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
        throw new Error(`Error deleting post: ${error}`);
    }
};
