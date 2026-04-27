import { z } from "zod";

export const UserPreferenceSchema = z.object({
  user_id: z.string().uuid(),
  notification_prefs: z.any().nullable(),
});

export type UserPreference = z.infer<typeof UserPreferenceSchema>;
