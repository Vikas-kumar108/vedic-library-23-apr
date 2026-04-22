export interface ParsedRef {
  shastra: string
  adhikarana?: number
  adhyaya?: number
  verse?: number
  prakarana?: number
}

export const SHASTRA_CANONICAL_NAMES: Record<string, string> = {
  bg: 'Bhagavad Gītā',
  ks: 'Kāmasūtra',
}

export const SHASTRA_SHORT_CODES: Record<string, string> = {
  bg: 'BG',
  ks: 'KS',
}

/**
 * Formats a raw database reference or coordinates into a canonical string.
 */
export function formatReference(shastra: string, chapter: number | string, verse: number | string, section?: number | string): string {
  const code = SHASTRA_SHORT_CODES[shastra.toLowerCase()] || shastra.toUpperCase()
  
  if (shastra.toLowerCase() === 'ks') {
    if (section) return `${code} ${section}.${chapter}.${verse}`
    return `${code} ${chapter}.${verse}`
  }
  
  if (shastra.toLowerCase() === 'bg') {
    return `${code} ${chapter}.${verse}`
  }

  return `${code} ${chapter}.${verse}`
}

/**
 * Generates a consistent slug for a node.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Extracts coordinates from a slug or path.
 */
export function parseCoordinatesFromSlug(slug: string): { type: string, value: string | number } {
  if (slug.startsWith('adhik-')) return { type: 'adhikarana', value: parseInt(slug.replace('adhik-', '')) }
  if (slug.startsWith('ch-')) return { type: 'chapter', value: parseInt(slug.replace('ch-', '')) }
  if (slug.startsWith('v-')) return { type: 'verse', value: slug.replace('v-', '') }
  return { type: 'unknown', value: slug }
}
