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
