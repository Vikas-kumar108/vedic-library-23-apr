import { z } from "zod";

export const WebhookEventSchema = z.object({
  id: z.string().uuid(),
  provider: z.string(),
  event_type: z.string(),
  external_id: z.string().uuid(),
  payload: z.any(),
  status: z.enum(["PENDING", "PROCESSED", "FAILED"]).nullable(),
  processed_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
});

export type WebhookEvent = z.infer<typeof WebhookEventSchema>;
