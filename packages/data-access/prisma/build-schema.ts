import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = path.resolve(__dirname, 'modules');
const targetFile = path.resolve(__dirname, 'schema.prisma');

// Explicit load order (IDENTITY FIRST)
const order = [
  'generator.prisma',
  'identity.enums.prisma',
  'enums.prisma',
  'identity.prisma',
  'knowledge.prisma',
  'finance.prisma',
  'community.prisma',
  'communication.prisma',
  'interaction.prisma',
  'system.prisma'
];

// Ensure critical modules exist
function assertCorePresence(files: string[]) {
  const required = ['identity.enums.prisma', 'identity.prisma'];

  for (const file of required) {
    if (!files.includes(file)) {
      throw new Error(`❌ Missing required module: ${file}`);
    }
  }
}

// Sanitize + prevent duplicates
function sanitize(content: string, seen: { generator: boolean; datasource: boolean }): string {
  if (!content.endsWith('\n')) content += '\n';

  // Prevent duplicate generator blocks
  if (/generator\s+\w+/.test(content)) {
    if (seen.generator) return '';
    seen.generator = true;
  }

  // Prevent duplicate datasource blocks
  if (/datasource\s+\w+/.test(content)) {
    if (seen.datasource) return '';
    seen.datasource = true;
  }

  return content;
}

function buildSchema() {
  console.log('\n🔧 Building modular Prisma schema...\n');

  if (!fs.existsSync(modulesDir)) {
    throw new Error(`❌ Modules directory not found: ${modulesDir}`);
  }

  const files = fs.readdirSync(modulesDir);

  assertCorePresence(files);

  const orderedFiles = order.filter(f => files.includes(f));

  const remainingFiles = files
    .filter(f => !order.includes(f) && f.endsWith('.prisma'))
    .sort();

  const finalFiles = [...orderedFiles, ...remainingFiles];

  let fullSchema = '';

  // Track duplicates
  const seen = {
    generator: false,
    datasource: false
  };

  for (const file of finalFiles) {
    console.log(`→ Merging ${file}`);

    let content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
    content = sanitize(content, seen);

    if (!content.trim()) continue;

    fullSchema += `// --- FROM ${file} ---\n\n${content}\n`;
  }

  // FINAL SAFETY CHECK
  if (!seen.generator) {
    throw new Error('❌ Missing generator block');
  }

  if (!seen.datasource) {
    throw new Error('❌ Missing datasource block');
  }

  // AUTO-GENERATED HEADER (CRITICAL DISCIPLINE)
  fullSchema =
    `// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
// Source of truth: prisma/modules/*
// Edit modules and rebuild using: npx tsx prisma/build-schema.ts

\n` + fullSchema;

  fs.writeFileSync(targetFile, fullSchema);

  console.log('\n--------------------------------------------------');
  console.log(`✅ Schema built successfully: ${targetFile}`);
  console.log('--------------------------------------------------\n');

  // VALIDATE SCHEMA
  try {
    console.log('🔍 Validating Prisma schema...');
    execSync('npx prisma validate', { stdio: 'inherit' });
    console.log('✅ Prisma schema is valid\n');
  } catch (err) {
    console.error('\n❌ Prisma validation failed');
    process.exit(1);
  }
}

// RUN
try {
  buildSchema();
} catch (err) {
  console.error('\n💥 Build failed:', err);
  process.exit(1);
}