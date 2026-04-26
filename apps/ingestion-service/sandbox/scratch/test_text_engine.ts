import { formatReference, parseCoordinatesFromSlug, normalizeScriptKey } from '@dharma/text-engine'

console.log('🧪 TEXT ENGINE TEST SUITE')

// Test 1: Reference Formatting
const gitaRef = formatReference('bg', 1, 1)
console.log(`- Gita Ref: ${gitaRef} (Expected: BG 1.1)`)

const ksRef = formatReference('ks', '1.1', '1')
console.log(`- Kama Sutra Ref: ${ksRef} (Expected: KS 1.1.1)`)

// Test 2: Slug Parsing
const slugData = parseCoordinatesFromSlug('v-1.1.1')
console.log(`- Slug Parsing: ${JSON.stringify(slugData)} (Expected: {"type":"verse","value":"1.1.1"})`)

// Test 3: Script Normalization
const script = normalizeScriptKey('sa')
console.log(`- Script Norm: ${script} (Expected: devanagari)`)

console.log('✅ TEST COMPLETE')
