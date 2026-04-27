import { z } from "zod";

export const DocumentVersionSchema = z.object({
  id: z.string().uuid(),
  document_id: z.string().uuid(),
  file_url: z.string(),
  version_number: z.number(),
  change_note: z.string().nullable(),
  created_by_id: z.string().uuid(),
  created_at: z.coerce.date(),
});

export type DocumentVersion = z.infer<typeof DocumentVersionSchema>;
