'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { protectAction } from '@/lib/rbac'
import { UserRole, TransactionType } from '@/lib/prisma'

/**
 * FINANCIAL DHARMA ACTIONS
 * Responsibility: Secure, auditable, and atomic management of institutional wealth.
 */

export async function createTransaction(data: any, adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.accountant, UserRole.director], adminUser)

    // 1. Create Transaction with Audit Ready Data
    const transaction = await prisma.$transaction(async (tx) => {
      const res = await tx.transaction.create({
        data: {
          amount: data.amount,
          type: data.type,
          date: new Date(data.date),
          sourceAccountId: data.sourceAccountId,
          destinationAccountId: data.destinationAccountId,
          category: data.category,
          purpose: data.purpose,
          programId: data.programId,
          paymentMethod: data.paymentMethod,
          proofUrl: data.proofUrl,
          recordedById: adminUser.id,
          status: 'PENDING'
        }
      })

      // 2. Create Audit Log entry
      await tx.auditLog.create({
        data: {
          transactionId: res.id,
          action: 'CREATE',
          performedById: adminUser.id,
          newData: res as any
        }
      })

      return res
    })

    revalidatePath('/admin/finance')
    return { success: true, data: transaction }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function approveTransaction(id: string, adminUser: any) {
  try {
    // ONLY Director or Admin can approve
    protectAction([UserRole.admin, UserRole.director], adminUser)

    const result = await prisma.$transaction(async (tx) => {
      const original = await tx.transaction.findUnique({ where: { id } })
      
      const updated = await tx.transaction.update({
        where: { id },
        data: { 
          status: 'APPROVED',
          approvedById: adminUser.id
        }
      })

      // Update Account Balances
      if (updated.type === 'EXPENSE' && updated.sourceAccountId) {
        await tx.financialAccount.update({
          where: { id: updated.sourceAccountId },
          data: { balance: { decrement: updated.amount } }
        })
      } else if (updated.type === 'INCOME' && updated.destinationAccountId) {
        await tx.financialAccount.update({
          where: { id: updated.destinationAccountId },
          data: { balance: { increment: updated.amount } }
        })
      }

      // Log Approval
      await tx.auditLog.create({
        data: {
          transactionId: id,
          action: 'APPROVE',
          performedById: adminUser.id,
          oldData: original as any,
          newData: updated as any
        }
      })

      return updated
    })

    revalidatePath('/admin/finance')
    return { success: true, data: result }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getFinancialReports(adminUser: any) {
  try {
    protectAction([UserRole.admin, UserRole.director, UserRole.accountant], adminUser)
    
    const [income, expenses, balances] = await Promise.all([
      prisma.transaction.groupBy({
        by: ['category'],
        where: { type: 'INCOME', status: 'APPROVED' },
        _sum: { amount: true }
      }),
      prisma.transaction.groupBy({
        by: ['category'],
        where: { type: 'EXPENSE', status: 'APPROVED' },
        _sum: { amount: true }
      }),
      prisma.financialAccount.findMany()
    ])

    return { success: true, data: { income, expenses, balances } }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getTransactions(filters: any = {}) {
  try {
    return await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: 'desc' },
      include: {
        recordedBy: true,
        sourceAccount: true,
        destinationAccount: true,
        program: true
      }
    })
  } catch (error) {
    console.error('GET_TRANSACTIONS_ERROR:', error)
    return []
  }
}

export async function getFinancialAccounts(orgId?: string) {
  try {
    return await prisma.financialAccount.findMany({
      where: orgId ? { orgId } : {},
      orderBy: { name: 'asc' }
    })
  } catch (error) {
    console.error('GET_ACCOUNTS_ERROR:', error)
    return []
  }
}
