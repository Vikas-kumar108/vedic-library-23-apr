import { z } from "zod";

export const NodeTagSchema = z.object({
  node_id: z.string().uuid(),
  tag_id: z.string().uuid(),
});

export type NodeTag = z.infer<typeof NodeTagSchema>;
