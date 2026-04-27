import { z } from "zod";

export const SourceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  role: z.string().nullable(),
  description: z.string().nullable(),
  year_approx: z.number().nullable(),
  era: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Source = z.infer<typeof SourceSchema>;
