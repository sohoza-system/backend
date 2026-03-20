import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await categoryService.createCategory(name);
        res.status(201).json(category);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryService.updateCategory(Number(id), name);
        res.json(category);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(Number(id));
        res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
