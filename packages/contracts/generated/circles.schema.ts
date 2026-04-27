import { z } from "zod";

export const CircleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  type: z.enum(["REGIONAL", "STUDY_GROUP", "MENTOR_CIRCLE"]).nullable(),
  member_count: z.number().nullable(),
  mentor_id: z.string().uuid().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Circle = z.infer<typeof CircleSchema>;
