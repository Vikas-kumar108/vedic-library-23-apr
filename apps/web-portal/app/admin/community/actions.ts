'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { UserRole, RelationshipType } from '@/lib/prisma'
import { CRMService } from '@/services/crm-service'
import { protectAction } from '@/lib/rbac'

/**
 * MASTER CRM ACTIONS (Vedic Community OS)
 * Responsibility: Secure, transactional CRUD for the 16-category Master Person.
 */

export async function upsertMemberRecord(data: any, adminUser: any) {
  try {
    // Protection Shield
    protectAction([UserRole.admin, UserRole.director, UserRole.outreach_lead], adminUser)

    const { id, ...payload } = data

    const result = await prisma.user.upsert({
      where: { id: id || '00000000-0000-0000-0000-000000000000' },
      update: {
        full_name: payload.full_name,
        phoneNumber: payload.phoneNumber,
        whatsappNumber: payload.whatsappNumber,
        gender: payload.gender,
        dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : null,
        village: payload.village,
        city: payload.city,
        state: payload.state,
        pinCode: payload.pinCode,
        addressLine1: payload.addressLine1,
        notes: payload.notes,
        maritalStatus: payload.maritalStatus,
        education: payload.education,
        occupation: payload.occupation,
        roles: payload.roles as UserRole[],
        metadata: {
          ...payload.metadata,
          lastModified: new Date().toISOString()
        }
      },
      create: {
        full_name: payload.full_name,
        email: payload.email || `${payload.full_name?.toLowerCase().replace(/ /g, '.')}.${Date.now()}@internal.vedic`,
        phoneNumber: payload.phoneNumber,
        whatsappNumber: payload.whatsappNumber,
        gender: payload.gender,
        dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : null,
        village: payload.village,
        city: payload.city,
        state: payload.state,
        pinCode: payload.pinCode,
        addressLine1: payload.addressLine1,
        notes: payload.notes,
        roles: payload.roles as UserRole[],
        isOnline: false,
        metadata: {
          source: 'admin-crm',
          createdAt: new Date().toISOString()
        }
      }
    })

    revalidatePath('/admin/community')
    return { success: true, data: result }
  } catch (error: any) {
    console.error('CRM_UPSERT_ERROR:', error)
    return { success: false, error: error.message }
  }
}

export async function addContributionRecord(userId: string, data: any, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director], adminUser)
    
    const contribution = await prisma.contribution.create({
      data: {
        userId,
        amount: data.amount,
        type: data.type,
        purpose: data.purpose,
        date: new Date()
      }
    })
    revalidatePath(`/admin/community/${userId}`)
    return { success: true, data: contribution }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function recordBenefitProvided(userId: string, data: { type: string, description: string }) {
  try {
    const benefit = await prisma.benefit.create({
      data: {
        userId,
        type: data.type,
        description: data.description,
        date: new Date()
      }
    })
    revalidatePath(`/admin/community/${userId}`)
    return { success: true, data: benefit }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function mapFamilyRelation(personAId: string, personBId: string, type: RelationshipType, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.outreach_lead], adminUser)
    
    const link = await prisma.familyLink.create({
      data: {
        userId: personAId,
        relatedId: personBId,
        type: type
      }
    })
    revalidatePath(`/admin/community/${personAId}`)
    return { success: true, data: link }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getMembers(filters: any = {}) {
  try {
    return await prisma.user.findMany({
      where: {
        ...filters,
      },
      orderBy: {
        full_name: 'asc'
      },
      include: {
        familyLinks: true,
        contributions: true,
      }
    })
  } catch (error) {
    console.error('GET_MEMBERS_ERROR:', error)
    return []
  }
}
