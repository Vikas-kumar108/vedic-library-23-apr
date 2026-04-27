import { z } from "zod";

export const PartnershipSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  partner_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  status: z.enum(["PROPOSED", "ACTIVE", "COMPLETED", "EXPIRED"]).nullable(),
  agreement_file_id: z.string().uuid().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type Partnership = z.infer<typeof PartnershipSchema>;
