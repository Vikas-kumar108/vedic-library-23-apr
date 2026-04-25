/**
 * Safely extracts the primary content from a list of text objects.
 * Standardizes the 'texts[0]?.content' pattern found across services.
 */
export const getPrimaryText = (texts: any[] | undefined | null): string => {
  if (!texts || texts.length === 0) return ''
  return texts[0]?.content || ''
}
