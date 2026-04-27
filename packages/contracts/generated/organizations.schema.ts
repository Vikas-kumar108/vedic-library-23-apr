import { z } from "zod";

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  parent_id: z.string().uuid().nullable(),
  name: z.string(),
  type: z.string(),
  registration_no: z.string().nullable(),
  pan: z.string().nullable(),
  tan: z.string().nullable(),
  address: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
