import { z } from "zod";

export const SpiritualVowSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(["PENDING", "ACTIVE", "COMPLETED", "BROKEN", "REVOKED"]).nullable(),
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type SpiritualVow = z.infer<typeof SpiritualVowSchema>;
