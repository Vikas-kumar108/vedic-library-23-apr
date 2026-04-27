import { z } from "zod";

export const FamilyLinkSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  related_id: z.string().uuid(),
  type: z.enum(["pitara", "matara", "sapinda", "vaivahika", "shishya", "guru", "prapautra", "pautra", "sahodara"]),
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type FamilyLink = z.infer<typeof FamilyLinkSchema>;
