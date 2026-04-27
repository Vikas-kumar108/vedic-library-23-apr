import { z } from "zod";

export const SecureShareLinkSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  token: z.string(),
  purpose: z.string().nullable(),
  expires_at: z.coerce.date(),
  access_count: z.number().nullable(),
  created_at: z.coerce.date(),
});

export type SecureShareLink = z.infer<typeof SecureShareLinkSchema>;
