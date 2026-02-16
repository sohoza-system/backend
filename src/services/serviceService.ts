import prisma from "../lib/prisma";

export interface CreateServiceInput {
    name: string;
    description: string;
    icon?: string;
    features?: string[];
    status?: string;
}

export interface UpdateServiceInput {
    name?: string;
    description?: string;
    icon?: string;
    features?: string[];
    status?: string;
}

// Create a new service
export const createService = async (data: CreateServiceInput) => {
    try {
        const service = await prisma.service.create({
            data,
        });
        return service;
    } catch (error) {
        throw new Error(`Error creating service: ${error}`);
    }
};

// Get all services
export const getAllServices = async () => {
    try {
        const services = await prisma.service.findMany();
        return services;
    } catch (error) {
        throw new Error(`Error fetching services: ${error}`);
    }
};

// Get service by ID
export const getServiceById = async (id: number) => {
    try {
        const service = await prisma.service.findUnique({
            where: { id },
        });
        if (!service) {
            throw new Error("Service not found");
        }
        return service;
    } catch (error) {
        throw new Error(`Error fetching service: ${error}`);
    }
};

// Update service
export const updateService = async (id: number, data: UpdateServiceInput) => {
    try {
        const service = await prisma.service.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });
        return service;
    } catch (error) {
        throw new Error(`Error updating service: ${error}`);
    }
};

// Delete service
export const deleteService = async (id: number) => {
    try {
        const service = await prisma.service.delete({
            where: { id },
        });
        return service;
    } catch (error) {
        throw new Error(`Error deleting service: ${error}`);
    }
};
