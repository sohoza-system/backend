import prisma from "../lib/prisma";

export const createLead = async (data: any) => {
    return await prisma.projectLead.create({ data });
};

export const getAllLeads = async (options: { skip?: number, take?: number, status?: string } = {}) => {
    const { skip, take, status } = options;
    return await prisma.projectLead.findMany({
        skip,
        take,
        where: status ? { status } : undefined,
        orderBy: { createdAt: 'desc' }
    });
};

export const getLeadById = async (id: number) => {
    const lead = await prisma.projectLead.findUnique({ where: { id } });
    if (!lead) throw new Error("Lead not found");
    return lead;
};

export const updateLeadStatus = async (id: number, status: string, notes?: string) => {
    return await prisma.projectLead.update({
        where: { id },
        data: {
            status,
            notes: notes !== undefined ? notes : undefined
        }
    });
};

export const deleteLead = async (id: number) => {
    return await prisma.projectLead.delete({ where: { id } });
};
