import { z } from "zod";

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  transaction_id: z.string().uuid().nullable(),
  entry_date: z.coerce.date(),
  description: z.string().nullable(),
  created_by_id: z.string().uuid().nullable(),
  approved_by_id: z.string().uuid().nullable(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "FAILED"]).nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;
