import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SOHOZA API Documentation',
            version: '1.0.0',
            description: 'Comprehensive API documentation for the SOHOZA system backend.',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        tags: [
            { name: 'Authentication', description: 'Login, Register, Google Auth, Password Reset' },
            { name: 'Users', description: 'User management (CRUD, roles, profile)' },
            { name: 'Projects', description: 'Portfolio projects showcase' },
            { name: 'Skills', description: 'Tech stack and developer skills' },
            { name: 'Leads', description: 'Client project inquiry CRM pipeline' },
            { name: 'Posts', description: 'Blog articles and content management' },
            { name: 'Comments', description: 'Post comments and moderation' },
            { name: 'Categories', description: 'Blog post categories' },
            { name: 'Services', description: 'Agency service offerings' },
            { name: 'Team Members', description: 'Developer collective team roster' },
            { name: 'Contact', description: 'General contact messages from visitors' },
            { name: 'Newsletter', description: 'Newsletter subscriptions and management' },
            { name: 'Media', description: 'Cloudinary media library' },
            { name: 'Analytics', description: 'Site analytics and visit tracking' },
            { name: 'Activities', description: 'Admin activity & security audit logs' },
            { name: 'Settings', description: 'Global platform configuration' },
            { name: 'Search', description: 'Global search across content' },
        ],
    },
    apis: ['./src/routes/*.ts', './src/routes/*.js'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
