import { z } from 'zod'

export const OrgParamsSchema = z.object({
  orgId: z.string().uuid().describe('Organization UUID'),
})

export const GrantResponseSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  purpose: z.string(),
  status: z.string(),
  partnership: z.object({
    title: z.string(),
    partner: z.object({
      name: z.string()
    })
  })
})

export const LedgerQuerySchema = z.object({
  limit: z.number().optional().default(50),
  offset: z.number().optional().default(0),
})

export const CreateAssetSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  serialNumber: z.string().optional(),
  assetTag: z.string().optional(),
  value: z.number().positive(),
  currency: z.string().default('INR'),
  location: z.string().optional(),
  orgId: z.string().uuid(),
  custodianId: z.string().uuid().optional(),
})
