import { z } from "zod";

export const CommunicationCampaignSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  target_partner_id: z.string().uuid().nullable(),
  target_org_id: z.string().uuid().nullable(),
  title: z.string(),
  content: z.string(),
  type: z.string(),
  status: z.enum(["DRAFT", "SCHEDULED", "SENT", "FAILED", "CANCELLED"]).nullable(),
  target_tier_id: z.string().uuid().nullable(),
  language: z.enum(["sa", "en", "hi", "bn", "ta", "or", "mr", "gu"]).nullable(),
  scheduled_at: z.coerce.date().nullable(),
  sent_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type CommunicationCampaign = z.infer<typeof CommunicationCampaignSchema>;
