import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('--- ERROR LOG ---');
    console.error(`Path: ${req.path}`);
    console.error(`Method: ${req.method}`);
    console.error(`Message: ${err.message}`);

    if (err.stack) {
        console.error(err.stack.split('\n').slice(0, 2).join('\n'));
    }
    console.error('-----------------');

    // Handle Zod Validation Errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation Error',
            errors: err.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
            })),
        });
    }

    // Handle Prisma Specific Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            const field = (err.meta?.target as string[])?.join(', ') || 'field';
            return res.status(400).json({
                error: 'Duplicate Entry',
                message: `A record with this ${field} already exists.`
            });
        }

        if (err.code === 'P2025') {
            return res.status(404).json({
                error: 'Not Found',
                message: err.meta?.cause || 'The requested record was not found.'
            });
        }

        if (err.code === 'P2003') {
            return res.status(400).json({
                error: 'Constraint Error',
                message: 'This operation failed because of a related record constraint.'
            });
        }
    }

    // Default to 500 Internal Server Error
    const status = err.status || 500;
    res.status(status).json({
        status: status === 500 ? 'error' : 'fail',
        message: process.env.NODE_ENV === 'production' && status === 500
            ? 'An unexpected error occurred'
            : err.message
    });
};
