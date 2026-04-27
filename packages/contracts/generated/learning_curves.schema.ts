import { z } from "zod";

export const LearningCurveSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  is_published: z.boolean().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  target_life_stages: z.array(z.enum(["student", "unmarried", "married", "parent", "vanaprastha", "renunciate"])),
});

export type LearningCurve = z.infer<typeof LearningCurveSchema>;
