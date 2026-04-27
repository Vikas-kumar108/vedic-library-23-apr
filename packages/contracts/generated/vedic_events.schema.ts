import { z } from "zod";

export const VedicEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  host_id: z.string().uuid(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  type: z.enum(["LIVE_SATSANG", "WORKSHOP", "GROUP_MEDITATION"]).nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type VedicEvent = z.infer<typeof VedicEventSchema>;
