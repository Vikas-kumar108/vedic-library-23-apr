import { z } from 'zod'

export const VerseParamsSchema = z.object({
  id: z.string().min(1).describe('UUID or Slug of the verse'),
})

export const SearchQuerySchema = z.object({
  q: z.string().min(2).trim().describe('Search keyword'),
})