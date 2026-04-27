import { z } from "zod";

export const NodeRelationSchema = z.object({
  id: z.string().uuid(),
  from_node_id: z.string().uuid(),
  to_node_id: z.string().uuid(),
  relation_type: z.string().nullable(),
  created_at: z.coerce.date(),
});

export type NodeRelation = z.infer<typeof NodeRelationSchema>;
