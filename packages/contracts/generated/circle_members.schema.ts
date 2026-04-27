import { z } from "zod";

export const CircleMemberSchema = z.object({
  user_id: z.string().uuid(),
  circle_id: z.string().uuid(),
  role: z.enum(["MEMBER", "MODERATOR", "MENTOR"]).nullable(),
  joined_at: z.coerce.date().nullable(),
});

export type CircleMember = z.infer<typeof CircleMemberSchema>;
