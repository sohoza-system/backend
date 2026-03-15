// src/lib/prisma.ts
import 'dotenv/config'; // ✅ MUST be first — loads .env before anything else
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({
  connectionString,
  // IMPORTANT: In production, `rejectUnauthorized` should be `true`.
  // `false` is only for development with self-signed certificates and is insecure.
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: true }
    : { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool as any);
=======
import { PrismaClient } from '../../../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in your .env file');
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // ✅ required for Neon (cloud PostgreSQL)
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
>>>>>>> ce635ba (updated backend)

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
