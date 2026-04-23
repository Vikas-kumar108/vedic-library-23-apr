import { z } from 'zod';
export const VerseParamsSchema = z.object({
    id: z.string().describe('UUID or Slug of the verse'),
});
export const SearchQuerySchema = z.object({
    q: z.string().min(2).describe('Search keyword'),
});
