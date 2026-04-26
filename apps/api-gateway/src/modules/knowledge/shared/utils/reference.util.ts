import { formatReference } from '@dharma/text-engine'

export const resolveReference = (node: any): string => {
  const canonical = node.canonicalRef || node.canonical_ref
  if (canonical) return canonical

  const shastraSlug = node.shastras?.slug || node.shastra?.slug

  if (shastraSlug) {
    return formatReference(
      shastraSlug,
      0,
      node.orderIndex || node.order_index || 0
    )
  }

  return node.slug || 'Unknown'
}