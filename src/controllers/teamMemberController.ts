import { Request, Response } from "express";
import * as teamMemberService from "../services/teamMemberService";
import { getPagination } from "../utils/pagination";
import cloudinary from "../config/cloudinary";

// ─── Helper: upload buffer to Cloudinary ─────────────────────
const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'image' },
            (error, result) => {
                if (error || !result) return reject(error ?? new Error('Upload failed'));
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

// Create a new team member
export const createTeamMember = async (req: Request, res: Response) => {
    try {
        const { name, role, email, bio, status, socials } = req.body;
        let image: string | undefined = undefined;

        if (req.file?.buffer) {
            image = await uploadToCloudinary(req.file.buffer, 'sohoza-team');
        }

        const member = await teamMemberService.createTeamMember({
            name, role, email, bio, status, socials, image,
        });

        res.status(201).json({ message: "Team member created successfully", member });
    } catch (error: any) {
        if (error?.code === 'P2002') {
            return res.status(400).json({ message: 'A team member with this email already exists.' });
        }
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
            totalPages: Math.ceil(total / take),
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
        const data: any = { ...req.body };

        if (req.file?.buffer) {
            data.image = await uploadToCloudinary(req.file.buffer, 'sohoza-team');
        }

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
};

export const reorderTeamMembers = async (req: Request, res: Response) => {
    try {
        const { orderedIds } = req.body;
        if (!orderedIds || !Array.isArray(orderedIds)) {
            return res.status(400).json({ message: "orderedIds array is required" });
        }
        await teamMemberService.reorderTeamMembers(orderedIds.map(Number));
        res.json({ message: "Team members reordered successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
