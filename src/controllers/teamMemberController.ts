import { Request, Response } from "express";
import * as teamMemberService from "../services/teamMemberService";

import { getPagination } from "../utils/pagination";

// Create a new team member
export const createTeamMember = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const member = await teamMemberService.createTeamMember(data);
        res.status(201).json({ message: "Team member created successfully", member });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all team members
export const getAllTeamMembers = async (req: Request, res: Response) => {
    try {
        const { skip, take } = getPagination(req.query);
        const { members, total } = await teamMemberService.getAllTeamMembers(skip, take);

        res.status(200).json({
            data: members,
            total,
            page: Number(req.query.page) || 1,
            totalPages: Math.ceil(total / take)
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get team member by ID
export const getTeamMemberById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const member = await teamMemberService.getTeamMemberById(Number(id));
        res.status(200).json({ message: "Team member fetched successfully", member });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Update team member
export const updateTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const member = await teamMemberService.updateTeamMember(Number(id), data);
        res.status(200).json({ message: "Team member updated successfully", member });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete team member
export const deleteTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const member = await teamMemberService.deleteTeamMember(Number(id));
        res.status(200).json({ message: "Team member deleted successfully", member });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
