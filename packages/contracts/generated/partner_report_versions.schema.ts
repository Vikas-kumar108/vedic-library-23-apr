import { z } from "zod";

export const PartnerReportVersionSchema = z.object({
  id: z.string().uuid(),
  report_id: z.string().uuid(),
  file_id: z.string().uuid(),
  version_number: z.number(),
  created_at: z.coerce.date().nullable(),
});

export type PartnerReportVersion = z.infer<typeof PartnerReportVersionSchema>;
