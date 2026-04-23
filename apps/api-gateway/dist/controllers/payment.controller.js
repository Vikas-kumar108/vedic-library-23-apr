import { PaymentService } from '../services/payment.service';
const paymentService = new PaymentService();
/**
 * Payment Controller
 * Responsibility: Handle HTTP requests for financial transactions.
 */
export const paymentController = {
    /**
     * POST /payments/create-order
     */
    async createOrder(request, reply) {
        const { amount, planId } = request.body;
        const order = await paymentService.createOrder(amount);
        return reply.send({ order, planId });
    },
    /**
     * POST /payments/webhook
     * Purpose: Listen for Razorpay's server-to-server confirmation.
     */
    async handleWebhook(request, reply) {
        const signature = request.headers['x-razorpay-signature'];
        const body = JSON.stringify(request.body);
        const isValid = paymentService.verifySignature(body, signature);
        if (!isValid) {
            return reply.code(400).send({ error: 'Invalid signature' });
        }
        const event = request.body.event;
        if (event === 'payment.captured') {
            const { userId, planId } = request.body.payload.payment.entity.notes;
            await paymentService.upgradeMembership(userId, planId);
        }
        return reply.send({ received: true });
    }
};
