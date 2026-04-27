import { z } from "zod";

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  table_name: z.string().nullable(),
  record_id: z.string().uuid().nullable(),
  transaction_id: z.string().uuid().nullable(),
  module: z.string().nullable(),
  action: z.string(),
  performed_by_id: z.string().uuid(),
  old_data: z.any().nullable(),
  new_data: z.any().nullable(),
  ip_address: z.string().nullable(),
  device_info: z.string().nullable(),
  timestamp: z.coerce.date(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;
