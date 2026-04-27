import { z } from "zod";

export const DonationCauseOptionSchema = z.object({
  id: z.string().uuid(),
  cause_id: z.string().uuid(),
  name: z.string(),
  suggested_amount: z.number().nullable(),
  created_at: z.coerce.date().nullable(),
});

export type DonationCauseOption = z.infer<typeof DonationCauseOptionSchema>;
