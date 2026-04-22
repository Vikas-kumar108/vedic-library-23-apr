import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Optimizing PostgreSQL with native ltree indexing...')
  
  // 1. Convert column type to ltree
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "LibraryNode" 
    ALTER COLUMN "path" TYPE ltree USING path::ltree;
  `)

  // 2. Add GIST index for fast hierarchical queries
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "LibraryNode_path_gist_idx" ON "LibraryNode" USING GIST ("path");
  `)

  console.log('Postgres optimization complete.')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
