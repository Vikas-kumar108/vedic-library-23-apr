import { z } from "zod";

export const GuidanceAssignmentSchema = z.object({
  id: z.string().uuid(),
  guide_id: z.string().uuid(),
  student_id: z.string().uuid(),
  assignment_type: z.enum(["mentor", "teacher", "coordinator"]),
  subject: z.string().nullable(),
  status: z.enum(["ACTIVE", "COMPLETED", "ON_HOLD", "TERMINATED"]).nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});

export type GuidanceAssignment = z.infer<typeof GuidanceAssignmentSchema>;
