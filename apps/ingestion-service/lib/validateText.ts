const VALID_TYPES = [
    'mula', 'transliteration', 'anuvada', 'bhasantara', 'bhavanuvada',
    'bhashya', 'tika', 'vyakhyana', 'vivarana',
    'shabdartha', 'anvaya', 'padaccheda', 'vigraha',
    'tatparya', 'arthavistara',
    'sutra_summary', 'key_points',
    'shirshaka', 'upashirshaka', 'pushpika'
]

export function validateText(t: any) {
    if (!VALID_TYPES.includes(t.content_type)) return false
    if (!t.language) return false
    if (!t.content || t.content.trim().length === 0) return false
    return true
}