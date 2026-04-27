import { z } from "zod";

export const ProjectBudgetLineSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  category: z.string(),
  budget_amount: z.number(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type ProjectBudgetLine = z.infer<typeof ProjectBudgetLineSchema>;
