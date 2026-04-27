import { z } from "zod";

export const ActivityLogSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  date: z.coerce.date().nullable(),
  images: z.array(z.string()),
  project_id: z.string().uuid().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date(),
});

export type ActivityLog = z.infer<typeof ActivityLogSchema>;
