import { z } from "zod";

export const CommunicationLogSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  partner_id: z.string().uuid().nullable(),
  org_id: z.string().uuid().nullable(),
  campaign_id: z.string().uuid().nullable(),
  library_item_id: z.string().uuid().nullable(),
  channel: z.enum(["EMAIL", "SMS", "WHATSAPP", "PUSH", "IN_APP"]),
  recipient: z.string(),
  subject: z.string().nullable(),
  message: z.string().nullable(),
  status: z.enum(["DRAFT", "QUEUED", "SENT", "DELIVERED", "FAILED", "OPENED", "CLICKED"]).nullable(),
  external_id: z.string().uuid().nullable(),
  provider: z.string().nullable(),
  created_at: z.coerce.date(),
});

export type CommunicationLog = z.infer<typeof CommunicationLogSchema>;
