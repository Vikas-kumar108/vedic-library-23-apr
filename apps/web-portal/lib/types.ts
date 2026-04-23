// ---------- CORE KEYS ----------

export type LanguageKey = 'en' | 'hi' | 'sa' | 'te'
export type ScriptKey = string

// ---------- VERSE ----------

export type Verse = {
  id: string
  unitType?: string

  reference: {
    text: string        // gita, ramayana, etc.
    chapter: number
    verse: number
  }

  // TEXT IN MULTIPLE SCRIPTS
  text: Record<string, string>

  // MEANING LAYER
  meanings: {
    synonyms: Record<string, Synonym[]>        // Map of lang -> synonyms
    translations: Record<string, string>      // Map of lang -> text
    segmentation?: Record<string, string>     // Map of lang -> text
    anvaya?: Record<string, string>           // Map of lang -> text
    anvayaTranslation?: Record<string, string> // Map of lang -> text
  }

  // PER-AUTHOR TRANSLATIONS (from gita-data/translation.json)
  translationsByAuthor?: {
    author: string
    lang: string
    text: string
  }[]

  // RAW WORD MEANINGS STRING (from verse.json word_meanings)
  wordMeanings?: string

  // COMMENTARY LAYER
  commentary: Commentary[]

  // META INFORMATION
  meta?: {
    meter?: string
    theme?: string
  }

  // RELATIONAL GRAPH
  relations?: Relations
}

// ---------- MEANING ----------

export type Synonym = {
  word: string
  meaning: string
}

// ---------- COMMENTARY ----------

export type Commentary = {
  sampradaya: SampradayaKey
  author: string

  content: Partial<Record<LanguageKey, string>>

  subCommentaries?: SubCommentary[]
}

export type SubCommentary = {
  title: string
  content: Partial<Record<LanguageKey, string>>
}

export type SampradayaKey =
  | 'gaudiya'
  | 'madhva'
  | 'sri_vaishnava'
  | 'advaita'
  | 'general'

// ---------- RELATIONS ----------

export type Relations = {
  related_verses: string[]
  courses: Course[]
  guidance: GuidanceTopic[]
  seva_domains: SevaDomain[]
}

// ---------- APPLICATION TYPES ----------

export type Course = {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  ageGroups: AgeGroup[]
  verseCount: number
}

export type GuidanceTopic = {
  id: string
  title: string
  category: string
  description: string
}

export type SevaDomain = {
  id: string
  sanskrit: string
  english: string
  description: string
}

export type LifeStage =
  | 'student'
  | 'unmarried'
  | 'married'
  | 'parent'
  | 'vanaprastha'
  | 'renunciate'


  export type TreeNode = {
  id: string
  name: string
  sanskrit?: string
  verseCount?: number
  type: NodeType

  children?: TreeNode[]

  meta?: {
    description?: string
    corpus?: string

    authority?: string
    tradition?: string
    format?: string

    structure?: {
      hierarchy: string[]
      type?: string
    }

    themes?: string[]
    usage?: string[]

    relationships?: {
      partOf?: string[]
      references?: string[]
      commentaries?: string[]
    }

    // 🔥 resolver keys
    chapter?: number
    verse?: number
    skandha?: number
    adhyaya?: number
    pada?: number
    sutra?: number
  }
}

export type NodeType = 'category' | 'text' | 'section' | 'chapter' | 'verse' | 'school' | 'tradition'
export type Category = string
export type Language = 'en' | 'hi' | 'sa' | 'te'