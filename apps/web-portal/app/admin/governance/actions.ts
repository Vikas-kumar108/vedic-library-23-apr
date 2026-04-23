'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { protectAction } from '@/lib/rbac'
import { UserRole } from '@/lib/prisma'
import crypto from 'crypto'

/**
 * INSTITUTIONAL GOVERNANCE ACTIONS
 * Responsibility: Secure management of Organizations, Documents, and Compliances.
 */

export async function upsertOrganization(data: any, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director], adminUser)

    const result = await prisma.organization.upsert({
      where: { id: data.id || '00000000-0000-0000-0000-000000000000' },
      update: {
        name: data.name,
        type: data.type,
        registrationNo: data.registrationNo,
        pan: data.pan,
        tan: data.tan,
        address: data.address
      },
      create: {
        name: data.name,
        type: data.type,
        registrationNo: data.registrationNo,
        pan: data.pan,
        tan: data.tan,
        address: data.address
      }
    })

    revalidatePath('/admin/governance')
    return { success: true, data: result }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function uploadLegalDocument(orgId: string, data: any, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director], adminUser)

    const doc = await prisma.legalDocument.create({
      data: {
        orgId,
        title: data.title,
        category: data.category,
        fileUrl: data.fileUrl,
        issuingAuthority: data.issuingAuthority,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        sensitivity: data.sensitivity || 'RESTRICTED'
      }
    })

    revalidatePath('/admin/governance')
    return { success: true, data: doc }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createSecureShareLink(orgId: string, documentIds: string[], purpose: string, expiresInDays: number, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director], adminUser)

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)

    const shareLink = await prisma.secureShareLink.create({
      data: {
        orgId,
        token,
        purpose,
        expiresAt,
        documentIds
      }
    })

    return { success: true, token, url: `/share/${token}` }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function recordComplianceStatus(id: string, status: string, notes: string, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director], adminUser)

    const record = await prisma.complianceRecord.update({
      where: { id },
      data: { 
        status,
        notes,
        updatedAt: new Date()
      }
    })

    revalidatePath('/admin/governance')
    return { success: true, data: record }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getOrganizations() {
  try {
    return await prisma.organization.findMany({
      include: {
        _count: {
          select: {
            members: true,
            legalDocuments: true,
            compliances: true
          }
        }
      }
    })
  } catch (error) {
    console.error('GET_ORGANIZATIONS_ERROR:', error)
    return []
  }
}

export async function getComplianceRecords(filters: any = {}) {
  try {
    return await prisma.complianceRecord.findMany({
      where: filters,
      orderBy: { dueDate: 'asc' },
      include: {
        responsible: true,
        supervisor: true
      }
    })
  } catch (error) {
    console.error('GET_COMPLIANCE_RECORDS_ERROR:', error)
    return []
  }
}

export async function getLegalDocuments(filters: any = {}) {
  try {
    return await prisma.legalDocument.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('GET_LEGAL_DOCUMENTS_ERROR:', error)
    return []
  }
}
