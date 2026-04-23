'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { CRMService } from '@/services/crm-service'
import { protectAction } from '@/lib/rbac'
import { UserRole } from '@prisma/client'

/**
 * SECURE COMMUNICATION ACTIONS
 * Responsibility: Execute outreach campaigns with strict RBAC protection.
 */

export async function createCommunicationCampaign(data: any, adminUser: any) {
  try {
    // 1. Protection Check
    protectAction([UserRole.admin, UserRole.director, UserRole.outreach_lead], adminUser)

    // 2. Execute Secure Creation
    const campaign = await prisma.communicationCampaign.create({
      data: {
        title: data.title,
        content: data.content,
        type: data.type,
        status: 'scheduled',
        targetTierId: data.targetTierId,
        language: data.language,
        scheduledAt: new Date(data.scheduledAt)
      }
    })

    revalidatePath('/admin/communication')
    return { success: true, data: campaign }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getIntelligentAnalytics(adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director], adminUser)
    const analytics = await CRMService.getCampaignAnalytics()
    return { success: true, data: analytics }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createSubscriptionTier(data: any, adminUser: any) {
  try {
    protectAction([UserRole.admin], adminUser)
    const tier = await prisma.subscriptionTier.create({
      data: {
        name: data.name,
        description: data.description,
        level: data.level
      }
    })
    revalidatePath('/admin/communication')
    return { success: true, data: tier }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
