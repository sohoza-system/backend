import { Request, Response } from "express";
import * as serviceService from "../services/serviceService";

// Create a new service
export const createService = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const service = await serviceService.createService(data);
        res.status(201).json({ message: "Service created successfully", service });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json({ message: "Services fetched successfully", services });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get service by ID
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await serviceService.getServiceById(Number(id));
        res.status(200).json({ message: "Service fetched successfully", service });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Update service
export const updateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const service = await serviceService.updateService(Number(id), data);
        res.status(200).json({ message: "Service updated successfully", service });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete service
export const deleteService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await serviceService.deleteService(Number(id));
        res.status(200).json({ message: "Service deleted successfully", service });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
