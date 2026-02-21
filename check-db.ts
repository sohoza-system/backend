import prisma from "./src/lib/prisma";

async function checkDatabase() {
  console.log('Checking database connection...');
  try {
    // 1. Try to connect
    await prisma.$connect();
    console.log('✅ Database connection successful.');

    // 2. List tables as a further check
    console.log('Fetching tables...');
    const tables: { table_name: string }[] = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;

    if (tables.length > 0) {
      console.log('✅ Found tables:');
      console.table(tables);
    } else {
      console.warn('⚠️ No tables found in the public schema. This might be expected.');
    }
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  }
}

checkDatabase();
