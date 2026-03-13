import 'dotenv/config';
import prisma from './src/lib/prisma';

async function main() {
  const user = await prisma.user.update({
    where: { email: 'admin@sohoza.com' },
    data: { role: 'ADMIN' }
  });
  console.log('Done:', user.email, user.role);
}

main();
