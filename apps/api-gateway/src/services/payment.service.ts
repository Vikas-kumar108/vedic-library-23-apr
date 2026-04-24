import Razorpay from 'razorpay'
import crypto from 'crypto'

export class PaymentService {
  private razorpay: Razorpay

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    })
  }

  /**
   * Create a new Donation Order
   */
  async createOrder(amount: number, sevaId: string, email: string) {
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
      const order = await this.razorpay.orders.create(options)
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
    const text = orderId + '|' + paymentId
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex')

    if (generated_signature === signature) {
      return true
    }
    return false
  }
}
