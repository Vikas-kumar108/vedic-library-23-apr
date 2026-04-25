import { formatReference } from '@dharma/text-engine'

/**
 * Resolves the display title or canonical reference for a scripture node.
 * Supports both Prisma naming conventions (camelCase/snake_case) found in the codebase.
 */
export const resolveReference = (node: any): string => {
  // 1. Direct canonical reference check (Prisma camelCase or legacy snake_case)
  const canonical = node.canonicalRef || node.canonical_ref
  if (canonical) return canonical

  // 2. Dynamic generation fallback (requires shastra slug)
  if (node.shastra?.slug) {
    return formatReference(node.shastra.slug, 0, node.orderIndex || 0)
  }

  // 3. Raw slug fallback
  return node.slug || 'Unknown'
}
