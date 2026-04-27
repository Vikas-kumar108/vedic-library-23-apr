import { z } from "zod";

export const FamilyNodeSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  parent_id: z.string().uuid().nullable(),
  family_group_id: z.string().uuid().nullable(),
  level: z.number().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type FamilyNode = z.infer<typeof FamilyNodeSchema>;
