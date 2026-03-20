import prisma from "../lib/prisma";

export const createProject = async (data: any) => {
    const { skills, teamMembers, ...rest } = data;
    return await prisma.project.create({
        data: {
            ...rest,
            skills: skills ? { connect: skills.map((id: number) => ({ id })) } : undefined,
            teamMembers: teamMembers ? { connect: teamMembers.map((id: number) => ({ id })) } : undefined,
        },
        include: { skills: true, teamMembers: true }
    });
};

export const getAllProjects = async (options: { skip?: number, take?: number } = {}) => {
    return await prisma.project.findMany({
        ...options,
        include: { skills: true, teamMembers: true },
        orderBy: { createdAt: 'desc' }
    });
};

export const getProjectById = async (id: number) => {
    const project = await prisma.project.findUnique({
        where: { id },
        include: { skills: true, teamMembers: true }
    });
    if (!project) throw new Error("Project not found");
    return project;
};

export const getProjectBySlug = async (slug: string) => {
    const project = await prisma.project.findUnique({
        where: { slug },
        include: { skills: true, teamMembers: true }
    });
    if (!project) throw new Error("Project not found");
    return project;
};

export const updateProject = async (id: number, data: any) => {
    const { skills, teamMembers, ...rest } = data;
    return await prisma.project.update({
        where: { id },
        data: {
            ...rest,
            skills: skills ? { set: skills.map((id: number) => ({ id })) } : undefined,
            teamMembers: teamMembers ? { set: teamMembers.map((id: number) => ({ id })) } : undefined,
        },
        include: { skills: true, teamMembers: true }
    });
};

export const deleteProject = async (id: number) => {
    return await prisma.project.delete({ where: { id } });
};
