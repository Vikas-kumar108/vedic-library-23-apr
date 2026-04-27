import { z } from "zod";

export const JournalLineSchema = z.object({
  id: z.string().uuid(),
  journal_id: z.string().uuid(),
  account_id: z.string().uuid(),
  debit: z.number().nullable(),
  credit: z.number().nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type JournalLine = z.infer<typeof JournalLineSchema>;
