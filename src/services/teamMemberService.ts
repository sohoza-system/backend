import prisma from "../lib/prisma";

export interface CreateTeamMemberInput {
  name: string;
  role: string;
  email: string;
  bio?: string;
  image?: string;
  status?: string;
  socials?: any;
}

export interface UpdateTeamMemberInput {
  name?: string;
  role?: string;
  email?: string;
  bio?: string;
  image?: string;
  status?: string;
  socials?: any;
}

// Create a new team member
export const createTeamMember = async (data: CreateTeamMemberInput) => {
  try {
    const member = await prisma.teamMember.create({
      data,
    });
    return member;
  } catch (error) {
    console.error('ORIGINAL PRISMA ERROR in createTeamMember:', error);
    throw new Error(`Error creating team member: ${error}`);
  }
};

// Get all team members
export const getAllTeamMembers = async () => {
  try {
    const members = await prisma.teamMember.findMany();
    return members;
  } catch (error) {
    throw new Error(`Error fetching team members: ${error}`);
  }
};

// Get team member by ID
export const getTeamMemberById = async (id: number) => {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });
    if (!member) {
      throw new Error("Team member not found");
    }
    return member;
  } catch (error) {
    throw new Error(`Error fetching team member: ${error}`);
  }
};

// Update team member
export const updateTeamMember = async (id: number, data: UpdateTeamMemberInput) => {
  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return member;
  } catch (error) {
    throw new Error(`Error updating team member: ${error}`);
  }
};

// Delete team member
export const deleteTeamMember = async (id: number) => {
  try {
    const member = await prisma.teamMember.delete({
      where: { id },
    });
    return member;
  } catch (error) {
    throw new Error(`Error deleting team member: ${error}`);
  }
};
