export type ScriptKey = 'devanagari' | 'iast' | 'telugu'

export const SCRIPTS: {
  key: ScriptKey
  label: string
}[] = [
  { key: 'devanagari', label: 'Devanagari' },
  { key: 'iast', label: 'Roman' },
  { key: 'telugu', label: 'Telugu' },
]