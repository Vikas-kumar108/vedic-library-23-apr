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
