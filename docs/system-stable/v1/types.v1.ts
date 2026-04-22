// docs/system-stable/v1/types.v1.ts

export type TreeNode = {
  id: string
  name: string
  type: 'root' | 'corpus' | 'chapter' | 'verse'
  children?: TreeNode[]
  meta?: {
    corpus: string
    chapter?: number
    verse?: number
  }
}

export type Commentary = {
  author: string
  sampradaya: string
  content: Record<string, string>
  subCommentaries?: {
    title: string
    content: Record<string, string>
  }[]
}

export type Verse = {
  id: string
  reference: {
    chapter: number
    verse: number
  }
  text: {
    sanskrit: string
    transliteration: string
  }
  meanings: any[]
  translations: Record<string, string>
  commentaries: Commentary[]
  relations?: Record<string, any>
}