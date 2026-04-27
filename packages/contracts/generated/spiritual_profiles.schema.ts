import { z } from "zod";

export const SpiritualProfileSchema = z.object({
  user_id: z.string().uuid(),
  age_group: z.enum(["child", "teen", "young_adult", "adult", "senior"]).nullable(),
  life_stage: z.enum(["student", "unmarried", "married", "parent", "vanaprastha", "renunciate"]).nullable(),
  eligibility_level: z.number(),
  primary_focus: z.enum(["dharma", "artha", "kama", "moksha"]).nullable(),
  inner_state: z.enum(["confused", "seeking", "stable", "disturbed", "detached"]).nullable(),
  nature: z.enum(["intellectual", "administrative", "creative", "practical"]).nullable(),
  current_focus: z.string().nullable(),
  current_primary_node_id: z.string().uuid().nullable(),
  last_guided_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type SpiritualProfile = z.infer<typeof SpiritualProfileSchema>;
