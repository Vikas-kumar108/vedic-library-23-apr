import prisma, { Prisma } from '@dharma/data-access'

export interface IntentMatch {
  intent: string
  keywords: string[]
  boostShastras: string[]
  adhikaraMin: number
}

const INTENT_MAP: IntentMatch[] = [
  {
    intent: 'STRESS',
    keywords: ['shanti', 'peace', 'calm', 'dhira', 'sthitaprajna'],
    boostShastras: ['Bhagavad Gītā', 'Yoga Sūtras'],
    adhikaraMin: 1
  },
  {
    intent: 'DUTY',
    keywords: ['dharma', 'kartavya', 'responsibility', 'svadharma'],
    boostShastras: ['Bhagavad Gītā', 'Manusmṛti'],
    adhikaraMin: 2
  },
  {
    intent: 'GRIEF',
    keywords: ['atman', 'soul', 'eternal', 'mrityu', 'deathless'],
    boostShastras: ['Kaṭha Upaniṣad', 'Bhagavad Gītā'],
    adhikaraMin: 3
  },
  {
    intent: 'PURPOSE',
    keywords: ['purushartha', 'goal', 'artha', 'moksha', 'aim'],
    boostShastras: ['Bhāgavata Purāṇa', 'Brahma Sūtras'],
    adhikaraMin: 4
  }
]

/**
 * searchByIntent: Refines raw keyword search with Vedic context.
 */
export async function searchByIntent(query: string, eligibility: number = 1) {
  // 1. Identify Intent
  const upperQuery = query.toUpperCase()
  const matchingIntent = INTENT_MAP.find(i => 
    upperQuery.includes(i.intent) || 
    i.keywords.some(k => upperQuery.includes(k.toUpperCase()))
  )

  // 2. Prepare boosted keywords
  const augmentedKeywords = matchingIntent 
    ? [...matchingIntent.keywords, query].join(' | ') 
    : query

  // 3. Execute Boosted FTS
  const results = await prisma.$queryRaw<any[]>`
    SELECT 
      t.id,
      t.node_id as "nodeId",
      t.content,
      s.name as "shastraName",
      n.canonical_ref as "canonicalRef",
      n.sensitivity,
      ts_rank(t.fts_vector, to_tsquery('simple', ${augmentedKeywords})) as rank
    FROM texts t
    JOIN nodes n ON t.node_id = n.id
    JOIN shastras s ON n.shastra_id = s.id
    WHERE 
      (t.fts_vector @@ to_tsquery('simple', ${augmentedKeywords}))
      AND n.sensitivity <= ${eligibility}
    ORDER BY 
      CASE WHEN s.name IN (${Prisma.join(matchingIntent?.boostShastras || [])}) THEN rank * 2 ELSE rank END DESC
    LIMIT 10;
  `

  return results
}
