import { z } from "zod";

export const FinancialAccountSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  balance: z.number(),
  currency: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date(),
});

export type FinancialAccount = z.infer<typeof FinancialAccountSchema>;
