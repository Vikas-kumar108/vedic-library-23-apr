import { z } from "zod";

export const GrantAllocationSchema = z.object({
  id: z.string().uuid(),
  grant_id: z.string().uuid(),
  project_id: z.string().uuid().nullable(),
  cause_id: z.string().uuid().nullable(),
  allocated_amount: z.number(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type GrantAllocation = z.infer<typeof GrantAllocationSchema>;
