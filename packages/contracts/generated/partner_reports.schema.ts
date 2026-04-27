import { z } from "zod";

export const PartnerReportSchema = z.object({
  id: z.string().uuid(),
  partnership_id: z.string().uuid(),
  report_type: z.string(),
  file_id: z.string().uuid(),
  period_start: z.coerce.date().nullable(),
  period_end: z.coerce.date().nullable(),
  submitted_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type PartnerReport = z.infer<typeof PartnerReportSchema>;
