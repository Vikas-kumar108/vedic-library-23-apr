import fp from 'fastify-plugin'
import prismaInstance from '@dharma/data-access'

export default fp(async (fastify) => {
  // Handle ESM interop if needed
  const actualPrisma = (prismaInstance as any).default || prismaInstance
  console.log('REGISTERING PRISMA PLUGIN, PRISMA CLIENT:', !!actualPrisma)
  fastify.decorate('prisma', actualPrisma)
  
  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect()
  })
})

declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof prisma
  }
}
