import { z } from "zod";

export const PartnerOrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["CSR", "NGO", "GOVERNMENT", "CORPORATE", "VENDOR"]),
  registration_number: z.string().nullable(),
  pan: z.string().nullable(),
  tan: z.string().nullable(),
  contact_person: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  website: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type PartnerOrganization = z.infer<typeof PartnerOrganizationSchema>;
