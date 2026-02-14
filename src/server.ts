const message: string = "backend is running";
console.log(message);

import { Prisma } from '@prisma/client'
import { config } from '../prisma/prisma.config'  // adjust path if needed

const prisma = new Prisma.PrismaClient({ ...config })
