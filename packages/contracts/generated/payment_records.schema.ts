import { z } from "zod";

export const PaymentRecordSchema = z.object({
  id: z.string().uuid(),
  transaction_id: z.string().uuid().nullable(),
  provider: z.string(),
  external_id: z.string().uuid(),
  amount: z.number(),
  currency: z.string().nullable(),
  status: z.string(),
  raw_data: z.any().nullable(),
  created_at: z.coerce.date(),
});

export type PaymentRecord = z.infer<typeof PaymentRecordSchema>;
