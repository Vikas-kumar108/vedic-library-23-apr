import { z } from "zod";

export const LedgerSnapshotSchema = z.object({
  id: z.string().uuid(),
  account_id: z.string().uuid().nullable(),
  period_id: z.string().uuid().nullable(),
  opening_balance: z.number().nullable(),
  closing_balance: z.number().nullable(),
  created_at: z.coerce.date().nullable(),
});

export type LedgerSnapshot = z.infer<typeof LedgerSnapshotSchema>;
