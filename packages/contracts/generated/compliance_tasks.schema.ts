import { z } from "zod";

export const ComplianceTaskSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  title: z.string(),
  type: z.string(),
  due_date: z.coerce.date(),
  status: z.enum(["UPCOMING", "IN_PROGRESS", "COMPLETED", "OVERDUE", "DELAYED"]).nullable(),
  assigned_to: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type ComplianceTask = z.infer<typeof ComplianceTaskSchema>;
