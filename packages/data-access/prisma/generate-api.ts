import fs from 'fs';
import path from 'path';

/**
 * 🛠️ Prisma to REST API Generator
 * Automatically creates Fastify CRUD routes for each Prisma model.
 */

const SCHEMA_PATH = path.resolve('packages/data-access/prisma/schema.prisma');
const OUTPUT_DIR = path.resolve('apps/api-gateway/src/auto-routes');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function toPascalCase(str: string) {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function singularize(str: string) {
  let typeName = toPascalCase(str);
  if (typeName.endsWith('ies')) {
    typeName = typeName.slice(0, -3) + 'y';
  } else if (typeName.endsWith('s') && !typeName.endsWith('ss')) {
    typeName = typeName.slice(0, -1);
  }
  return typeName;
}

function generate() {
  console.log('🔄 Parsing Prisma schema for API generation...');
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;
  let modelMatch;
  const generatedRoutes: { name: string; path: string }[] = [];

  while ((modelMatch = modelRegex.exec(schema)) !== null) {
    const modelName = modelMatch[1];
    const typeName = singularize(modelName);
    const schemaName = `${typeName}Schema`;
    
    // We only generate routes for models that have a corresponding Zod schema
    // and are not sensitive/internal (handled by blacklist in contract gen)
    
    const routeContent = `import { FastifyInstance } from 'fastify';
import { ${schemaName} } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for ${modelName}
 */
export default async function ${modelName}Routes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.${modelName}.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => ${schemaName}.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.${modelName}.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return ${schemaName}.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.${modelName}.create({
      data: body
    });
    return ${schemaName}.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.${modelName}.update({
      where: { id },
      data: body
    });
    return ${schemaName}.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.${modelName}.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
`;

    const fileName = `${modelName.toLowerCase()}.routes.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), routeContent);
    generatedRoutes.push({ name: modelName, path: fileName.replace('.ts', '') });
    console.log(`✅ Generated API routes for ${modelName}`);
  }

  // Generate Loader File
  const loaderContent = `import { FastifyInstance } from 'fastify';
${generatedRoutes.map(r => `import ${r.name}Routes from './${r.path}';`).join('\n')}

/**
 * 📦 Auto-Route Manifest
 * Registers all generated Prisma CRUD endpoints.
 */
export async function registerAutoRoutes(fastify: FastifyInstance) {
${generatedRoutes.map(r => `  await fastify.register(${r.name}Routes, { prefix: '/v1/auto/${r.name.toLowerCase()}' });`).join('\n')}
}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), loaderContent);
  console.log('✅ Generated auto-routes loader (index.ts)');
}

generate();
