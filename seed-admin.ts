import prisma from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const hash = await bcrypt.hash('Admin123!', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@sohoza.com' },
    update: { role: 'ADMIN' },
    create: { name: 'Admin', email: 'admin@sohoza.com', password: hash, role: 'ADMIN' }
  });
  console.log('Done:', user.email, user.role);
}

main();
