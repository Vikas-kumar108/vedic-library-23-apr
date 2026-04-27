import { z } from "zod";

export const FileAssetSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  uploaded_by_id: z.string().uuid().nullable(),
  file_name: z.string(),
  file_type: z.string().nullable(),
  mime_type: z.string().nullable(),
  storage_provider: z.enum(["S3", "R2", "GCS", "LOCAL"]),
  object_key: z.string(),
  file_url: z.string(),
  access_url: z.string().nullable(),
  file_size: z.number().nullable(),
  checksum: z.string().nullable(),
  category: z.enum(["RECEIPT", "INVOICE", "MEDIA", "DOCUMENT", "AVATAR", "SHASTRA_SCAN", "AGREEMENT", "COMPLIANCE_REPORT", "UC_CERTIFICATE", "GALLERY_ITEM", "TAX_CHALLAN"]),
  security_level: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type FileAsset = z.infer<typeof FileAssetSchema>;
