function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const ENV = {
  CLOUD_NAME: getEnv('CLOUD_NAME'),
  CLOUD_API_KEY: getEnv('CLOUD_API_KEY'),
  CLOUD_API_SECRET: getEnv('CLOUD_API_SECRET'),
  JWT_SECRET: getEnv('JWT_SECRET'),
};