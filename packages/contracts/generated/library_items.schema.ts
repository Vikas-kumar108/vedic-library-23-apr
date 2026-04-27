import { z } from "zod";

export const LibraryItemSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  type: z.enum(["BOOK", "BOOKLET", "ARTICLE", "NEWSLETTER"]),
  language: z.enum(["sa", "en", "hi", "bn", "ta", "or", "mr", "gu"]).nullable(),
  author: z.string().nullable(),
  published_at: z.coerce.date().nullable(),
  file_id: z.string().uuid(),
  thumbnail_url: z.string().nullable(),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
  required_tier: z.string().nullable(),
  is_public: z.boolean().nullable(),
  is_downloadable: z.boolean().nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_by_id: z.string().uuid().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  required_role: z.array(z.enum(["student", "mentor", "teacher", "coordinator", "admin", "donor", "director", "village_member", "city_member", "outreach_lead", "volunteer", "staff"])),
});

export type LibraryItem = z.infer<typeof LibraryItemSchema>;
