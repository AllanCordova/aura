/**
 * @jest-environment node
 */

import prisma from "@/lib/prisma";

beforeEach(async () => {
  const tables = await prisma.$queryRawUnsafe<Array<{ tablename: string }>>(`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `);

  const tablesToTruncate = tables
    .map((table) => table.tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"${name}"`)
    .join(", ");

  if (tablesToTruncate.length > 0) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tablesToTruncate} CASCADE;`
    );
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
