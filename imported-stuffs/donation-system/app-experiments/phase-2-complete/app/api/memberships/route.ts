import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { 
  Membership, 
  Donation,
  type MembershipTier, 
  type PaymentFrequency,
  calculateEndDate,
  getMembershipAmount,
  MEMBERSHIP_TIERS 
} from '@/lib/models'
import { sendDonationConfirmationEmail } from '@/lib/email'
import { sendDonationConfirmationSMS } from '@/lib/sms'

// GET /api/memberships - Get current user's membership or all memberships (admin)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'

    // Admin can get all memberships
    if (all && session.user.role === 'admin') {
      const memberships = await Membership.find()
        .populate('userId', 'name email phone')
        .sort({ createdAt: -1 })
      
      return NextResponse.json({ memberships })
    }

    // Regular user gets their own membership
    const membership = await Membership.findOne({ 
      userId: session.user.id,
      status: { $in: ['active', 'pending'] }
    }).sort({ createdAt: -1 })

    return NextResponse.json({ membership })
  } catch (error) {
    console.error('Error fetching memberships:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/memberships - Create/subscribe to a membership
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { tier, frequency } = body as { 
      tier: MembershipTier
      frequency: PaymentFrequency 
    }

    // Validate tier and frequency
    if (!MEMBERSHIP_TIERS[tier]) {
      return NextResponse.json({ error: 'Invalid membership tier' }, { status: 400 })
    }

    if (!['monthly', 'quarterly', 'yearly'].includes(frequency)) {
      return NextResponse.json({ error: 'Invalid payment frequency' }, { status: 400 })
    }

    // Check if user already has an active membership
    const existingMembership = await Membership.findOne({
      userId: session.user.id,
      status: 'active'
    })

    if (existingMembership) {
      return NextResponse.json({ 
        error: 'You already have an active membership. Please cancel it first to switch tiers.' 
      }, { status: 400 })
    }

    const amount = getMembershipAmount(tier, frequency)
    const startDate = new Date()
    const endDate = calculateEndDate(startDate, frequency)
    const nextPaymentDate = calculateEndDate(startDate, frequency)

    // Create membership (pending until payment is confirmed)
    const membership = await Membership.create({
      userId: session.user.id,
      tier,
      frequency,
      amount,
      startDate,
      endDate,
      nextPaymentDate,
      status: 'pending',
      autoRenew: true,
      totalContributed: 0,
    })

    // Create associated donation record
    const donation = await Donation.create({
      userId: session.user.id,
      donorName: session.user.name,
      donorEmail: session.user.email,
      amount,
      currency: 'INR',
      paymentMethod: 'pending',
      status: 'pending',
      purpose: `${MEMBERSHIP_TIERS[tier].name} Membership (${frequency})`,
      isRecurring: true,
      membershipId: membership._id,
    })

    // Send confirmation emails/SMS
    if (session.user.email) {
      await sendDonationConfirmationEmail({
        to: session.user.email,
        donorName: session.user.name || 'Donor',
        amount,
        donationId: donation._id.toString(),
        purpose: `${MEMBERSHIP_TIERS[tier].name} Membership`,
      }).catch(console.error)
    }

    return NextResponse.json({ 
      membership,
      donation,
      paymentInfo: {
        amount,
        tier: MEMBERSHIP_TIERS[tier].name,
        frequency,
        message: 'Please complete the payment using UPI or bank transfer. Your membership will be activated once payment is confirmed.'
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating membership:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/memberships - Update membership (cancel auto-renew, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { membershipId, action, ...updates } = body

    const membership = await Membership.findById(membershipId)

    if (!membership) {
      return NextResponse.json({ error: 'Membership not found' }, { status: 404 })
    }

    // Check ownership or admin
    if (membership.userId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    switch (action) {
      case 'cancel':
        membership.status = 'cancelled'
        membership.autoRenew = false
        break
      case 'toggle-auto-renew':
        membership.autoRenew = !membership.autoRenew
        break
      case 'activate': // Admin only
        if (session.user.role !== 'admin') {
          return NextResponse.json({ error: 'Admin only action' }, { status: 403 })
        }
        membership.status = 'active'
        membership.lastPaymentDate = new Date()
        membership.totalContributed += membership.amount
        break
      default:
        Object.assign(membership, updates)
    }

    await membership.save()

    return NextResponse.json({ membership })
  } catch (error) {
    console.error('Error updating membership:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
