import { z } from "zod";

export const FinancialPeriodSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  year_label: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_closed: z.boolean().nullable(),
  closed_at: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type FinancialPeriod = z.infer<typeof FinancialPeriodSchema>;
