import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

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
        // Only log first two lines of stack for brevity in console
        console.error(err.stack.split('\n').slice(0, 2).join('\n'));
    }
    console.error('-----------------');

    // Handle Prisma Specific Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint failed
        if (err.code === 'P2002') {
            const field = (err.meta?.target as string[])?.join(', ') || 'field';
            return res.status(400).json({
                error: 'Duplicate Entry',
                message: `A record with this ${field} already exists.`
            });
        }

        // Record not found
        if (err.code === 'P2025') {
            return res.status(404).json({
                error: 'Not Found',
                message: err.meta?.cause || 'The requested record was not found.'
            });
        }

        // Foreign key constraint failed
        if (err.code === 'P2003') {
            return res.status(400).json({
                error: 'Constraint Error',
                message: 'This operation failed because of a related record constraint.'
            });
        }
    }

    // Handle Validation Errors (from our middleware)
    if (err.status === 400) {
        return res.status(400).json({
            error: 'Bad Request',
            message: err.message
        });
    }

    // Default to 500 Internal Server Error
    const status = err.status || 500;
    res.status(status).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' && status === 500
            ? 'An unexpected error occurred'
            : message
    });
};
