import { z } from "zod";

export const UserCurveProgressSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  curve_id: z.string().uuid(),
  current_step_id: z.string().uuid().nullable(),
  is_completed: z.boolean().nullable(),
  started_at: z.coerce.date(),
  completed_at: z.coerce.date().nullable(),
});

export type UserCurveProgress = z.infer<typeof UserCurveProgressSchema>;
