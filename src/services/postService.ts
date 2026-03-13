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
    status?: string;
    imageUrl?: string | null;
}

// Create a new post
export const createPost = async (data: CreatePostInput) => {
    try {
        const post = await prisma.post.create({
            data: {
                ...data,
                authorId: Number(data.authorId)
            },
            include: {
                author: true,
                comments: true,
                categories: true,
            }
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
        // ✅ Build where clause cleanly — no undefined keys
        const where: any = {};

        if (search) {
            where.OR = [
                { title:       { contains: search, mode: 'insensitive' } },
                { content:     { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (category) {
            where.categories = {
                some: {
                    category: {
                        name: { contains: category, mode: 'insensitive' }
                    }
                }
            };
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    author:     true,
                    comments:   true,
                    categories: {
                        include: { category: true }
                    },
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

        const categoryIds = sourcePost.categories.map((c: any) => c.categoryId);

        if (categoryIds.length === 0) {
            return await prisma.post.findMany({
                where: { id: { not: postId } },
                take: limit,
                orderBy: { createdAt: 'desc' }
            });
        }

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
                categories: { include: { category: true } },
                author: true
            },
            orderBy: { createdAt: 'desc' }
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
                author:     true,
                comments:   true,
                categories: { include: { category: true } },
            },
        });
        if (!post) throw new Error("Post not found");
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
            include: {
                author:     true,
                comments:   true,
                categories: { include: { category: true } },
            }
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