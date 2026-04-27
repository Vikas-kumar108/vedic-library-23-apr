import { z } from "zod";

export const LibraryDownloadSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  library_item_id: z.string().uuid(),
  downloaded_at: z.coerce.date(),
});

export type LibraryDownload = z.infer<typeof LibraryDownloadSchema>;
