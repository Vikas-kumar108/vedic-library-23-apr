import fs from 'fs'

/**
 * Shastra Ingestor Engine
 * Responsibility: Parse raw scripture data and transform it into the Vedic Tree structure.
 */
export class ShastraIngestor {
  /**
   * Parse Ramayana RTF Pattern
   * Format: [VERSE_ID] [DEVANAGARI_TEXT]
   * Example Verse ID: 3001001a (Book 3, Chapter 1, Verse 1, Line a)
   */
  async ingestRamayana(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Logic: 
    // 1. Identify Verse Blocks (e.g., matching pattern /([0-9]{8}[a-z])/)
    // 2. Extract Devanagari text between blocks
    // 3. Map to Node (Book -> Chapter -> Verse)
    
    console.log(`Parsing Ramayana from ${filePath}...`)
    
    const verses = []
    const pattern = /([0-9]{8}[a-z])/g
    let match
    
    while ((match = pattern.exec(content)) !== null) {
      const verseId = match[1]
      const startIndex = match.index + verseId.length
      const nextMatch = pattern.exec(content)
      const endIndex = nextMatch ? nextMatch.index : content.length
      
      const rawText = content.substring(startIndex, endIndex).trim()
      // Clean up RTF tags if present
      const cleanText = rawText.replace(/\\u[0-9]+/g, (m) => {
        // Convert RTF Unicode to character
        return String.fromCharCode(parseInt(m.replace('\\u', '')))
      }).replace(/\\f[0-9]|\\fs[0-9]|\\cf[0-9]|\{|\}|\\/g, '').trim()

      if (cleanText) {
        verses.push({
          book: parseInt(verseId.substring(0, 1)),
          chapter: parseInt(verseId.substring(1, 4)),
          verse: parseInt(verseId.substring(4, 7)),
          line: verseId.substring(7, 8),
          text: cleanText
        })
      }
      
      // Move back the regex pointer to not miss the next match
      if (nextMatch) pattern.lastIndex = nextMatch.index
    }

    console.log(`Successfully extracted ${verses.length} verses from Ramayana.`)
    return verses
  }
}
