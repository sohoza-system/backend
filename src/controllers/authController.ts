import { Request, Response } from "express";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const { user, token, refreshToken } = await authService.login(email, password);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token,
            refreshToken
        });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: "Refresh token is required" });
        const data = await authService.refreshAccessToken(token);
        res.json(data);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = await authService.forgotPassword(email);
        res.json({ message: "Reset token generated", token }); // In production, don't return the token
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        const result = await authService.resetPassword(token, newPassword);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
