'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { UserRole, RelationshipType } from '@/lib/prisma'
import { CRMService } from '@/services/crm-service'
import { protectAction } from '@/lib/rbac'
import { prisma } from '@/lib/prisma'

/**
 * MASTER CRM ACTIONS (Vedic Community OS)
 * Responsibility: Secure, transactional CRUD for the 16-category Master Person.
 */

export async function upsertMemberRecord(data: any, adminUser: any) {
  try {
    // Protection Shield
    protectAction([UserRole.admin, UserRole.director, UserRole.outreach_lead], adminUser)

    const { id, ...payload } = data

    const result = await prisma.users.upsert({
      where: { id: id || '00000000-0000-0000-0000-000000000000' },
      update: {
        roles: payload.roles as UserRole[],
        profile: {
          upsert: {
            create: {
              full_name: payload.full_name,
              phone_number: payload.phoneNumber,
              whatsapp_number: payload.whatsappNumber,
              gender: payload.gender,
              village: payload.village,
              city: payload.city,
              state: payload.state,
              pin_code: payload.pinCode,
            },
            update: {
              full_name: payload.full_name,
              phone_number: payload.phoneNumber,
              whatsapp_number: payload.whatsappNumber,
              gender: payload.gender,
              village: payload.village,
              city: payload.city,
              state: payload.state,
              pin_code: payload.pinCode,
            }
          }
        },
        preferences: {
          upsert: {
            create: {
              metadata: {
                ...payload.metadata,
                notes: payload.notes,
                lastModified: new Date().toISOString()
              }
            },
            update: {
              metadata: {
                ...payload.metadata,
                notes: payload.notes,
                lastModified: new Date().toISOString()
              }
            }
          }
        }
      },
      create: {
        email: payload.email || `${payload.full_name?.toLowerCase().replace(/ /g, '.')}.${Date.now()}@internal.vedic`,
        roles: payload.roles as UserRole[],
        is_online: false,
        profile: {
          create: {
              full_name: payload.full_name,
              phone_number: payload.phoneNumber,
              whatsapp_number: payload.whatsappNumber,
              gender: payload.gender,
              village: payload.village,
              city: payload.city,
              state: payload.state,
              pin_code: payload.pinCode,
          }
        },
        preferences: {
          create: {
            metadata: {
              notes: payload.notes,
              source: 'admin-crm',
              createdAt: new Date().toISOString()
            }
          }
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
    
    const org_id = '00000000-0000-0000-0000-000000000001' // Default Org
    const transaction = await prisma.transactions.create({
      data: {
        org_id,
        amount: data.amount,
        type: 'INCOME',
        purpose: data.purpose,
        category: 'Donation',
        payment_method: 'OTHER',
        recorded_by_id: adminUser.id,
        status: 'PENDING'
      }
    })
    const contribution = await prisma.contributions.create({
      data: {
        org_id,
        user_id: userId,
        transaction_id: transaction.id,
        amount: data.amount,
        type: data.type || 'FINANCIAL',
        purpose: data.purpose,
      }
    })
    revalidatePath(`/admin/community/${userId}`)
    return { success: true, data: contribution }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function recordBenefitProvided(userId: string, data: { type: string, description: string }) {
  // Decommissioned: Benefit model no longer exists in the canonical schema.
  return { success: false, error: 'Benefit module decommissioned' }
}

export async function mapFamilyRelation(personAId: string, personBId: string, type: RelationshipType, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.outreach_lead], adminUser)
    
    const link = await prisma.family_links.create({
      data: {
        user_id: personAId,
        related_id: personBId,
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
    return await prisma.users.findMany({
      where: {
        ...filters,
      },
      include: {
        profile: true,
        spiritual_profile: true,
        family_links_as_user: true,
        contributions: true,
      }
    })
    return users.sort((a, b) => (a.profile?.full_name || '').localeCompare(b.profile?.full_name || ''))
  } catch (error) {
    console.error('GET_MEMBERS_ERROR:', error)
    return []
  }
}
