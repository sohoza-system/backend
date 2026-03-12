import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name is too short').optional(),
  }),
});

export const subscribeSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export const contactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address'),
    subject: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
});

export const postSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(20, 'Content is too short'),
    status: z.enum(['published', 'draft']).optional(),
    categories: z.array(z.number()).optional(),
  }),
});

export const serviceSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Service name is too short'),
    description: z.string().min(10, 'Description is too short'),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
});

export const teamMemberSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is too short'),
    role: z.string().min(2, 'Role is too short'),
    email: z.string().email('Invalid email address'),
    bio: z.string().optional(),
    image: z.string().optional(),
    status: z.string().optional(),
  }),
});
