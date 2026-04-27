import { z } from "zod";

export const DonationCauseSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  parent_id: z.string().uuid().nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  level: z.number().nullable(),
  is_active: z.boolean().nullable(),
  display_order: z.number().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type DonationCause = z.infer<typeof DonationCauseSchema>;
