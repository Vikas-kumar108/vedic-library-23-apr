import { z } from "zod";

export const ExternalIntegrationSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid().nullable(),
  service: z.enum(["S3", "R2", "TWILIO", "SENDGRID", "RAZORPAY", "STRIPE", "GITA_API", "TRANSLATION_ENGINE"]),
  config: z.any().nullable(),
});

export type ExternalIntegration = z.infer<typeof ExternalIntegrationSchema>;
