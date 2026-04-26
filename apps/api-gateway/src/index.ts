import 'dotenv/config'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import prismaPlugin from './plugins/prisma'
import libraryRoutes from './routes/library.routes'
import authRoutes from './routes/auth'
import discoveryRoutes from './routes/discovery.routes'
import institutionalRoutes from './routes/institutional.routes'
import academyRoutes from './routes/academy.routes'
import projectRoutes from './routes/project.routes'
import systemRoutes from './routes/system.routes'
import complianceRoutes from './routes/compliance.routes'
import membershipRoutes from './routes/membership.routes'
import broadcastRoutes from './routes/broadcast'
import { paymentRoutes } from './routes/payment'

const fastify = Fastify({
  logger: true
}).withTypeProvider<ZodTypeProvider>()

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

await fastify.register(cors)

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
})

await fastify.register(prismaPlugin)

await fastify.register(libraryRoutes, { prefix: '/library' })
await fastify.register(authRoutes, { prefix: '/auth' })
await fastify.register(discoveryRoutes, { prefix: '/discovery' })
await fastify.register(institutionalRoutes, { prefix: '/institutional' })
await fastify.register(academyRoutes, { prefix: '/institutional/academy' })
await fastify.register(projectRoutes, { prefix: '/institutional/projects' })
await fastify.register(systemRoutes, { prefix: '/institutional/system' })
await fastify.register(complianceRoutes, { prefix: '/institutional/compliance' })
await fastify.register(membershipRoutes, { prefix: '/institutional/membership' })
await fastify.register(broadcastRoutes, { prefix: '/institutional/broadcast' })
await fastify.register(paymentRoutes, { prefix: '/institutional/dana' })

fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 4444
    await fastify.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()