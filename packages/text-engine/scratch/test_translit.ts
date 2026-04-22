import { transliterate } from '../src/transliteration'

const iastToDevCases = [
  { iast: 'dharmakṣetre kurukṣetre', expected: 'धर्मक्षेत्रे कुरुक्षेत्रे' },
  { iast: 'samavetā yuyutsavaḥ', expected: 'समवेता युयुत्सवः' },
]

const devToIastCases = [
  { dev: 'धर्मक्षेत्रे कुरुक्षेत्रे', expected: 'dharmakṣetre kurukṣetre' },
  { dev: 'समवेता युयुत्सवः', expected: 'samavetā yuyutsavaḥ' },
  { dev: 'धर्मार्थकामेभ्यो नमः ॥ १.१.१ ॥', expected: 'dharmārthakāmebhyo namaḥ || 1.1.1 ||' },
]

console.log('🧪 Testing Transliteration: IAST -> Devanagari')
iastToDevCases.forEach((tc, idx) => {
  const result = transliterate(tc.iast, 'iast', 'devanagari')
  console.log(`${idx + 1}: ${result === tc.expected ? '✅' : '❌'} ${tc.iast} -> ${result}`)
})

console.log('\n🧪 Testing Transliteration: Devanagari -> IAST')
devToIastCases.forEach((tc, idx) => {
  const result = transliterate(tc.dev, 'devanagari', 'iast')
  console.log(`${idx + 1}: ${result === tc.expected ? '✅' : '❌'} ${tc.dev} -> ${result}`)
})
