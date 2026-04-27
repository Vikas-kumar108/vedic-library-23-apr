import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = path.join(__dirname, 'modules');
const outputPath = path.join(__dirname, 'schema.prisma');

const order = [
  'generator.prisma',
  'enums.prisma',
  'identity.prisma',
  'knowledge.prisma',
  'finance.prisma',
  'community.prisma',
  'communication.prisma',
  'interaction.prisma',
  'system.prisma'
];

async function mergeSchema() {
  console.log('--- VEDIC INSTITUTIONAL OS: MODULAR SCHEMA MERGE ---');
  
  let finalSchema = '';

  for (const fileName of order) {
    const filePath = path.join(modulesDir, fileName);
    if (fs.existsSync(filePath)) {
      console.log(`Merging ${fileName}...`);
      const content = fs.readFileSync(filePath, 'utf-8');
      finalSchema += `// --- MODULE: ${fileName.toUpperCase()} ---\n\n`;
      finalSchema += content;
      finalSchema += '\n\n';
    } else {
      console.warn(`Warning: Module ${fileName} not found.`);
    }
  }

  fs.writeFileSync(outputPath, finalSchema);
  console.log('--------------------------------------------------');
  console.log(`✅ Modular schema merged successfully into ${outputPath}`);
  console.log('--------------------------------------------------');
}

mergeSchema();
