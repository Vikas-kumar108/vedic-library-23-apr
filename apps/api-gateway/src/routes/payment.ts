import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PaymentService } from '../services/payment.service'

const paymentService = new PaymentService()

export async function paymentRoutes(fastify: FastifyInstance) {
  
  // Create Order Route
  fastify.post('/orders', async (request, reply) => {
    const schema = z.object({
      amount: z.number().min(1),
      sevaId: z.string(),
      email: z.string().email()
    })

    const body = schema.parse(request.body)
    
    try {
      const order = await paymentService.createOrder(body.amount, body.sevaId, body.email)
      return { success: true, order }
    } catch (error) {
      return reply.status(500).send({ success: false, error: 'Order manifestation failed' })
    }
  })

  // Verify Payment Route
  fastify.post('/verify', async (request, reply) => {
    const schema = z.object({
      razorpay_order_id: z.string(),
      razorpay_payment_id: z.string(),
      razorpay_signature: z.string()
    })

    const body = schema.parse(request.body)
    
    const isValid = paymentService.verifySignature(
      body.razorpay_order_id,
      body.razorpay_payment_id,
      body.razorpay_signature
    )

    if (isValid) {
      // TODO: Log to database, send email receipt via Resend
      console.log('🏛️ PAYMENT VERIFIED:', body.razorpay_payment_id)
      return { success: true, message: 'Dāna received with gratitude.' }
    } else {
      return reply.status(400).send({ success: false, error: 'Invalid signature' })
    }
  })
}
