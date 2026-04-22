export const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'hi', label: 'Hindi' },
  { key: 'sa', label: 'Sanskrit' },
  { key: 'te', label: 'Telugu' },
] as const

export type LanguageKey = typeof LANGUAGES[number]['key']