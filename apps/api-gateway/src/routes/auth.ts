import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthService } from '../services/auth.service'
import { z } from 'zod'
import { RegisterInput, LoginInput, ForgotPasswordInput } from '@dharma/contracts'
import { IntegrationRegistry } from '../integrations/registry'

export default async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const emailService = IntegrationRegistry.getEmailService()
  const authService = new AuthService(fastify.prisma, emailService)


  fastify.post('/register', async (request, reply) => {
    const data = RegisterInput.parse(request.body)
    console.log('🛰️ GATEWAY: RECEIVED REGISTER REQUEST', { email: data.email })
    try {
      const user = await authService.register(data)
      return reply.code(201).send(user)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  // ... (verify-email, forgot-password, reset-password)
  fastify.post('/verify-email', async (request, reply) => {
    const { token } = z.object({ token: z.string() }).parse(request.body)
    try {
      const result = await authService.verifyEmail(token)
      return reply.send(result)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  fastify.post('/forgot-password', async (request, reply) => {
    const { email } = ForgotPasswordInput.parse(request.body)
    try {
      const result = await authService.forgotPassword(email)
      return reply.send(result)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  fastify.post('/reset-password', async (request, reply) => {
    const { token, password } = z.object({ 
      token: z.string(), 
      password: z.string().min(6) 
    }).parse(request.body)
    try {
      const result = await authService.resetPassword(token, password)
      return reply.send(result)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  fastify.post('/login', async (request, reply) => {
    const data = LoginInput.parse(request.body)
    console.log('🛰️ GATEWAY: LOGIN ATTEMPT', { email: data.email })
    try {
      const user = await authService.login(data)
      return reply.code(200).send(user)
    } catch (error: any) {
      console.error('❌ GATEWAY LOGIN FAILURE:', error.message)
      return reply.code(401).send({ error: error.message })
    }
  })

  fastify.get('/me', async (request, reply) => {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Missing or invalid authorization header' })
    }

    const token = authHeader.split(' ')[1]
    try {
      const user = await authService.validateToken(token)
      return reply.send(user)
    } catch (error: any) {
      return reply.code(401).send({ error: error.message })
    }
  })

  fastify.post('/resend-verification', async (request, reply) => {
    const { email } = request.body as { email: string }
    try {
      await authService.resendVerificationEmail(email)
      return reply.send({ message: 'Verification email resent' })
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  fastify.post('/refresh', async (request, reply) => {
    const { token } = request.body as { token: string }
    try {
      const result = await authService.refreshToken(token)
      return reply.send(result)
    } catch (error: any) {
      return reply.code(401).send({ error: error.message })
    }
  })

  fastify.post('/logout', async (request, reply) => {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Missing or invalid authorization header' })
    }

    const token = authHeader.split(' ')[1]
    try {
      const decoded = await authService.validateToken(token)
      await authService.logout(decoded.id)
      return reply.send({ message: 'Logged out successfully' })
    } catch (error: any) {
      return reply.code(401).send({ error: error.message })
    }
  })
}
