import { z } from "zod";

export const OrgMemberSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: z.string(),
  base_stipend: z.number().nullable(),
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type OrgMember = z.infer<typeof OrgMemberSchema>;
