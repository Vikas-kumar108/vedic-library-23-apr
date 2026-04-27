import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  grant_id: z.string().uuid().nullable(),
  cause_id: z.string().uuid().nullable(),
  project_id: z.string().uuid().nullable(),
  amount: z.number(),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER", "ADJUSTMENT", "PAYROLL"]),
  date: z.coerce.date().nullable(),
  source_account_id: z.string().uuid().nullable(),
  destination_account_id: z.string().uuid().nullable(),
  category: z.string(),
  purpose: z.string(),
  paymentmethod: z.enum(["UPI", "CASH", "BANK_TRANSFER", "CHEQUE"]),
  provider: z.string().nullable(),
  external_payment_id: z.string().uuid().nullable(),
  is_corpus: z.boolean().nullable(),
  gst_applicable: z.boolean().nullable(),
  tds_applicable: z.boolean().nullable(),
  recorded_by_id: z.string().uuid(),
  approved_by_id: z.string().uuid().nullable(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "FAILED"]).nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
