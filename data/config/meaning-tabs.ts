export const MEANING_TABS = [
  { key: 'segmentation', label: 'Word Segmentation' },
  { key: 'word-meaning', label: 'Word-to-word Meaning' },
  { key: 'prose-order', label: 'Prose Order' },
  { key: 'prose-meaning', label: 'Prose Meaning' },
] as const

export type MeaningTabKey = typeof MEANING_TABS[number]['key']