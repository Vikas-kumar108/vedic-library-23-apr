import prismaInstance from '@dharma/data-access'

async function checkUsers() {
  const prisma = (prismaInstance as any).default || prismaInstance
  try {
    const userCount = await prisma.user.count()
    const latestUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        createdAt: true,
        emailVerified: true,
        profile: {
          select: {
            full_name: true
          }
        }
      }
    })

    console.log('--- Database Verification Report ---')
    console.log(`Total Seekers in Vault: ${userCount}`)
    console.log('\nLatest Registrations:')
    latestUsers.forEach((u: any, i: number) => {
      console.log(`${i + 1}. ${u.profile?.full_name || 'No Name'} (${u.email}) - Joined: ${u.createdAt.toLocaleString()} - Verified: ${u.emailVerified ? '✅' : '❌'}`)
    })
    console.log('-----------------------------------')
  } catch (error) {
    console.error('Error querying database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
