import { z } from "zod";

export const EventRegistrationSchema = z.object({
  user_id: z.string().uuid(),
  event_id: z.string().uuid(),
  registered_at: z.coerce.date().nullable(),
});

export type EventRegistration = z.infer<typeof EventRegistrationSchema>;
