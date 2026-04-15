import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const hash = await bcrypt.hash('Admin123!', 10);
const user = await prisma.user.upsert({
  where: { email: 'admin@sohoza.com' },
  update: { role: 'ADMIN' },
  create: { name: 'Admin', email: 'admin@sohoza.com', password: hash, role: 'ADMIN' }
});
console.log('Done:', user.email, user.role);
await prisma.();
