import { z } from "zod";

export const ContributionSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  user_id: z.string().uuid(),
  transaction_id: z.string().uuid().nullable(),
  amount: z.number().nullable(),
  type: z.enum(["FINANCIAL", "IN_KIND", "SERVICE"]),
  purpose: z.string().nullable(),
  cause_id: z.string().uuid().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Contribution = z.infer<typeof ContributionSchema>;
