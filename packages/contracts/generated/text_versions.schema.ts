import { z } from "zod";

export const TextVersionSchema = z.object({
  id: z.string().uuid(),
  text_id: z.string().uuid(),
  content: z.string().nullable(),
  content_type: z.enum(["sutra", "shloka", "mantra", "vachana", "anuvada", "vyakhyana", "bhashya", "tatparya", "tika", "shirshaka", "upashirshaka", "pushpika", "title", "translation", "transliteration", "bhasantara", "bhavanuvada", "padaccheda", "vigraha", "arthavistara", "tippani_extended", "sutra_summary", "key_points", "mula"]).nullable(),
  language: z.enum(["sa", "en", "hi", "bn", "ta", "or", "mr", "gu"]).nullable(),
  script: z.enum(["devanagari", "latin", "bengali", "tamil", "oriya"]).nullable(),
  version_number: z.number().nullable(),
  updated_by: z.string().nullable(),
  created_at: z.coerce.date(),
});

export type TextVersion = z.infer<typeof TextVersionSchema>;
