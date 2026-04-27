import { z } from "zod";

export const TextMetadataSchema = z.object({
  text_id: z.string().uuid(),
  guidance_levels: z.array(z.enum(["beginner", "intermediate", "advanced", "teacher"])),
  is_sensitive: z.boolean().nullable(),
  life_stages: z.array(z.enum(["student", "unmarried", "married", "parent", "vanaprastha", "renunciate"])),
});

export type TextMetadata = z.infer<typeof TextMetadataSchema>;
