import { z } from "zod";

export const UserStatisticSchema = z.object({
  user_id: z.string().uuid(),
  nodes_read_count: z.number().nullable(),
  courses_completed: z.number().nullable(),
  contribution_points: z.number().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type UserStatistic = z.infer<typeof UserStatisticSchema>;
