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
        // Handle features if it's sent as a string (comma-separated)
        if (typeof data.features === 'string') {
            data.features = (data.features as string).split(',').map(f => f.trim());
        }

        const service = await prisma.service.create({
            data,
        });
        return service;
    } catch (error) {
        console.error('ORIGINAL PRISMA ERROR in createService:', error);
        throw new Error(`Error creating service: ${error}`);
    }
};

// Get all services with pagination
export const getAllServices = async (skip: number = 0, take: number = 10) => {
    try {
        const [services, total] = await Promise.all([
            prisma.service.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.service.count()
        ]);
        return { services, total };
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
