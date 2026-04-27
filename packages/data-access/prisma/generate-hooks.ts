import fs from 'fs';
import path from 'path';

/**
 * 🛠️ Prisma to React Hooks Generator
 * Automatically creates type-safe hooks for frontend CRUD operations.
 */

const SCHEMA_PATH = path.resolve('packages/data-access/prisma/schema.prisma');
const OUTPUT_DIR = path.resolve('apps/web-portal/hooks/generated');

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
  console.log('🔄 Parsing Prisma schema for Hook generation...');
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;
  let modelMatch;
  const generatedHooks: { name: string; path: string }[] = [];

  while ((modelMatch = modelRegex.exec(schema)) !== null) {
    const modelName = modelMatch[1];
    const typeName = singularize(modelName);
    
    const hookContent = `'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { ${typeName} } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for ${modelName}
 */
export function use${toPascalCase(modelName)}() {
  const [data, setData] = useState<${typeName}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<${typeName}[]>('/api/auto/${modelName.toLowerCase()}');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function use${typeName}(id?: string) {
  const [data, setData] = useState<${typeName} | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<${typeName}>( \`/api/auto/${modelName.toLowerCase()}/\${id}\` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function use${typeName}Actions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<${typeName}>) => {
    setIsProcessing(true);
    const result = await apiFetch<${typeName}>('/api/auto/${modelName.toLowerCase()}', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<${typeName}>) => {
    setIsProcessing(true);
    const result = await apiFetch<${typeName}>( \`/api/auto/${modelName.toLowerCase()}/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( \`/api/auto/${modelName.toLowerCase()}/\${id}\`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
`;

    const fileName = `use${toPascalCase(modelName)}.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), hookContent);
    generatedHooks.push({ name: toPascalCase(modelName), path: fileName.replace('.ts', '') });
    console.log(`✅ Generated Hooks for ${modelName}`);
  }

  // Generate Index File
  const indexContent = `/**
 * 📦 Hook Manifest
 * Automatically exports all generated institutional hooks.
 */
${generatedHooks.map(h => `export * from './${h.path}';`).join('\n')}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log('✅ Generated hooks loader (index.ts)');
}

generate();
