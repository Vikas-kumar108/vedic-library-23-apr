import { z } from "zod";

export const SynonymSchema = z.object({
  id: z.string().uuid(),
  text_id: z.string().uuid(),
  word: z.string(),
  meaning: z.string().nullable(),
  language: z.enum(["sa", "en", "hi", "bn", "ta", "or", "mr", "gu"]).nullable(),
  order_index: z.number().nullable(),
  created_at: z.coerce.date().nullable(),
});

export type Synonym = z.infer<typeof SynonymSchema>;
