import { z } from "zod";

export const PhysicalAssetSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  purchase_date: z.coerce.date().nullable(),
  purchase_cost: z.number().nullable(),
  current_value: z.number().nullable(),
  status: z.enum(["ACTIVE", "MAINTENANCE", "RETIRED", "LOST", "SOLD"]).nullable(),
  location: z.string().nullable(),
  qr_code: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type PhysicalAsset = z.infer<typeof PhysicalAssetSchema>;
