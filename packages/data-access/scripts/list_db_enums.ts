import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listDBEnums() {
  console.log('--- VEDIC INSTITUTIONAL OS: DATABASE ENUM AUDIT ---');
  console.log('--------------------------------------------------');

  try {
    const enums: any[] = await prisma.$queryRawUnsafe(`
      SELECT n.nspname AS schema,
             t.typname AS enum_name,
             e.enumlabel AS enum_value
      FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      JOIN pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname IN ('identity', 'public')
      ORDER BY schema, enum_name, e.enumsortorder;
    `);

    // Group by schema and enum_name for cleaner output
    const grouped: Record<string, Record<string, string[]>> = {};

    enums.forEach((row) => {
      if (!grouped[row.schema]) grouped[row.schema] = {};
      if (!grouped[row.schema][row.enum_name]) grouped[row.schema][row.enum_name] = [];
      grouped[row.schema][row.enum_name].push(row.enum_value);
    });

    for (const [schema, schemaEnums] of Object.entries(grouped)) {
      console.log(`\nSCHEMA: ${schema.toUpperCase()}`);
      for (const [name, values] of Object.entries(schemaEnums)) {
        console.log(`  - ${name}: [${values.join(', ')}]`);
      }
    }
  } catch (error: any) {
    console.error('Error auditing enums:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

listDBEnums();
