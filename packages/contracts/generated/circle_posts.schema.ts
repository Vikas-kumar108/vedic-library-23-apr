import { z } from "zod";

export const CirclePostSchema = z.object({
  id: z.string().uuid(),
  circle_id: z.string().uuid(),
  author_id: z.string().uuid(),
  content: z.string(),
  category: z.enum(["REALIZATION", "QUESTION", "ANNOUNCEMENT"]).nullable(),
  likes: z.number().nullable(),
  replies: z.number().nullable(),
  is_pinned: z.boolean().nullable(),
  created_at: z.coerce.date(),
});

export type CirclePost = z.infer<typeof CirclePostSchema>;
