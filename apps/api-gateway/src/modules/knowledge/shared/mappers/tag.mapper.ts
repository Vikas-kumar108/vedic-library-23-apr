/**
 * Standard mapper to convert scripture tag objects into a consistent DTO.
 */
export const toTagList = (tags: any[]) => {
  return tags.map((t: any) => {
    // Handle both direct tag objects and nested tag objects (from node_tags relations)
    const tag = t.tag || t
    
    return {
      id: tag.id,
      slug: tag.slug,
      name: tag.name,
      // Pass through any other fields to maintain existing structure if needed
      ...tag
    }
  })
}
