function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value || defaultValue || "";
}

export const ENV = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: getEnv('PORT', '5000'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  JWT_SECRET: getEnv('JWT_SECRET'),
  API_BASE_URL: getEnv('API_BASE_URL', 'http://localhost:5000'),
  CORS_ORIGIN: getEnv('CORS_ORIGIN', '*'),
  
  CLOUDINARY_CLOUD_NAME: getEnv('CLOUDINARY_CLOUD_NAME', ''),
  CLOUDINARY_API_KEY: getEnv('CLOUDINARY_API_KEY', ''),
  CLOUDINARY_API_SECRET: getEnv('CLOUDINARY_API_SECRET', ''),

  MAIL_HOST: getEnv('MAIL_HOST', 'smtp.gmail.com'),
  MAIL_PORT: getEnv('MAIL_PORT', '587'),
  MAIL_USER: getEnv('MAIL_USER', ''),
  MAIL_PASS: getEnv('MAIL_PASS', ''),
  MAIL_FROM: getEnv('MAIL_FROM', 'noreply@sohozasystem.com'),

  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID', ''),
};