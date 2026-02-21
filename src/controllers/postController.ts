import { Request, Response } from "express";
import * as postService from "../services/postService";
import { getPagination } from "../utils/pagination";
import cloudinary from "../config/cloudinary";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, authorId } = req.body;
        let imageUrl: string | null = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const post = await postService.createPost({
            title,
            content,
            authorId: Number(authorId),
            imageUrl
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
        const { posts, total } = await postService.getAllPosts(skip, take);

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
