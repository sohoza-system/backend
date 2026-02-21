import { Request, Response, NextFunction } from 'express';

export function validatePost(req: Request, res: Response, next: NextFunction) {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({
      error: 'Title, content and authorId are required'
    });
  }

  next();
}