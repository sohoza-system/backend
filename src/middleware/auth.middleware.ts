import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/permissions";
import prisma from "../lib/prisma";

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);

            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
            });

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Insufficient permissions" });
        }

        next();
    };
};
