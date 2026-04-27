import { z } from "zod";

export const SupportTicketSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  subject: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).nullable(),
  priority: z.string().nullable(),
  assigned_to_id: z.string().uuid().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type SupportTicket = z.infer<typeof SupportTicketSchema>;
