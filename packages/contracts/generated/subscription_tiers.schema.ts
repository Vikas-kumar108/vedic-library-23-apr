import { z } from "zod";

export const SubscriptionTierSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  level: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;
