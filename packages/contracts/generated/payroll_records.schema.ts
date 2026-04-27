import { z } from "zod";

export const PayrollRecordSchema = z.object({
  id: z.string().uuid(),
  org_member_id: z.string().uuid(),
  transaction_id: z.string().uuid().nullable(),
  period_id: z.string().uuid(),
  amount: z.number(),
  type: z.string().nullable(),
  status: z.string().nullable(),
  paid_at: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type PayrollRecord = z.infer<typeof PayrollRecordSchema>;
