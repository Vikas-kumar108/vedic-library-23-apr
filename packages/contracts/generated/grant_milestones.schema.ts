import { z } from "zod";

export const GrantMilestoneSchema = z.object({
  id: z.string().uuid(),
  grant_id: z.string().uuid(),
  title: z.string(),
  due_date: z.coerce.date().nullable(),
  amount: z.number(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "VERIFIED"]).nullable(),
  completion_report_id: z.string().uuid().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type GrantMilestone = z.infer<typeof GrantMilestoneSchema>;
