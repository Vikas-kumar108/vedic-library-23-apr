import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  is_online: z.boolean().nullable(),
  email_verified: z.coerce.date().nullable(),
  roles: z.array(z.enum(["student", "mentor", "teacher", "coordinator", "admin", "donor", "director", "village_member", "city_member", "outreach_lead", "volunteer", "staff"])),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED", "ANONYMIZED"]),
  deleted_at: z.coerce.date().nullable(),
  is_anonymized: z.boolean().nullable(),
  anonymized_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  last_active: z.coerce.date().nullable(),
});

export type User = z.infer<typeof UserSchema>;
