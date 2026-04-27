import { z } from "zod";

export const TagSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.array(z.string()),
  type: z.string().nullable(),
  parent_id: z.string().uuid().nullable(),
  sanskrit_name: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Tag = z.infer<typeof TagSchema>;
