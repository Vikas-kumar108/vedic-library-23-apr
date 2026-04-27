import { z } from "zod";

export const LegalDocumentSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  title: z.string(),
  category: z.string(),
  file_url: z.string(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED", "EXPIRED", "REVOKED"]).nullable(),
  created_by_id: z.string().uuid().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type LegalDocument = z.infer<typeof LegalDocumentSchema>;
