import { z } from "zod";

export const TextEmbeddingSchema = z.object({
  text_id: z.string().uuid(),
  model: z.string(),
  created_at: z.coerce.date(),
});

export type TextEmbedding = z.infer<typeof TextEmbeddingSchema>;
