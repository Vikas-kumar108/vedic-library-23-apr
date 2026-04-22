export type ScriptKey = 'devanagari' | 'iast' | 'telugu' | 'latin' | 'bengali' | 'tamil' | 'oriya'

export const SUPPORTED_SCRIPTS: { key: ScriptKey; label: string }[] = [
  { key: 'devanagari', label: 'Devanagari' },
  { key: 'iast', label: 'Roman' },
  { key: 'latin', label: 'IAST (Latin)' },
  { key: 'bengali', label: 'Bengali' },
  { key: 'tamil', label: 'Tamil' },
  { key: 'oriya', label: 'Oriya' },
]

/**
 * Normalizes script keys to ensure consistency between DB and UI.
 */
export function normalizeScriptKey(key: string): ScriptKey {
  const k = key.toLowerCase()
  if (k === 'sa' || k === 'sanskrit') return 'devanagari'
  if (k === 'en' || k === 'english') return 'iast'
  return k as ScriptKey
}

// Simple Mapping for IAST to Devanagari (Basic set)
const IAST_TO_DEV: Record<string, string> = {
  'ā': 'ा', 'i': 'ि', 'ī': 'ी', 'u': 'ु', 'ū': 'ू', 'ṛ': 'ृ', 'ṝ': 'ॄ', 'ḷ': 'ॢ', 'ḹ': 'ॣ',
  'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ',
  'a': '', // inherent vowel
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ',
  'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
  'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
  'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
  'ś': 'श', 'ṣ': 'ष', 's': 'स', 'h': 'ह',
  'ṃ': 'ं', 'ḥ': 'ः',
}

const DEV_VOWELS: Record<string, string> = {
  'a': 'अ', 'ā': 'आ', 'i': 'इ', 'ī': 'ई', 'u': 'उ', 'ū': 'ऊ', 'ṛ': 'ऋ', 'ṝ': 'ॠ', 'ḷ': 'ऌ', 'ḹ': 'ॡ',
  'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ'
}

const DEV_TO_IAST_MARKS: Record<string, string> = {
  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', '्': '',
}

const DEV_TO_IAST_VOWELS: Record<string, string> = {
  'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ई', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'
}

const DEV_TO_IAST_CONSONANTS: Record<string, string> = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
  'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
  'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
  'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
  'ं': 'ṃ', 'ः': 'ḥ',
}

const DEV_NUMERALS: Record<string, string> = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
}

/**
 * Transliterates text between scripts.
 * Note: This is a simplified mathematical model for Sanskrit logic.
 */
export function transliterate(text: string, from: ScriptKey, to: ScriptKey): string {
  if (!text || from === to) return text

  if (from === 'iast' && to === 'devanagari') {
    return iastToDevanagari(text)
  }

  if (from === 'devanagari' && to === 'iast') {
    return devanagariToIast(text)
  }

  // Fallback for now
  return text
}

function iastToDevanagari(text: string): string {
  let result = ''
  let i = 0
  
  const isVowel = (char: string) => 'aāiīuūṛṝḷḹeaiou'.includes(char)
  const isModifier = (char: string) => 'ṃḥ'.includes(char)
  
  while (i < text.length) {
    let match = ''
    
    // Check for 2-char combinations (ph, bh, ai, au, etc)
    if (i + 1 < text.length) {
      const two = text.substring(i, i + 2).toLowerCase()
      if (IAST_TO_DEV[two]) match = two
    }
    
    // Check for 1-char
    if (!match) {
      const one = text[i].toLowerCase()
      if (IAST_TO_DEV[one] !== undefined || DEV_VOWELS[one]) match = one
    }
    
    if (match) {
      const dev = IAST_TO_DEV[match]
      const isStart = i === 0 || ' \n\t.,;:?!()[]{}'.includes(text[i-1])
      
      if (isVowel(match)) {
        if (isStart) {
          result += DEV_VOWELS[match] || match
        } else {
          result += dev
        }
      } else if (isModifier(match)) {
        result += dev
      } else {
        result += dev
        // If not followed by a vowel and not a mark, add virama
        if (i + match.length < text.length) {
          const next = text[i + match.length].toLowerCase()
          if (!isVowel(next) && !isModifier(next) && !' \n\t.,;:?!()[]{}'.includes(next)) {
             result += '्'
          }
        } else {
          // End of string, if it was a consonant, it needs a virama unless it has inherent 'a'
          result += '्'
        }
      }
      i += match.length
    } else {
      result += text[i]
      i++
    }
  }

  return result
}

function devanagariToIast(text: string): string {
  let result = ''
  let i = 0
  
  while (i < text.length) {
    const char = text[i]
    
    if (DEV_TO_IAST_VOWELS[char]) {
      result += DEV_TO_IAST_VOWELS[char]
    } else if (DEV_TO_IAST_CONSONANTS[char]) {
      result += DEV_TO_IAST_CONSONANTS[char]
      
      // Check next char for mark or virama
      if (i + 1 < text.length) {
        const next = text[i + 1]
        if (DEV_TO_IAST_MARKS[next] !== undefined) {
          result += DEV_TO_IAST_MARKS[next]
          i++
        } else if (DEV_TO_IAST_CONSONANTS[next] || DEV_TO_IAST_VOWELS[next] || ' \n\t.,;:?!()[]{}॥'.includes(next) || DEV_NUMERALS[next]) {
          // If followed by another consonant or vowel or space/punctuation/numeral, add inherent 'a'
          if (!'ंः'.includes(char)) {
             result += 'a'
          }
        }
      } else {
        // End of string, add inherent 'a' unless it's a modifier
        if (!'ंः'.includes(char)) {
          result += 'a'
        }
      }
    } else if (DEV_NUMERALS[char]) {
      result += DEV_NUMERALS[char]
    } else if (char === '॥') {
      result += '||'
    } else if (char === '।') {
      result += '|'
    } else {
      result += char
    }
    i++
  }
  
  return result
}
