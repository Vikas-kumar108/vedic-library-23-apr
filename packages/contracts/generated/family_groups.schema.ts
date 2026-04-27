import { z } from "zod";

export const FamilyGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  origin_place: z.string().nullable(),
  description: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type FamilyGroup = z.infer<typeof FamilyGroupSchema>;
