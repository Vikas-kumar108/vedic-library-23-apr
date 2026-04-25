import { resolveReference } from '../utils/reference.util'
import { getPrimaryText } from '../utils/text.util'

/**
 * Standard mapper to convert a Prisma node into a Lightweight Verse DTO.
 * Used primarily for search results, recommendations, and previews.
 */
export const toLightVerse = (node: any) => {
  return {
    id: node.id,
    title: resolveReference(node),
    text: getPrimaryText(node.texts)
  }
}
