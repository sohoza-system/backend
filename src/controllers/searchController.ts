import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const globalSearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Search query is required" });

        const searchStr = String(query);

        const [posts, services, teamMembers] = await Promise.all([
            prisma.post.findMany({
                where: {
                    OR: [
                        { title: { contains: searchStr, mode: 'insensitive' } },
                        { content: { contains: searchStr, mode: 'insensitive' } }
                    ]
                },
                take: 5
            }),
            prisma.service.findMany({
                where: {
                    OR: [
                        { name: { contains: searchStr, mode: 'insensitive' } },
                        { description: { contains: searchStr, mode: 'insensitive' } }
                    ]
                },
                take: 5
            }),
            prisma.teamMember.findMany({
                where: {
                    OR: [
                        { name: { contains: searchStr, mode: 'insensitive' } },
                        { role: { contains: searchStr, mode: 'insensitive' } }
                    ]
                },
                take: 5
            })
        ]);

        res.json({
            posts,
            services,
            teamMembers
        });
    } catch (error) {
        next(error);
    }
};
