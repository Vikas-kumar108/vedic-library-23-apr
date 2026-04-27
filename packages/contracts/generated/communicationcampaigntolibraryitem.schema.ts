import { z } from "zod";

export const CommunicationCampaignToLibraryItemSchema = z.object({
  A: z.string(),
  B: z.string(),
});

export type CommunicationCampaignToLibraryItem = z.infer<typeof CommunicationCampaignToLibraryItemSchema>;
