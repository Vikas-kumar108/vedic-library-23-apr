import { z } from "zod";

export const SecureShareLinkDocumentSchema = z.object({
  link_id: z.string().uuid(),
  document_id: z.string().uuid(),
  access_level: z.enum(["READ", "WRITE", "DELETE", "SHARE"]).nullable(),
});

export type SecureShareLinkDocument = z.infer<typeof SecureShareLinkDocumentSchema>;
