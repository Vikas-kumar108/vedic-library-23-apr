import Razorpay from 'razorpay'
import crypto from 'crypto'

export class PaymentService {
  private razorpay: Razorpay | null = null

  private getClient() {
    if (this.razorpay) return this.razorpay

    const key_id = process.env.RAZORPAY_KEY_ID
    const key_secret = process.env.RAZORPAY_KEY_SECRET

    if (!key_id || !key_secret) {
      console.warn('⚠️ Razorpay Treasury Keys are not manifest in .env')
      return null
    }

    this.razorpay = new Razorpay({
      key_id,
      key_secret,
    })
    return this.razorpay
  }

  /**
   * Create a new Donation Order
   */
  async createOrder(amount: number, sevaId: string, email: string) {
    const client = this.getClient()
    if (!client) {
      throw new Error('Payment gateway not configured. Please use manual transfer.')
    }

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        sevaId,
        email,
        institution: 'VedicSkills'
      }
    }

    try {
      const order = await client.orders.create(options)
      return order
    } catch (error) {
      console.error('🏛️ Payment Engine Error (Order Creation):', error)
      throw new Error('Could not manifest donation order.')
    }
  }

  /**
   * Verify Payment Signature
   */
  verifySignature(orderId: string, paymentId: string, signature: string) {
    const key_secret = process.env.RAZORPAY_KEY_SECRET || ''
    const text = orderId + '|' + paymentId
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(text)
      .digest('hex')

    return generated_signature === signature
  }
}
