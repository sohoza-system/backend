import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const googleAuthSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
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
    visitorId: z.string().optional(),
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
    skills: z.array(z.number()).optional(), // optional skill IDs
  }),
});

export const skillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Skill name is required'),
    icon: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const projectSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Project title is required'),
    slug: z.string().min(2, 'Slug is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    content: z.string().optional(),
    liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),
    githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    images: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    status: z.enum(['completed', 'active', 'building']).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    skills: z.array(z.number()).optional(),
    teamMembers: z.array(z.number()).optional(),
  }),
});

export const projectLeadSchema = z.object({
  body: z.object({
    clientName: z.string().min(2, 'Client name is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    budget: z.string().optional(),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    status: z.string().optional(),
    notes: z.string().optional(),
    visitorId: z.string().optional(),
  }),
});

export const settingsSchema = z.object({
  body: z.object({
    siteName: z.string().optional(),
    siteDescription: z.string().optional(),
    contactEmail: z.string().email('Invalid email').optional().or(z.literal('')),
    contactPhone: z.string().optional(),
    companyAddress: z.string().optional(),
    logoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    faviconUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    metaKeywords: z.string().optional(),
    metaImage: z.string().url().optional().or(z.literal('')),
    googleAnalyticsId: z.string().optional(),
    maintenanceMode: z.boolean().optional(),
    maintenanceMessage: z.string().optional(),
    requireEmailVerify: z.boolean().optional(),
    enableBlogComments: z.boolean().optional(),
    socialLinks: z.any().optional(),
    termsAndConditionsUrl: z.string().url().optional().or(z.literal('')),
    privacyPolicyUrl: z.string().url().optional().or(z.literal('')),
  })
});

