import { z } from "zod";

export const LibraryVersionSchema = z.object({
  id: z.string().uuid(),
  library_item_id: z.string().uuid(),
  file_id: z.string().uuid(),
  version_number: z.number(),
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
});

export type LibraryVersion = z.infer<typeof LibraryVersionSchema>;
