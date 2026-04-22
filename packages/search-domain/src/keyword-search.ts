import prisma, { Prisma } from '@dharma/data-access'

export interface SearchResult {
  id: string
  nodeId: string
  content: string
  contentType: string
  language: string
  rank: number
  shastraName?: string
  canonicalRef?: string
}

/**
 * Performs a professional full-text search across all scripture texts.
 */
export async function searchByKeyword(query: string): Promise<SearchResult[]> {
  // Use PostgreSQL websearch_to_tsquery for advanced boolean-style search
  const results = await prisma.$queryRaw<SearchResult[]>`
    SELECT 
      t.id,
      t.node_id as "nodeId",
      t.content,
      t.content_type as "contentType",
      t.language,
      ts_rank(t.fts_vector, websearch_to_tsquery('english', ${query})) as rank,
      s.name as "shastraName",
      n.canonical_ref as "canonicalRef"
    FROM texts t
    JOIN nodes n ON t.node_id = n.id
    JOIN shastras s ON n.shastra_id = s.id
    WHERE t.fts_vector @@ websearch_to_tsquery('english', ${query})
    ORDER BY rank DESC
    LIMIT 20;
  `

  return results
}
