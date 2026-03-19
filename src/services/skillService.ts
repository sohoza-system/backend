import prisma from "../lib/prisma";

export const createSkill = async (data: any) => {
    return await prisma.skill.create({ data });
};

export const getAllSkills = async () => {
    return await prisma.skill.findMany();
};

export const getSkillById = async (id: number) => {
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new Error("Skill not found");
    return skill;
};

export const updateSkill = async (id: number, data: any) => {
    return await prisma.skill.update({
        where: { id },
        data
    });
};

export const deleteSkill = async (id: number) => {
    return await prisma.skill.delete({ where: { id } });
};
