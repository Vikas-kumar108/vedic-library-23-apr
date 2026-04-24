import Razorpay from 'razorpay';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Initialize Razorpay instance
let razorpayInstance: Razorpay | null = null;

function getRazorpayInstance(): Razorpay | null {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.log('[Razorpay] Not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
    return null;
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayInstance;
}

export function isRazorpayConfigured(): boolean {
  return !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);
}

export function getRazorpayKeyId(): string | undefined {
  return RAZORPAY_KEY_ID;
}

export interface CreateOrderOptions {
  amount: number; // Amount in paise (INR * 100)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

// Create a Razorpay order
export async function createOrder(options: CreateOrderOptions): Promise<RazorpayOrder | null> {
  const razorpay = getRazorpayInstance();
  
  if (!razorpay) {
    console.log('[Razorpay] Would create order with amount:', options.amount);
    // Return mock order for development
    return {
      id: `order_mock_${Date.now()}`,
      entity: 'order',
      amount: options.amount,
      amount_paid: 0,
      amount_due: options.amount,
      currency: options.currency || 'INR',
      receipt: options.receipt || '',
      status: 'created',
      created_at: Date.now(),
    };
  }

  try {
    const order = await razorpay.orders.create({
      amount: options.amount,
      currency: options.currency || 'INR',
      receipt: options.receipt,
      notes: options.notes,
    });

    return order as RazorpayOrder;
  } catch (error) {
    console.error('[Razorpay] Create order error:', error);
    throw error;
  }
}

// Verify Razorpay payment signature
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!RAZORPAY_KEY_SECRET) {
    console.log('[Razorpay] Signature verification skipped (no secret configured)');
    return true; // Allow in development
  }

  try {
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === signature;
  } catch (error) {
    console.error('[Razorpay] Signature verification error:', error);
    return false;
  }
}

// Fetch payment details
export async function fetchPayment(paymentId: string) {
  const razorpay = getRazorpayInstance();
  
  if (!razorpay) {
    return null;
  }

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('[Razorpay] Fetch payment error:', error);
    return null;
  }
}

// Create subscription for recurring payments
export async function createSubscription(options: {
  planId: string;
  totalCount: number;
  customerId?: string;
  notes?: Record<string, string>;
}) {
  const razorpay = getRazorpayInstance();
  
  if (!razorpay) {
    console.log('[Razorpay] Would create subscription with plan:', options.planId);
    return {
      id: `sub_mock_${Date.now()}`,
      plan_id: options.planId,
      status: 'created',
    };
  }

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: options.planId,
      total_count: options.totalCount,
      customer_notify: 1,
      notes: options.notes,
    });

    return subscription;
  } catch (error) {
    console.error('[Razorpay] Create subscription error:', error);
    throw error;
  }
}

// Create a plan for recurring payments
export async function createPlan(options: {
  name: string;
  amount: number; // in paise
  currency?: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  description?: string;
}) {
  const razorpay = getRazorpayInstance();
  
  if (!razorpay) {
    console.log('[Razorpay] Would create plan:', options.name);
    return {
      id: `plan_mock_${Date.now()}`,
      item: {
        id: `item_mock_${Date.now()}`,
        name: options.name,
        amount: options.amount,
      },
    };
  }

  try {
    const plan = await razorpay.plans.create({
      period: options.period,
      interval: options.interval,
      item: {
        name: options.name,
        amount: options.amount,
        currency: options.currency || 'INR',
        description: options.description,
      },
    });

    return plan;
  } catch (error) {
    console.error('[Razorpay] Create plan error:', error);
    throw error;
  }
}

// Refund a payment
export async function refundPayment(paymentId: string, amount?: number) {
  const razorpay = getRazorpayInstance();
  
  if (!razorpay) {
    console.log('[Razorpay] Would refund payment:', paymentId);
    return {
      id: `rfnd_mock_${Date.now()}`,
      payment_id: paymentId,
      amount: amount || 0,
      status: 'processed',
    };
  }

  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount, // Optional: partial refund
    });

    return refund;
  } catch (error) {
    console.error('[Razorpay] Refund error:', error);
    throw error;
  }
}
