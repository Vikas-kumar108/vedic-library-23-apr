import { z } from "zod";

export const UtilizationCertificateSchema = z.object({
  id: z.string().uuid(),
  grant_id: z.string().uuid(),
  total_received: z.number(),
  total_utilized: z.number(),
  unspent_amount: z.number(),
  certified_by: z.string().nullable(),
  certification_date: z.coerce.date().nullable(),
  file_id: z.string().uuid().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type UtilizationCertificate = z.infer<typeof UtilizationCertificateSchema>;
