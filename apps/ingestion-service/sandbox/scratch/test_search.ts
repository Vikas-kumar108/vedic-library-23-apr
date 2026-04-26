import { searchByKeyword } from '@dharma/search-domain'

async function test() {
  console.log('🧪 SEARCH DOMAIN TEST SUITE')

  const query = 'kama'
  console.log(`- Searching for: "${query}"...`)
  
  const results = await searchByKeyword(query)
  
  console.log(`- Results found: ${results.length}`)
  results.forEach((r, i) => {
    console.log(`  [${i+1}] ${r.canonicalRef || r.shastraName}: ${r.content.substring(0, 50)}... (Rank: ${r.rank.toFixed(4)})`)
  })

  if (results.length > 0) {
    console.log('✅ TEST COMPLETE: Search is operational.')
  } else {
    console.log('❌ TEST FAILED: No results found. Ensure DB is populated and FTS triggers are active.')
  }
}

test().catch(console.error)
