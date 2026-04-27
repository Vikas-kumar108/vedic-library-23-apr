import { z } from "zod";

export const ShastraSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  structure_type: z.string(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED", "DELETED"]),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Shastra = z.infer<typeof ShastraSchema>;
