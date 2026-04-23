import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthService } from '../services/auth.service'
import { z } from 'zod'

export default async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const authService = new AuthService(fastify.prisma)

  const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  fastify.post('/register', async (request, reply) => {
    const data = signupSchema.parse(request.body)
    try {
      const user = await authService.register(data)
      return reply.code(201).send(user)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

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
    const { email } = z.object({ email: z.string().email() }).parse(request.body)
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
    const data = loginSchema.parse(request.body)
    try {
      const user = await authService.login(data)
      return reply.code(200).send(user)
    } catch (error: any) {
      return reply.code(401).send({ error: error.message })
    }
  })
}
