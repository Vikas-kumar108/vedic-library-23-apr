import { z } from "zod";

export const GrantSchema = z.object({
  id: z.string().uuid(),
  partnership_id: z.string().uuid(),
  amount: z.number(),
  currency: z.string().nullable(),
  purpose: z.string().nullable(),
  disbursement_type: z.string().nullable(),
  status: z.enum(["PROPOSED", "ACTIVE", "COMPLETED", "EXPIRED"]).nullable(),
  is_restricted: z.boolean().nullable(),
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type Grant = z.infer<typeof GrantSchema>;
