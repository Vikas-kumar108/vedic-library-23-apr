import { z } from "zod";

export const DonationReceiptSchema = z.object({
  id: z.string().uuid(),
  transaction_id: z.string().uuid(),
  user_id: z.string().uuid(),
  receipt_number: z.string(),
  amount: z.number(),
  pan_number: z.string().nullable(),
  donor_name: z.string().nullable(),
  is_80g_applicable: z.boolean().nullable(),
  file_id: z.string().uuid().nullable(),
  status: z.string().nullable(),
  issued_by_id: z.string().uuid().nullable(),
  library_item_id: z.string().uuid().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date(),
});

export type DonationReceipt = z.infer<typeof DonationReceiptSchema>;
