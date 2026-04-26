/**
 * Standard mapper to convert scripture tag objects into a consistent DTO.
 */
export const toTagList = (tags: any[]) => {
  return tags.map((t: any) => {
    const tag = t.tags || t

    return {
      id: tag.id,
      slug: tag.slug,
      name: tag.name,
      ...tag
    }
  })
}