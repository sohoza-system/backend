import { Request, Response } from "express";
import * as postService from "../services/postService";
import { getPagination } from "../utils/pagination";
import cloudinary from "../config/cloudinary";

// ─── Helper: upload buffer to Cloudinary ─────────────────────
const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'image' },
            (error, result) => {
                if (error || !result) return reject(error ?? new Error('Upload failed'));
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, authorId, description, status, published } = req.body;
        let imageUrl: string | null = null;

        if (req.file?.buffer) {
            imageUrl = await uploadToCloudinary(req.file.buffer, 'sohoza-uploads');
        }

        const post = await postService.createPost({
            title,
            content,
            description,
            authorId: Number(authorId),
            imageUrl,
        });

        res.status(201).json({ message: "Post created successfully", post });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const { skip, take } = getPagination(req.query);
        const { search, category } = req.query;

        const { posts, total } = await postService.getAllPosts(
            skip,
            take,
            search as string,
            category as string
        );

        res.status(200).json({
            data: posts,
            total,
            page: Number(req.query.page) || 1,
            totalPages: Math.ceil(total / take)
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get Related Posts
export const getRelatedPosts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const limit = Number(req.query.limit) || 3;
        const posts = await postService.getRelatedPosts(Number(id), limit);
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get post by ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(Number(id));
        res.status(200).json(post);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // If a new image was uploaded, push it to Cloudinary
        if (req.file?.buffer) {
            data.imageUrl = await uploadToCloudinary(req.file.buffer, 'sohoza-uploads');
        }

        const post = await postService.updatePost(Number(id), data);
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete post
export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await postService.deletePost(Number(id));
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
};

export const togglePostStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const post = await postService.togglePostStatus(Number(id), status);
        res.json(post);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.id;
        await postService.likePost(Number(id), userId);
        res.json({ message: "Post liked" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const unlikePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.id;
        await postService.unlikePost(Number(id), userId);
        res.json({ message: "Post unliked" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
