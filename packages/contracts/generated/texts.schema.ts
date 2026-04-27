import { z } from "zod";

export const TextSchema = z.object({
  id: z.string().uuid(),
  node_id: z.string().uuid(),
  content_type: z.enum(["sutra", "shloka", "mantra", "vachana", "anuvada", "vyakhyana", "bhashya", "tatparya", "tika", "shirshaka", "upashirshaka", "pushpika", "title", "translation", "transliteration", "bhasantara", "bhavanuvada", "padaccheda", "vigraha", "arthavistara", "tippani_extended", "sutra_summary", "key_points", "mula"]),
  language: z.enum(["sa", "en", "hi", "bn", "ta", "or", "mr", "gu"]),
  script: z.enum(["devanagari", "latin", "bengali", "tamil", "oriya"]),
  content: z.string(),
  source_id: z.string().uuid().nullable(),
  is_primary: z.boolean().nullable(),
  anchor_word: z.string().nullable(),
  segment_order: z.number().nullable(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED", "DELETED"]),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Text = z.infer<typeof TextSchema>;
