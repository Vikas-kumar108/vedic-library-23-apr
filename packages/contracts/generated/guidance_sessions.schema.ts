import { z } from "zod";

export const GuidanceSessionSchema = z.object({
  id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  topic: z.string().nullable(),
  summary_notes: z.string().nullable(),
  session_date: z.coerce.date().nullable(),
});

export type GuidanceSession = z.infer<typeof GuidanceSessionSchema>;
