import prismaInstance from '@dharma/data-access'

async function checkAuditTrail() {
  const prisma = (prismaInstance as any).default || prismaInstance
  try {
    const logs = await prisma.auditLog.findMany({
      where: { module: 'AUTH' },
      take: 10,
      orderBy: { timestamp: 'desc' },
      select: {
        action: true,
        timestamp: true,
        performedById: true
      }
    })

    console.log('--- 📜 Institutional Audit Trail ---')
    logs.forEach((log: any) => {
      console.log(`[${log.timestamp.toLocaleString()}] Action: ${log.action} - Seeker ID: ${log.performedById}`)
    })
    console.log('------------------------------------')
  } catch (error) {
    console.error('Error querying audit logs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAuditTrail()
