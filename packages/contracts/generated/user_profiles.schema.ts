import { z } from "zod";

export const UserProfileSchema = z.object({
  user_id: z.string().uuid(),
  full_name: z.string().nullable(),
  phone_number: z.string().nullable(),
  whatsapp_number: z.string().nullable(),
  avatar_url: z.string().nullable(),
  gender: z.enum(["male", "female"]).nullable(),
  date_of_birth: z.coerce.date().nullable(),
  village: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  pin_code: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
