import { Request, Response, NextFunction } from 'express';

const createHttpError = (status: number, message: string) => {
  const error: any = new Error(message);
  error.status = status;
  return error;
};

export function validatePost(req: Request, res: Response, next: NextFunction) {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return next(createHttpError(400, 'Title, content and authorId are required'));
  }

  next();
}

export function validateService(req: Request, res: Response, next: NextFunction) {
  const { name, description } = req.body;

  if (!name || !description) {
    return next(createHttpError(400, 'Service name and description are required'));
  }

  next();
}

export function validateTeamMember(req: Request, res: Response, next: NextFunction) {
  const { name, role, email } = req.body;

  if (!name || !role || !email) {
    return next(createHttpError(400, 'Name, role and email are required'));
  }

  next();
}

export function validateContactMessage(req: Request, res: Response, next: NextFunction) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(createHttpError(400, 'Name, email and message are required'));
  }

  next();
}

export function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
  // Basic check for update - at least one field should be present if not just changing image
  const { name, email, role } = req.body;
  if (!name && !email && !role && !req.file) {
    return next(createHttpError(400, 'At least one field or profile image must be provided for update'));
  }
  next();
}