import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  total_budget: z.number(),
  status: z.enum(["PROPOSED", "ACTIVE", "COMPLETED", "ON_HOLD", "CANCELLED"]).nullable(),
  cause_id: z.string().uuid().nullable(),
  deleted_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Project = z.infer<typeof ProjectSchema>;
