import { z } from "zod";

export const LearningCurveStepSchema = z.object({
  id: z.string().uuid(),
  curve_id: z.string().uuid(),
  step_order: z.number(),
  title: z.string(),
  node_id: z.string().uuid().nullable(),
  unlock_requirement: z.any().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type LearningCurveStep = z.infer<typeof LearningCurveStepSchema>;
