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

export function validateService(req: Request, res: Response, next: NextFunction) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: 'Service name and description are required'
    });
  }

  next();
}

export function validateTeamMember(req: Request, res: Response, next: NextFunction) {
  const { name, role, email } = req.body;

  if (!name || !role || !email) {
    return res.status(400).json({
      error: 'Name, role and email are required'
    });
  }

  next();
}

export function validateContactMessage(req: Request, res: Response, next: NextFunction) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Name, email and message are required'
    });
  }

  next();
}

export function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
  // Basic check for update - at least one field should be present if not just changing image
  const { name, email, role } = req.body;
  if (!name && !email && !role && !req.file) {
    return res.status(400).json({
      error: 'At least one field or profile image must be provided for update'
    });
  }
  next();
}