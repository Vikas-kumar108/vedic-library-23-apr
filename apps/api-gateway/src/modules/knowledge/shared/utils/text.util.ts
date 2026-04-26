/**
 * Safely extracts the primary content from a list of text objects.
 * Standardizes the 'texts[0]?.content' pattern found across services.
 */
export const getPrimaryText = (texts: any[] | undefined | null): string => {
  if (!texts || texts.length === 0) return ''

  const primary = texts.find((t) => t.is_primary)
  if (primary?.content) return primary.content

  return texts[0]?.content || ''
}