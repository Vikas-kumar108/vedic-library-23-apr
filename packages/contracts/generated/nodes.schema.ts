import { z } from "zod";

export const NodeSchema = z.object({
  id: z.string().uuid(),
  shastra_id: z.string().uuid(),
  parent_id: z.string().uuid().nullable(),
  level: z.string(),
  slug: z.string().nullable(),
  order_index: z.number().nullable(),
  canonical_ref: z.string().nullable(),
  sensitivity: z.number().nullable(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED", "DELETED"]),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Node = z.infer<typeof NodeSchema>;
