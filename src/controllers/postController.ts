import { Request, Response } from "express";
import * as postService from "../services/postService";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const post = await postService.createPost(data);
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAllPosts();
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
