import fs from 'fs';
import path from 'path';

/**
 * 🛠️ Prisma to Zod Contract Generator
 * Automatically syncs Prisma models to shared frontend/backend contracts.
 */

const SCHEMA_PATH = path.resolve('packages/data-access/prisma/schema.prisma');
const OUTPUT_DIR = path.resolve('packages/contracts/generated');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function toPascalCase(str: string) {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generate() {
  console.log('🔄 Parsing Prisma schema...');
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

  // 1. Extract Enums
  const enums: Record<string, string[]> = {};
  const enumRegex = /enum\s+(\w+)\s+\{([\s\S]*?)\}/g;
  let enumMatch;
  while ((enumMatch = enumRegex.exec(schema)) !== null) {
    const name = enumMatch[1];
    const values = enumMatch[2]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('//') && !line.startsWith('@@'))
      .map((val) => val.split(' ')[0]);
    enums[name] = values;
  }

  // 2. Extract Models
  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;
  let modelMatch;
  const generatedFiles: string[] = [];

  while ((modelMatch = modelRegex.exec(schema)) !== null) {
    const modelName = modelMatch[1];
    const body = modelMatch[2];
    
    // Simple but effective singularization logic
    let typeName = toPascalCase(modelName);
    if (typeName.endsWith('ies')) {
      typeName = typeName.slice(0, -3) + 'y';
    } else if (typeName.endsWith('s') && !typeName.endsWith('ss')) {
      typeName = typeName.slice(0, -1);
    }

    const lines = body.split('\n').map((l) => l.trim());
    const fields: string[] = [];

    lines.forEach((line) => {
      if (!line || line.startsWith('//') || line.startsWith('@@')) return;

      const parts = line.split(/\s+/);
      if (parts.length < 2) return;

      const name = parts[0];
      const rawType = parts[1];

      // Security: Exclude sensitive fields from output types
      const blacklist = ['password', 'verification_token', 'reset_token', 'reset_token_expires', 'failed_login_attempts', 'account_locked_until'];
      if (blacklist.includes(name)) return;

      const isArray = rawType.endsWith('[]');
      const type = rawType.replace('[]', '').replace('?', '');
      const isOptional = rawType.includes('?');

      // Skip relations (types that are not scalars or enums)
      const scalars = ['String', 'Int', 'Float', 'Boolean', 'DateTime', 'Json', 'Decimal', 'BigInt'];
      if (!scalars.includes(type) && !enums[type]) return;

      let zodType = '';

      if (enums[type]) {
        zodType = `z.enum([${enums[type].map((v) => `"${v}"`).join(', ')}])`;
      } else {
        switch (type) {
          case 'String':
            zodType = 'z.string()';
            if (name === 'id' || name.endsWith('_id')) zodType += '.uuid()';
            if (name === 'email') zodType += '.email()';
            break;
          case 'Int':
          case 'Float':
          case 'Decimal':
          case 'BigInt':
            zodType = 'z.number()';
            break;
          case 'Boolean':
            zodType = 'z.boolean()';
            break;
          case 'DateTime':
            zodType = 'z.coerce.date()';
            break;
          case 'Json':
            zodType = 'z.any()';
            break;
          default:
            zodType = 'z.any()';
        }
      }

      if (isArray) zodType = `z.array(${zodType})`;
      if (isOptional) zodType += '.nullable()';

      fields.push(`  ${name}: ${zodType},`);
    });

    const fileContent = `import { z } from "zod";

export const ${typeName}Schema = z.object({
${fields.join('\n')}
});

export type ${typeName} = z.infer<typeof ${typeName}Schema>;
`;

    const fileName = `${modelName.toLowerCase()}.schema.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), fileContent);
    generatedFiles.push(fileName);
    console.log(`✅ Generated ${fileName}`);
  }

  // 3. Generate Index File
  const indexContent = generatedFiles
    .map((f) => `export * from "./${f.replace('.ts', '')}";`)
    .join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log('✅ Generated index.ts');
}

generate();
