import prisma from "../lib/prisma";

export interface CreatePostInput {
    title: string;
    description?: string;
    content: string;
    authorId: number;
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

// Get all posts with pagination
export const getAllPosts = async (skip: number = 0, take: number = 10) => {
    try {
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: true,
                    comments: true,
                    categories: true
                }
            }),
            prisma.post.count()
        ]);
        return { posts, total };
    } catch (error: any) {
        console.error("PRISMA ERROR in getAllPosts:", error);
        throw new Error("Failed to fetch posts");
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
